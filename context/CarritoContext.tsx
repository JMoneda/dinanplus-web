'use client'
import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { useToast } from '@/context/ToastContext'
import type { Producto } from '@/lib/supabase'

// Tipos
export interface ItemCarrito {
  id: number
  producto_id: number
  nombre: string
  precio: number
  color: string
  talla: string
  cantidad: number
  imagen_url?: string
  stock_disponible: number
}

interface EstadoCarrito {
  items: ItemCarrito[]
  total: number
  cantidadTotal: number
  isOpen: boolean
}

type AccionCarrito = 
  | { type: 'AGREGAR_ITEM'; payload: { producto: Producto; color: string; talla: string } }
  | { type: 'REMOVER_ITEM'; payload: { id: number } }
  | { type: 'ACTUALIZAR_CANTIDAD'; payload: { id: number; cantidad: number } }
  | { type: 'LIMPIAR_CARRITO' }
  | { type: 'TOGGLE_CARRITO' }
  | { type: 'CARGAR_CARRITO'; payload: ItemCarrito[] }

// Estado inicial
const estadoInicial: EstadoCarrito = {
  items: [],
  total: 0,
  cantidadTotal: 0,
  isOpen: false
}

// Reducer
function carritoReducer(state: EstadoCarrito, action: AccionCarrito): EstadoCarrito {
  switch (action.type) {
    case 'AGREGAR_ITEM': {
      const { producto, color, talla } = action.payload
      
      // Verificar si el item ya existe
      const itemExistente = state.items.find(
        item => item.producto_id === producto.id && item.color === color && item.talla === talla
      )

      let nuevosItems: ItemCarrito[]

      if (itemExistente) {
        // Incrementar cantidad si ya existe
        nuevosItems = state.items.map(item =>
          item.id === itemExistente.id
            ? { ...item, cantidad: Math.min(item.cantidad + 1, item.stock_disponible) }
            : item
        )
      } else {
        // Agregar nuevo item
        const nuevoItem: ItemCarrito = {
          id: Date.now(),
          producto_id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          color,
          talla,
          cantidad: 1,
          imagen_url: producto.imagen_url,
          stock_disponible: producto.stock
        }
        nuevosItems = [...state.items, nuevoItem]
      }

      const nuevoEstado = {
        ...state,
        items: nuevosItems,
        total: nuevosItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        cantidadTotal: nuevosItems.reduce((sum, item) => sum + item.cantidad, 0)
      }

      // Guardar en localStorage
      localStorage.setItem('dinan_carrito', JSON.stringify(nuevosItems))
      return nuevoEstado
    }

    case 'REMOVER_ITEM': {
      const nuevosItems = state.items.filter(item => item.id !== action.payload.id)
      
      const nuevoEstado = {
        ...state,
        items: nuevosItems,
        total: nuevosItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        cantidadTotal: nuevosItems.reduce((sum, item) => sum + item.cantidad, 0)
      }

      localStorage.setItem('dinan_carrito', JSON.stringify(nuevosItems))
      return nuevoEstado
    }

    case 'ACTUALIZAR_CANTIDAD': {
      const { id, cantidad } = action.payload
      
      if (cantidad <= 0) {
        return carritoReducer(state, { type: 'REMOVER_ITEM', payload: { id } })
      }

      const nuevosItems = state.items.map(item =>
        item.id === id 
          ? { ...item, cantidad: Math.min(cantidad, item.stock_disponible) }
          : item
      )

      const nuevoEstado = {
        ...state,
        items: nuevosItems,
        total: nuevosItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        cantidadTotal: nuevosItems.reduce((sum, item) => sum + item.cantidad, 0)
      }

      localStorage.setItem('dinan_carrito', JSON.stringify(nuevosItems))
      return nuevoEstado
    }

    case 'LIMPIAR_CARRITO':
      localStorage.removeItem('dinan_carrito')
      return {
        ...state,
        items: [],
        total: 0,
        cantidadTotal: 0
      }

    case 'TOGGLE_CARRITO':
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case 'CARGAR_CARRITO':
      const items = action.payload
      return {
        ...state,
        items,
        total: items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        cantidadTotal: items.reduce((sum, item) => sum + item.cantidad, 0)
      }

    default:
      return state
  }
}

// Context
const CarritoContext = createContext<{
  state: EstadoCarrito
  agregarItem: (producto: Producto, color: string, talla: string) => void
  removerItem: (id: number) => void
  actualizarCantidad: (id: number, cantidad: number) => void
  limpiarCarrito: () => void
  toggleCarrito: () => void
} | null>(null)

// Provider
export function CarritoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(carritoReducer, estadoInicial)
  const { addToast } = useToast()

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('dinan_carrito')
    if (carritoGuardado) {
      try {
        const items = JSON.parse(carritoGuardado)
        dispatch({ type: 'CARGAR_CARRITO', payload: items })
      } catch (error) {
        console.error('Error al cargar carrito:', error)
        localStorage.removeItem('dinan_carrito')
      }
    }
  }, [])

  const agregarItem = (producto: Producto, color: string, talla: string) => {
    // Verificar stock disponible
    if (producto.stock <= 0) {
      addToast('Producto sin stock disponible', 'error')
      return
    }

    // Verificar si ya existe este producto con esta combinación
    const itemExistente = state.items.find(
      item => item.producto_id === producto.id && item.color === color && item.talla === talla
    )

    if (itemExistente && itemExistente.cantidad >= producto.stock) {
      addToast(`Solo tenemos ${producto.stock} unidades disponibles`, 'warning')
      return
    }

    dispatch({ type: 'AGREGAR_ITEM', payload: { producto, color, talla } })
    
    // Mostrar notificación de éxito
    const mensaje = itemExistente 
      ? `Cantidad actualizada: ${producto.nombre} (${color}, ${talla})`
      : `¡Agregado al carrito! ${producto.nombre} (${color}, ${talla})`
    
    addToast(mensaje, 'success', 4000)
  }

  const removerItem = (id: number) => {
    const item = state.items.find(i => i.id === id)
    dispatch({ type: 'REMOVER_ITEM', payload: { id } })
    
    if (item) {
      addToast(`${item.nombre} removido del carrito`, 'info', 3000)
    }
  }

  const actualizarCantidad = (id: number, cantidad: number) => {
    const item = state.items.find(i => i.id === id)
    
    if (!item) return

    if (cantidad > item.stock_disponible) {
      addToast(`Solo tenemos ${item.stock_disponible} unidades disponibles`, 'warning')
      return
    }

    dispatch({ type: 'ACTUALIZAR_CANTIDAD', payload: { id, cantidad } })
  }

  const limpiarCarrito = () => {
    dispatch({ type: 'LIMPIAR_CARRITO' })
    addToast('Carrito vaciado', 'info')
  }

  const toggleCarrito = () => {
    dispatch({ type: 'TOGGLE_CARRITO' })
  }

  return (
    <CarritoContext.Provider value={{
      state,
      agregarItem,
      removerItem,
      actualizarCantidad,
      limpiarCarrito,
      toggleCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

// Hook personalizado
export const useCarrito = () => {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  }
  return context
}
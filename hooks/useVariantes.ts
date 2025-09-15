import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/context/ToastContext'

export interface ProductoVariante {
  id: number
  producto_id: number
  color: string
  talla: string
  stock: number
  sku: string
}

export function useVariantes() {
  const [variantes, setVariantes] = useState<ProductoVariante[]>([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  const cargarVariantes = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('producto_variantes')
        .select('*')
        .order('producto_id, color, talla')

      if (error) throw error
      setVariantes(data || [])
    } catch (error) {
      console.error('Error cargando variantes:', error)
      addToast('Error cargando variantes', 'error')
    } finally {
      setLoading(false)
    }
  }

  const actualizarStockVariante = async (varianteId: number, nuevoStock: number) => {
    try {
      const { error } = await supabase
        .from('producto_variantes')
        .update({ stock: nuevoStock })
        .eq('id', varianteId)

      if (error) throw error

      // Actualizar variante localmente
      setVariantes(prev => prev.map(v => 
        v.id === varianteId ? { ...v, stock: nuevoStock } : v
      ))

      // Recalcular stock total del producto
      const variante = variantes.find(v => v.id === varianteId)
      if (variante) {
        await actualizarStockTotalProducto(variante.producto_id)
      }

      addToast('Stock actualizado', 'success')
      return true
    } catch (error) {
      console.error('Error actualizando stock:', error)
      addToast('Error actualizando stock', 'error')
      return false
    }
  }

  const actualizarStockTotalProducto = async (productoId: number) => {
    try {
      const variantesDelProducto = variantes.filter(v => v.producto_id === productoId)
      const stockTotal = variantesDelProducto.reduce((sum, v) => sum + v.stock, 0)

      const { error } = await supabase
        .from('productos')
        .update({ stock: stockTotal })
        .eq('id', productoId)

      if (error) throw error
    } catch (error) {
      console.error('Error actualizando stock total:', error)
    }
  }

  const getStockVariante = (productoId: number, color: string, talla: string): number => {
    const variante = variantes.find(v => 
      v.producto_id === productoId && v.color === color && v.talla === talla
    )
    return variante?.stock || 0
  }

  const procesarCambioStockPedido = async (
    items: Array<{producto_id: number, color: string, talla: string, cantidad: number}>, 
    multiplicador: number
  ) => {
    let cambiosRealizados = 0
    
    for (const item of items) {
      const variante = variantes.find(v => 
        v.producto_id === item.producto_id && 
        v.color === item.color && 
        v.talla === item.talla
      )
      
      if (variante) {
        const nuevoStock = Math.max(0, variante.stock + (item.cantidad * multiplicador))
        const success = await actualizarStockVariante(variante.id, nuevoStock)
        if (success) cambiosRealizados++
      }
    }
    
    if (cambiosRealizados > 0) {
      await cargarVariantes() // Recargar para sincronizar
    }
    
    return cambiosRealizados
  }

  useEffect(() => {
    cargarVariantes()
  }, [])

  return {
    variantes,
    loading,
    actualizarStockVariante,
    getStockVariante,
    procesarCambioStockPedido,
    refetch: cargarVariantes
  }
}
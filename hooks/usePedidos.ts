import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/context/ToastContext'

export interface Pedido {
  id: number
  numero_pedido: string
  cliente_nombre: string
  cliente_email: string
  cliente_telefono: string
  cliente_direccion: string
  ciudad: string
  total: number
  estado: string
  metodo_pago: string
  notas: string
  created_at: string
  pedido_items: PedidoItem[]
}

export interface PedidoItem {
  id: number
  producto_id: number
  nombre_producto: string
  color: string
  talla: string
  precio: number
  cantidad: number
  subtotal: number
}

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const { addToast } = useToast()

  const cargarPedidos = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('pedidos')
        .select(`
          *,
          pedido_items (*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPedidos(data || [])
    } catch (error) {
      console.error('Error cargando pedidos:', error)
      addToast('Error cargando pedidos', 'error')
    } finally {
      setLoading(false)
    }
  }

  const actualizarStockVariante = async (productoId: number, color: string, talla: string, cambioStock: number) => {
    try {
      // Buscar la variante específica
      const { data: variante, error: errorVariante } = await supabase
        .from('producto_variantes')
        .select('*')
        .eq('producto_id', productoId)
        .eq('color', color)
        .eq('talla', talla)
        .single()

      if (errorVariante || !variante) {
        console.error('Variante no encontrada:', { productoId, color, talla })
        return false
      }

      const nuevoStock = Math.max(0, variante.stock + cambioStock)
      console.log(`Actualizando variante ${color}-${talla}: ${variante.stock} -> ${nuevoStock} (cambio: ${cambioStock})`)

      // Actualizar stock de la variante
      const { error: errorActualizar } = await supabase
        .from('producto_variantes')
        .update({ stock: nuevoStock })
        .eq('id', variante.id)

      if (errorActualizar) {
        console.error('Error actualizando variante:', errorActualizar)
        return false
      }

      // Actualizar stock total del producto
      await actualizarStockTotalProducto(productoId)
      
      return true
    } catch (error) {
      console.error('Error actualizando stock variante:', error)
      return false
    }
  }

  const actualizarStockTotalProducto = async (productoId: number) => {
    try {
      // Sumar stock de todas las variantes del producto
      const { data: variantes, error } = await supabase
        .from('producto_variantes')
        .select('stock')
        .eq('producto_id', productoId)

      if (error) throw error

      const stockTotal = variantes.reduce((sum, v) => sum + v.stock, 0)
      console.log(`Actualizando stock total del producto ${productoId}: ${stockTotal}`)

      // Actualizar stock total del producto
      const { error: errorActualizar } = await supabase
        .from('productos')
        .update({ stock: stockTotal })
        .eq('id', productoId)

      if (errorActualizar) throw errorActualizar
    } catch (error) {
      console.error('Error actualizando stock total:', error)
    }
  }

  const procesarCambioStock = async (items: PedidoItem[], multiplicador: number, accion: string) => {
    let cambiosRealizados = 0
    let erroresStock = 0
    
    console.log(`${accion} pedido, ${multiplicador > 0 ? 'devolviendo' : 'restando'} stock...`)
    
    for (const item of items) {
      console.log(`${multiplicador > 0 ? 'Devolviendo' : 'Restando'} ${Math.abs(item.cantidad * multiplicador)} unidades de ${item.nombre_producto} (${item.color}, ${item.talla})`)
      
      const exito = await actualizarStockVariante(
        item.producto_id, 
        item.color, 
        item.talla, 
        item.cantidad * multiplicador
      )
      
      if (exito) {
        cambiosRealizados++
      } else {
        erroresStock++
      }
    }
    
    return { cambiosRealizados, erroresStock }
  }
  

  const actualizarEstadoPedido = async (pedidoId: number, estadoAnterior: string, nuevoEstado: string) => {
    setUpdating(pedidoId)
    
    try {
      const pedido = pedidos.find(p => p.id === pedidoId)
      if (!pedido) {
        addToast('Pedido no encontrado', 'error')
        return false
      }

      console.log(`Cambiando pedido ${pedido.numero_pedido} de ${estadoAnterior} a ${nuevoEstado}`)

      // Actualizar estado del pedido en la base de datos
      const { error } = await supabase
        .from('pedidos')
        .update({ estado: nuevoEstado })
        .eq('id', pedidoId)

      if (error) throw error

      // Gestionar cambios de stock automáticamente
      let mensajeStock = ''
      let erroresStock = 0
      
      // De pendiente a confirmado: restar stock
      if (estadoAnterior === 'pendiente' && nuevoEstado === 'confirmado') {
        const { cambiosRealizados, erroresStock: errores } = await procesarCambioStock(
          pedido.pedido_items, -1, 'Confirmando'
        )
        erroresStock = errores
        
        if (errores === 0) {
          mensajeStock = ` Stock actualizado para ${cambiosRealizados} productos.`
        } else {
          mensajeStock = ` ${cambiosRealizados} productos actualizados, ${errores} errores.`
        }
      }
      
      // De confirmado a cancelado: devolver stock
      else if (estadoAnterior === 'confirmado' && nuevoEstado === 'cancelado') {
        const { cambiosRealizados, erroresStock: errores } = await procesarCambioStock(
          pedido.pedido_items, 1, 'Cancelando'
        )
        erroresStock = errores
        
        if (errores === 0) {
          mensajeStock = ` Stock devuelto para ${cambiosRealizados} productos.`
        } else {
          mensajeStock = ` ${cambiosRealizados} productos actualizados, ${errores} errores.`
        }
      }
      
      // De cancelado a pendiente: no hacer nada con stock
      else if (estadoAnterior === 'cancelado' && nuevoEstado === 'pendiente') {
        mensajeStock = ' Pedido reactivado.'
      }

      // Actualizar estado local
      setPedidos(prev => prev.map(p => 
        p.id === pedidoId ? { ...p, estado: nuevoEstado } : p
      ))

      const tipoToast = erroresStock && erroresStock > 0 ? 'warning' : 'success'
      addToast(`Pedido ${nuevoEstado}.${mensajeStock}`, tipoToast)
      
      return true
    } catch (error) {
      console.error('Error actualizando pedido:', error)
      addToast('Error actualizando el pedido', 'error')
      return false
    } finally {
      setUpdating(null)
    }
  }

  useEffect(() => {
    cargarPedidos()
  }, [])

  return {
    pedidos,
    loading,
    updating,
    actualizarEstadoPedido,
    refetch: cargarPedidos
  }

  
}

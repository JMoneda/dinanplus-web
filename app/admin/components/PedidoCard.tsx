import { useState } from 'react'
import { Pedido } from '@/hooks/usePedidos'

interface PedidoCardProps {
  pedido: Pedido
  getStockVariante: (productoId: number, color: string, talla: string) => number
  onActualizarEstado: (pedidoId: number, estadoAnterior: string, nuevoEstado: string) => Promise<boolean>
  onVerDetalle: () => void
  onRefreshData: () => void
}

export default function PedidoCard({ 
  pedido, 
  getStockVariante, 
  onActualizarEstado, 
  onVerDetalle,
  onRefreshData 
}: PedidoCardProps) {
  const [updating, setUpdating] = useState(false)

  const handleEstadoChange = async (nuevoEstado: string) => {
    setUpdating(true)
    const success = await onActualizarEstado(pedido.id, pedido.estado, nuevoEstado)
    if (success) {
      onRefreshData()
    }
    setUpdating(false)
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEstadoBadge = (estado: string) => {
    const styles = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      confirmado: 'bg-blue-100 text-blue-800',
      enviado: 'bg-purple-100 text-purple-800',
      entregado: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800'
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[estado as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </span>
    )
  }

  // Función que determina los estados permitidos según el estado actual
  const getEstadosPermitidos = (estadoActual: string): string[] => {
    switch (estadoActual) {
      case 'pendiente':
        return ['pendiente', 'confirmado', 'cancelado']
      case 'confirmado':
        return ['confirmado', 'enviado', 'cancelado']
      case 'enviado':
        return ['enviado', 'entregado', 'cancelado']
      case 'entregado':
        return ['entregado'] // Estado final
      case 'cancelado':
        return ['cancelado', 'pendiente'] // Solo puede volver a pendiente
      default:
        return [estadoActual]
    }
  }

  const estadosPermitidos = getEstadosPermitidos(pedido.estado)

  // Verificar si hay suficiente stock para confirmar el pedido
  const verificarStock = (): { suficiente: boolean; faltantes: string[] } => {
    const faltantes: string[] = []
    
    for (const item of pedido.pedido_items) {
      const stockActual = getStockVariante(item.producto_id, item.color, item.talla)
      if (stockActual < item.cantidad) {
        faltantes.push(`${item.nombre_producto} (${item.color}, ${item.talla}): necesita ${item.cantidad}, disponible ${stockActual}`)
      }
    }
    
    return {
      suficiente: faltantes.length === 0,
      faltantes
    }
  }

  const { suficiente: stockSuficiente, faltantes } = verificarStock()

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div 
        className="cursor-pointer"
        onClick={onVerDetalle}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold">{pedido.numero_pedido}</h3>
              {getEstadoBadge(pedido.estado)}
              {updating && (
                <span className="text-xs text-blue-600 animate-pulse">
                  Actualizando...
                </span>
              )}
              {pedido.estado === 'pendiente' && !stockSuficiente && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  Sin stock suficiente
                </span>
              )}
            </div>
            <p className="text-gray-600">{pedido.cliente_nombre}</p>
            <p className="text-sm text-gray-500">
              {pedido.cliente_telefono} • {pedido.ciudad}
            </p>
            <p className="text-sm text-gray-500">
              {formatearFecha(pedido.created_at)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">${pedido.total.toLocaleString()}</p>
            <p className="text-sm text-gray-500">{pedido.metodo_pago}</p>
          </div>
        </div>
        
        {/* Items del pedido con stock actual */}
        <div className="mt-3 pt-3 border-t">
          <div className="grid gap-2">
            {pedido.pedido_items.map((item, index) => {
              const stockActual = getStockVariante(item.producto_id, item.color, item.talla)
              const stockInsuficiente = stockActual < item.cantidad
              
              return (
                <div key={index} className={`flex justify-between items-center text-xs px-2 py-1 rounded ${
                  stockInsuficiente ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  <span>
                    {item.cantidad}x {item.nombre_producto} ({item.color}, {item.talla})
                  </span>
                  <span className={`font-medium ${
                    stockInsuficiente 
                      ? 'text-red-600' 
                      : stockActual <= 5 
                        ? 'text-yellow-600' 
                        : 'text-gray-600'
                  }`}>
                    Stock: {stockActual}
                    {stockInsuficiente && (
                      <span className="text-red-600 ml-1">
                        (faltan {item.cantidad - stockActual})
                      </span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Advertencia de stock insuficiente */}
        {pedido.estado === 'pendiente' && !stockSuficiente && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs">
            <p className="font-medium text-red-800 mb-1">Stock insuficiente para confirmar:</p>
            <ul className="text-red-700">
              {faltantes.map((faltante, index) => (
                <li key={index}>• {faltante}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Acciones */}
      <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <select
          value={pedido.estado}
          onChange={(e) => handleEstadoChange(e.target.value)}
          disabled={updating}
          className="text-xs border rounded px-2 py-1 disabled:opacity-50"
        >
          {estadosPermitidos.map(estado => (
            <option 
              key={estado} 
              value={estado}
              disabled={estado === 'confirmado' && pedido.estado === 'pendiente' && !stockSuficiente}
            >
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
              {estado === 'confirmado' && pedido.estado === 'pendiente' && !stockSuficiente && ' (Sin stock)'}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => {
            const mensaje = encodeURIComponent(
              `Hola ${pedido.cliente_nombre}, tu pedido ${pedido.numero_pedido} está ${pedido.estado}. Total: $${pedido.total.toLocaleString()}`
            )
            window.open(`https://wa.me/57${pedido.cliente_telefono}?text=${mensaje}`, '_blank')
          }}
          className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          WhatsApp
        </button>
      </div>
    </div>
  )
}
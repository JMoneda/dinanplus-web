import { Pedido } from '@/hooks/usePedidos'

interface PedidoModalProps {
  pedido: Pedido
  getStockVariante: (productoId: number, color: string, talla: string) => number
  onClose: () => void
}

export default function PedidoModal({ pedido, getStockVariante, onClose }: PedidoModalProps) {
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
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
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[estado as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </span>
    )
  }

  const handleWhatsApp = () => {
    const resumenItems = pedido.pedido_items.map(item => 
      `• ${item.cantidad}x ${item.nombre_producto} (${item.color}, ${item.talla})`
    ).join('\n')

    const mensaje = encodeURIComponent(`
🛍️ *Pedido DINAN+*

📋 *Número:* ${pedido.numero_pedido}
👤 *Cliente:* ${pedido.cliente_nombre}
📱 *Teléfono:* ${pedido.cliente_telefono}
🏙️ *Ciudad:* ${pedido.ciudad}

🛒 *Productos:*
${resumenItems}

💰 *Total:* $${pedido.total.toLocaleString()}
💳 *Pago:* ${pedido.metodo_pago}

${pedido.notas ? `📝 *Notas:* ${pedido.notas}` : ''}

¡Gracias por tu pedido! 🎉
    `)

    window.open(`https://wa.me/57${pedido.cliente_telefono}?text=${mensaje}`, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Pedido {pedido.numero_pedido}
              </h2>
              <div className="mt-2 flex items-center gap-3">
                {getEstadoBadge(pedido.estado)}
                <span className="text-sm text-gray-500">
                  {formatearFecha(pedido.created_at)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Información del cliente y pedido */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información del Cliente
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Nombre:</span>
                  <span className="text-gray-900">{pedido.cliente_nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span className="text-gray-900">{pedido.cliente_email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Teléfono:</span>
                  <span className="text-gray-900">{pedido.cliente_telefono}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Ciudad:</span>
                  <span className="text-gray-900">{pedido.ciudad}</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="font-medium text-gray-600">Dirección:</span>
                  <p className="text-gray-900 mt-1">{pedido.cliente_direccion}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información del Pedido
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Estado:</span>
                  <div>{getEstadoBadge(pedido.estado)}</div>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Método de pago:</span>
                  <span className="text-gray-900 capitalize">{pedido.metodo_pago}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Total:</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${pedido.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Fecha:</span>
                  <span className="text-gray-900">{formatearFecha(pedido.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Productos Pedidos
            </h3>
            <div className="space-y-3">
              {pedido.pedido_items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.nombre_producto}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>Color: {item.color}</span>
                      <span>Talla: {item.talla}</span>
                      <span className={`font-medium ${
                        getStockVariante(item.producto_id, item.color, item.talla) <= 5
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}>
                        Stock actual: {getStockVariante(item.producto_id, item.color, item.talla)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {item.cantidad} x ${item.precio.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${item.subtotal.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          {pedido.notas && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notas del Cliente</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-800">{pedido.notas}</p>
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="flex gap-3 pt-6 border-t">
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Enviar por WhatsApp
            </button>
            
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
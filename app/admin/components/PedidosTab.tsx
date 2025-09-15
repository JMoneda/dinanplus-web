import { useState } from 'react'
import { Pedido } from '@/hooks/usePedidos'
import { ProductoVariante } from '@/hooks/useVariantes'
import PedidoCard from './PedidoCard'
import PedidoModal from './PedidoModal'

interface PedidosTabProps {
  pedidos: Pedido[]
  variantes: ProductoVariante[]
  onActualizarEstado: (pedidoId: number, estadoAnterior: string, nuevoEstado: string) => Promise<boolean>
  onRefreshData: () => void
}

export default function PedidosTab({ 
  pedidos, 
  variantes, 
  onActualizarEstado,
  onRefreshData 
}: PedidosTabProps) {
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null)

  const getStockVariante = (productoId: number, color: string, talla: string): number => {
    const variante = variantes.find(v => 
      v.producto_id === productoId && v.color === color && v.talla === talla
    )
    return variante?.stock || 0
  }

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos</h3>
        <p className="text-gray-500">Los pedidos aparecerán aquí cuando los clientes realicen compras.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <PedidoCard
            key={pedido.id}
            pedido={pedido}
            getStockVariante={getStockVariante}
            onActualizarEstado={onActualizarEstado}
            onVerDetalle={() => setSelectedPedido(pedido)}
            onRefreshData={onRefreshData}
          />
        ))}
      </div>

      {/* Modal de detalle */}
      {selectedPedido && (
        <PedidoModal
          pedido={selectedPedido}
          getStockVariante={getStockVariante}
          onClose={() => setSelectedPedido(null)}
        />
      )}
    </>
  )
}
import { Pedido } from '@/hooks/usePedidos'
import { ProductoVariante } from '@/hooks/useVariantes'

interface StatsCardsProps {
  pedidos: Pedido[]
  variantes: ProductoVariante[]
  loading: boolean
}

export default function StatsCards({ pedidos, variantes, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center">
              <div className="p-2 bg-gray-200 rounded-lg w-12 h-12"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const totalVentas = pedidos
    .filter(p => p.estado !== 'cancelado')
    .reduce((sum, p) => sum + p.total, 0)
  
  const pedidosPendientes = pedidos.filter(p => p.estado === 'pendiente' || p.estado === 'revision').length
  const variantesBajoStock = variantes.filter(v => v.stock <= 5).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <span className="text-green-600 text-xl">💰</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Ventas</p>
            <p className="text-2xl font-bold text-gray-900">
              ${totalVentas.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">(excluye cancelados)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <span className="text-blue-600 text-xl">📦</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
            <p className="text-2xl font-bold text-gray-900">{pedidos.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <span className="text-yellow-600 text-xl">⏳</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Pendientes + revision</p>
            <p className="text-2xl font-bold text-gray-900">{pedidosPendientes}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
            <p className="text-2xl font-bold text-gray-900">{variantesBajoStock}</p>
            <p className="text-xs text-gray-500">(≤ 5 unidades)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
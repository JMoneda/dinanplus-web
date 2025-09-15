'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import StatsCards from './components/StatsCards'
import PedidosTab from './components/PedidosTab'
import ProductosTab from './components/ProductosTab'
import InventarioTab from './components/InventarioTab'
import { usePedidos } from '@/hooks/usePedidos'
import { useProductos } from '@/hooks/useProductos'
import { useVariantes } from '@/hooks/useVariantes'

type ActiveTab = 'pedidos' | 'productos' | 'inventario'

export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<ActiveTab>('pedidos')
  const [loading, setLoading] = useState(true)

  // Custom hooks
  const { pedidos, loading: pedidosLoading, actualizarEstadoPedido } = usePedidos()
  const { productos, loading: productosLoading, refetch: refetchProductos } = useProductos()
  const { variantes, loading: variantesLoading, actualizarStockVariante, refetch: refetchVariantes } = useVariantes()

  // Proteger la ruta
  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [user, router])

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
          <p className="mt-4">Cargando panel...</p>
        </div>
      </div>
    )
  }

  const isLoading = pedidosLoading || productosLoading || variantesLoading

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Panel DINAN+</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Bienvenido, {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards 
          pedidos={pedidos}
          variantes={variantes}
          loading={isLoading}
        />

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mt-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('pedidos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pedidos'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Pedidos ({pedidos.length})
              </button>
              <button
                onClick={() => setActiveTab('productos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'productos'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Productos ({productos.length})
              </button>
              <button
                onClick={() => setActiveTab('inventario')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'inventario'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Inventario ({variantes.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            ) : (
              <>
                {activeTab === 'pedidos' && (
                  <PedidosTab 
                    pedidos={pedidos}
                    variantes={variantes}
                    onActualizarEstado={(pedidoId, estadoAnterior, nuevoEstado) => 
                      actualizarEstadoPedido(pedidoId, estadoAnterior, nuevoEstado)
                    }
                    onRefreshData={() => {
                      refetchVariantes()
                      refetchProductos()
                    }}
                  />
                )}
                {activeTab === 'productos' && (
                  <ProductosTab productos={productos} />
                )}
                {activeTab === 'inventario' && (
                  <InventarioTab
                    productos={productos}
                    variantes={variantes}
                    onActualizarStock={actualizarStockVariante}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
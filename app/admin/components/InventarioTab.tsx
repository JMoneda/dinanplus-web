import { useState } from 'react'
import { Producto } from '@/lib/supabase'
import { ProductoVariante } from '@/hooks/useVariantes'
import VarianteInput from './VarianteInput'

interface InventarioTabProps {
  productos: Producto[]
  variantes: ProductoVariante[]
  onActualizarStock: (varianteId: number, nuevoStock: number) => Promise<boolean>
}

export default function InventarioTab({ productos, variantes, onActualizarStock }: InventarioTabProps) {
  const [filtroStock, setFiltroStock] = useState<'todos' | 'bajo' | 'critico'>('todos')
  const [busqueda, setBusqueda] = useState('')

  const getVariante = (productoId: number, color: string, talla: string): ProductoVariante | undefined => {
    return variantes.find(v => 
      v.producto_id === productoId && v.color === color && v.talla === talla
    )
  }

  const productosFiltrados = productos.filter(producto => {
    // Filtro por búsqueda
    if (busqueda && !producto.nombre.toLowerCase().includes(busqueda.toLowerCase())) {
      return false
    }

    // Filtro por stock
    if (filtroStock !== 'todos') {
      const variantesDelProducto = variantes.filter(v => v.producto_id === producto.id)
      const stockMinimo = Math.min(...variantesDelProducto.map(v => v.stock))
      
      if (filtroStock === 'critico' && stockMinimo > 2) return false
      if (filtroStock === 'bajo' && stockMinimo > 5) return false
    }

    return true
  })

  const variantesBajoStock = variantes.filter(v => v.stock <= 5).length
  const variantesCriticas = variantes.filter(v => v.stock <= 2).length

  if (productos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay inventario</h3>
        <p className="text-gray-500">El inventario aparecerá aquí cuando se agreguen productos.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Alertas de stock */}
      {(variantesCriticas > 0 || variantesBajoStock > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {variantesCriticas > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-red-400 text-xl mr-3">🚨</div>
                <div>
                  <h3 className="text-sm font-medium text-red-800">Stock Crítico</h3>
                  <p className="text-sm text-red-700">
                    {variantesCriticas} variantes con 2 o menos unidades
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {variantesBajoStock > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-yellow-400 text-xl mr-3">⚠️</div>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Stock Bajo</h3>
                  <p className="text-sm text-yellow-700">
                    {variantesBajoStock} variantes con 5 o menos unidades
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
          />
          
          <select
            value={filtroStock}
            onChange={(e) => setFiltroStock(e.target.value as 'todos' | 'bajo' | 'critico')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="todos">Todos los productos</option>
            <option value="bajo">Stock bajo (≤5)</option>
            <option value="critico">Stock crítico (≤2)</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Mostrando {productosFiltrados.length} de {productos.length} productos
        </div>
      </div>

      {/* Lista de productos con inventario */}
      <div className="space-y-8">
        {productosFiltrados.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron productos con los filtros aplicados</p>
          </div>
        ) : (
          productosFiltrados.map((producto) => (
            <div key={producto.id} className="border rounded-lg p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{producto.nombre}</h3>
                  <p className="text-gray-600">{producto.categoria} • {producto.genero}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Stock total: {producto.stock} unidades
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${producto.precio.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Grid de variantes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {producto.colores.map(color => 
                  producto.tallas.map(talla => {
                    const variante = getVariante(producto.id, color, talla)
                    return (
                      <VarianteInput
                        key={`${color}-${talla}`}
                        color={color}
                        talla={talla}
                        stock={variante?.stock || 0}
                        sku={variante?.sku || ''}
                        onStockChange={(nuevoStock) => {
                          if (variante) {
                            onActualizarStock(variante.id, nuevoStock)
                          }
                        }}
                      />
                    )
                  })
                )}
              </div>

              {/* Resumen del producto */}
              <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                <div className="flex gap-6">
                  <span className="text-gray-600">
                    Total variantes: {producto.colores.length * producto.tallas.length}
                  </span>
                  <span className="text-gray-600">
                    En stock: {variantes.filter(v => v.producto_id === producto.id && v.stock > 0).length}
                  </span>
                  <span className={`font-medium ${
                    variantes.filter(v => v.producto_id === producto.id && v.stock <= 2).length > 0
                      ? 'text-red-600'
                      : variantes.filter(v => v.producto_id === producto.id && v.stock <= 5).length > 0
                        ? 'text-yellow-600'
                        : 'text-green-600'
                  }`}>
                    Stock crítico: {variantes.filter(v => v.producto_id === producto.id && v.stock <= 2).length}
                  </span>
                </div>
                
                <div className="text-gray-500">
                  {producto.colores.length} colores × {producto.tallas.length} tallas
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
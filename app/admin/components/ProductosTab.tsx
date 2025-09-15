import { Producto } from '@/lib/supabase'

interface ProductosTabProps {
  productos: Producto[]
}

export default function ProductosTab({ productos }: ProductosTabProps) {
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (productos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">👕</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
        <p className="text-gray-500">Los productos aparecerán aquí cuando se agreguen al catálogo.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {productos.map((producto) => (
        <div key={producto.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{producto.nombre}</h3>
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-3 h-3 rounded-full ${producto.activo ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  <span className="text-xs text-gray-500">
                    {producto.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Categoría:</span> {producto.categoria}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Género:</span> {producto.genero}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Material:</span> {producto.material}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Creado:</span> {formatearFecha(producto.created_at)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Descripción:</span>
                  </p>
                  <p className="text-sm text-gray-700">{producto.descripcion}</p>
                </div>
              </div>

              {/* Colores disponibles */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Colores disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {producto.colores.map((color, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tallas disponibles */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Tallas disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {producto.tallas.map((talla, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {talla}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Información de precio y stock */}
            <div className="text-right ml-6">
              <p className="text-3xl font-bold text-gray-900 mb-2">
                ${producto.precio.toLocaleString()}
              </p>
              
              <div className="text-center">
                <div className={`inline-flex items-center px-3 py-2 rounded-lg ${
                  producto.stock <= 5 
                    ? 'bg-red-100 text-red-800' 
                    : producto.stock <= 20 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                }`}>
                  <span className="text-sm font-medium">
                    Stock: {producto.stock}
                  </span>
                </div>
                
                {producto.stock <= 5 && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    ⚠️ Stock crítico
                  </p>
                )}
              </div>

              {/* Combinaciones totales */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  {producto.colores.length} colores × {producto.tallas.length} tallas
                </p>
                <p className="text-xs text-gray-500">
                  = {producto.colores.length * producto.tallas.length} variantes
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
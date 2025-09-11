'use client'
import { useState } from 'react'
import { useProductos } from '@/hooks/useProductos'
import { useCarrito } from '@/context/CarritoContext'
import type { Producto } from '@/lib/supabase'

interface ProductCardProps {
  producto: Producto
  onAgregar: (producto: Producto, color: string, talla: string) => void
  getColorClass: (color: string) => string
}

export default function Catalogo() {
  const { productos, loading, error } = useProductos()
  const { agregarItem } = useCarrito()
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos')

  // Mostrar estados de carga
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">DINAN+</h1>
            <p className="text-xl">Cargando productos...</p>
          </div>
        </section>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <section className="bg-red-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Error</h1>
            <p className="text-xl">No se pudieron cargar los productos</p>
            <p className="text-lg mt-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-white text-red-600 px-6 py-3 rounded-full font-semibold"
            >
              Reintentar
            </button>
          </div>
        </section>
      </div>
    )
  }

  const productosFiltrados = productos.filter(producto => {
    if (filtroCategoria === 'todos') return true
    return producto.categoria === filtroCategoria
  })

  const manejarAgregarAlCarrito = (producto: Producto, color: string, talla: string): void => {
    agregarItem(producto, color, talla)
  }

  const getColorClass = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      'Negro': 'bg-black',
      'Verde': 'bg-green-600',
      'Marfil': 'bg-yellow-100',
      'Mocca': 'bg-amber-700'
    }
    return colorMap[color] || 'bg-gray-400'
  }

  // Obtener categorías únicas de los productos
  const categorias = [...new Set(productos.map(p => p.categoria))]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            NUEVA Colección
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6 font-light">
            PRENDAS BÁSICAS
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Versátiles: combinan con cualquier estilo. Cómodas: frescas y suaves gracias al algodón de alta calidad. 
            Duraderas: no se deforman después de pocas lavadas. Para todos: tallas desde S hasta XXL.
          </p>
          <div className="mt-6 text-sm text-gray-300">
            {productos.length} productos disponibles
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setFiltroCategoria('todos')}
              className={`px-6 py-3 rounded-full font-medium transition ${
                filtroCategoria === 'todos' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos ({productos.length})
            </button>
            {categorias.map(categoria => {
              const count = productos.filter(p => p.categoria === categoria).length
              return (
                <button
                  key={categoria}
                  onClick={() => setFiltroCategoria(categoria)}
                  className={`px-6 py-3 rounded-full font-medium transition capitalize ${
                    filtroCategoria === categoria 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {categoria} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {productosFiltrados.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                No hay productos en esta categoría
              </h3>
              <button
                onClick={() => setFiltroCategoria('todos')}
                className="bg-black text-white px-6 py-3 rounded-full"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productosFiltrados.map(producto => (
                <ProductCard 
                  key={producto.id} 
                  producto={producto} 
                  onAgregar={manejarAgregarAlCarrito}
                  getColorClass={getColorClass}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Características destacadas */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">BÁSICOS 2025</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">✓</span>
              </div>
              <h3 className="font-semibold mb-2">Versátiles</h3>
              <p className="text-gray-600 text-sm">Combinan con cualquier estilo</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">◐</span>
              </div>
              <h3 className="font-semibold mb-2">Cómodas</h3>
              <p className="text-gray-600 text-sm">Frescas y suaves gracias al algodón de alta calidad</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">◆</span>
              </div>
              <h3 className="font-semibold mb-2">Duraderas</h3>
              <p className="text-gray-600 text-sm">No se deforman después de pocas lavadas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">♦</span>
              </div>
              <h3 className="font-semibold mb-2">Para todos</h3>
              <p className="text-gray-600 text-sm">Tallas desde S hasta XXL</p>
            </div>
          </div>
        </div>
      </section>

      {/* Redes sociales */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-white text-black inline-block px-8 py-4 rounded-lg mb-8">
            <h2 className="text-2xl font-bold italic">¡Síguenos!</h2>
          </div>
          <p className="text-xl mb-8">
            ¡Entérate de todas las novedades!<br />
            Búscanos en todas las redes sociales como:
          </p>
          <div className="space-y-4 max-w-md mx-auto">
            <a 
              href="https://instagram.com/dinanbasic" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-full transition"
            >
              <span className="mr-3">📱</span>
              @dinanbasic
            </a>
            <a 
              href="https://tiktok.com/@dinanbasic" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-full transition"
            >
              <span className="mr-3">🎵</span>
              @dinanbasic
            </a>
            <a 
              href="https://wa.me/573243893455" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full transition"
            >
              <span className="mr-3">💬</span>
              3243893455
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// Componente separado para cada producto
function ProductCard({ producto, onAgregar, getColorClass }: ProductCardProps) {
  const [colorSeleccionado, setColorSeleccionado] = useState<string>(producto.colores[0])
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string>(producto.tallas[0])

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Imagen del producto */}
      <div className="aspect-square bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <span className="text-4xl">👕</span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-black text-white px-2 py-1 rounded text-sm font-semibold">
            DINAN+
          </span>
        </div>
        {producto.stock <= 5 && (
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
              Pocas unidades
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-4">
          ${producto.precio.toLocaleString()}
        </p>
        
        <p className="text-gray-600 text-sm mb-4">
          {producto.descripcion}
        </p>

        {/* Selector de color */}
        <div className="mb-4">
          <p className="font-medium mb-2">Color:</p>
          <div className="flex gap-2">
            {producto.colores.map((color: string) => (
              <button
                key={color}
                onClick={() => setColorSeleccionado(color)}
                className={`w-8 h-8 rounded-full border-2 ${getColorClass(color)} ${
                  colorSeleccionado === color ? 'border-black' : 'border-gray-300'
                }`}
                title={color}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{colorSeleccionado}</p>
        </div>

        {/* Selector de talla */}
        <div className="mb-6">
          <p className="font-medium mb-2">Talla:</p>
          <div className="flex gap-2 flex-wrap">
            {producto.tallas.map((talla: string) => (
              <button
                key={talla}
                onClick={() => setTallaSeleccionada(talla)}
                className={`px-3 py-1 border rounded ${
                  tallaSeleccionada === talla 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {talla}
              </button>
            ))}
          </div>
        </div>

        {/* Botón agregar al carrito */}
        <button
          onClick={() => onAgregar(producto, colorSeleccionado, tallaSeleccionada)}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          disabled={producto.stock === 0}
        >
          {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
        </button>

        {/* Material y stock */}
        <div className="mt-2 text-xs text-gray-500 text-center space-y-1">
          <p>{producto.material}</p>
          <p>Stock disponible: {producto.stock} unidades</p>
        </div>
      </div>
    </div>
  )
}
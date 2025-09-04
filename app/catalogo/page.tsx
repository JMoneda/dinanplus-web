'use client'
import { useState } from 'react'

// Definir tipos
interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  genero: string;
  precio: number;
  colores: string[];
  tallas: string[];
  descripcion: string;
  imagen: string;
  material: string;
}

interface ItemCarrito extends Producto {
  colorSeleccionado: string;
  tallaSeleccionada: string;
  cantidad: number;
}

interface ProductCardProps {
  producto: Producto;
  onAgregar: (producto: Producto, color: string, talla: string) => void;
  getColorClass: (color: string) => string;
}

export default function Catalogo() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos')
  const [carritoVisible, setCarritoVisible] = useState<boolean>(false)
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])

  const productos: Producto[] = [
    // CAMISETAS
    {
      id: 1,
      nombre: "Camiseta DINAN+ Hombre",
      categoria: "camisetas",
      genero: "hombre",
      precio: 64900,
      colores: ["Negro", "Verde", "Marfil", "Mocca"],
      tallas: ["S", "M", "L", "XL", "XXL"],
      descripcion: "Prendas elaboradas en algodón 100%, cómoda fresca y versátil. Básicos que siempre combinan con todo.",
      imagen: "/camiseta-hombre.jpg",
      material: "96% algodón, 4% elastano"
    },
    {
      id: 2,
      nombre: "Camiseta DINAN+ Dama",
      categoria: "camisetas",
      genero: "mujer",
      precio: 64900,
      colores: ["Negro", "Verde", "Marfil", "Mocca"],
      tallas: ["S", "M", "L", "XL", "XXL"],
      descripcion: "Prendas elaboradas en algodón 100%, cómoda fresca y versátil. Básicos que siempre combinan con todo.",
      imagen: "/camiseta-mujer.jpg",
      material: "96% algodón, 4% elastano"
    },
    // CHOMPAS/HOODIES
    {
      id: 3,
      nombre: "Chompa DINAN+ Hombre",
      categoria: "chompas",
      genero: "hombre",
      precio: 124900,
      colores: ["Negro", "Verde", "Marfil", "Mocca"],
      tallas: ["S", "M", "L", "XL", "XXL"],
      descripcion: "Prendas elaboradas en 96% algodón y 4% elastano, por eso son cómodas, duraderas y se ajustan sin incomodar. Perfectas para usar todos los días.",
      imagen: "/chompa-hombre.jpg",
      material: "96% algodón, 4% elastano"
    },
    {
      id: 4,
      nombre: "Chompa DINAN+ Dama",
      categoria: "chompas",
      genero: "mujer",
      precio: 124900,
      colores: ["Negro", "Verde", "Marfil", "Mocca"],
      tallas: ["S", "M", "L", "XL", "XXL"],
      descripcion: "Prendas elaboradas en 96% algodón y 4% elastano, por eso son cómodas, duraderas y se ajustan sin incomodar. Perfectas para usar todos los días.",
      imagen: "/chompa-mujer.jpg",
      material: "96% algodón, 4% elastano"
    }
  ]

  const productosFiltrados = productos.filter(producto => {
    if (filtroCategoria === 'todos') return true
    return producto.categoria === filtroCategoria
  })

  const agregarAlCarrito = (producto: Producto, color: string, talla: string): void => {
    const itemCarrito: ItemCarrito = {
      ...producto,
      colorSeleccionado: color,
      tallaSeleccionada: talla,
      cantidad: 1,
      id: Date.now() // Usar timestamp como ID único
    }
    setCarrito([...carrito, itemCarrito])
    alert(`${producto.nombre} agregado al carrito`)
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
              Todos los productos
            </button>
            <button
              onClick={() => setFiltroCategoria('camisetas')}
              className={`px-6 py-3 rounded-full font-medium transition ${
                filtroCategoria === 'camisetas' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Camisetas
            </button>
            <button
              onClick={() => setFiltroCategoria('chompas')}
              className={`px-6 py-3 rounded-full font-medium transition ${
                filtroCategoria === 'chompas' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Chompas
            </button>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map(producto => (
              <ProductCard 
                key={producto.id} 
                producto={producto} 
                onAgregar={agregarAlCarrito}
                getColorClass={getColorClass}
              />
            ))}
          </div>
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
        >
          Agregar al Carrito
        </button>

        {/* Material */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          {producto.material}
        </p>
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'
import { useProductos } from '@/hooks/useProductos'
import { useCarrito } from '@/context/CarritoContext'
import type { Producto } from '@/lib/supabase'
import ProductImage from '@/components/ProductImage'
import Link from "next/link";

interface ProductCardProps {
    producto: Producto
    onAgregar: (producto: Producto, color: string, talla: string) => void
    getColorClass: (color: string) => string
    index: number
}

export default function CatalogoClient() {
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
                        <p className="text-xl">Cargando catálogo...</p>
                    </div>
                </section>
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black" aria-label="Cargando productos"></div>
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
            {/* Hero Section SEO optimizado */}
            <section className="bg-black text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        NUEVA Colección 2025
                    </h1>
                    <h2 className="text-2xl md:text-3xl mb-6 font-light">
                        PRENDAS BÁSICAS DE CALIDAD PREMIUM
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                        Versátiles: combinan con cualquier estilo. Cómodas: frescas y suaves gracias al algodón de alta calidad.
                        Duraderas: no se deforman después de pocas lavadas. Para todos: tallas desde S hasta XXL.
                    </p>
                    <div className="mt-6 text-sm text-gray-300">
                        {productos.length} productos disponibles • Envíos a toda Colombia
                    </div>
                </div>
            </section>

            {/* Navegación de categorías SEO optimizada */}
            <nav className="py-8 bg-white border-b" role="navigation" aria-label="Filtros de categoría">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => setFiltroCategoria('todos')}
                            className={`px-6 py-3 rounded-full font-medium transition ${filtroCategoria === 'todos'
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            aria-label={`Ver todos los productos (${productos.length} disponibles)`}
                        >
                            Todos ({productos.length})
                        </button>
                        {categorias.map(categoria => {
                            const count = productos.filter(p => p.categoria === categoria).length
                            return (
                                <button
                                    key={categoria}
                                    onClick={() => setFiltroCategoria(categoria)}
                                    className={`px-6 py-3 rounded-full font-medium transition capitalize ${filtroCategoria === categoria
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    aria-label={`Ver ${categoria}s (${count} disponibles)`}
                                >
                                    {categoria} ({count})
                                </button>
                            )
                        })}
                    </div>
                </div>
            </nav>

            {/* Productos SEO optimizados */}
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
                        <>
                            {/* Breadcrumb SEO */}
                            <nav className="mb-8" aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                                    <li>
                                        <Link href="/" className="hover:text-black">Inicio</Link>
                                    </li>
                                    <li className="text-gray-400">/</li>
                                    <li>
                                        <Link href="/catalogo" className="hover:text-black">Catálogo</Link>
                                    </li>
                                    {filtroCategoria !== 'todos' && (
                                        <>
                                            <li className="text-gray-400">/</li>
                                            <li className="capitalize font-medium text-black">{filtroCategoria}</li>
                                        </>
                                    )}
                                </ol>
                            </nav>
                            
                            {/* Grid de productos SEO optimizado */}

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {productosFiltrados.map((producto, index) => (
                                    <ProductCard
                                        key={producto.id}
                                        producto={producto}
                                        onAgregar={manejarAgregarAlCarrito}
                                        getColorClass={getColorClass}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Características destacadas SEO optimizadas */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">¿Por Qué Elegir DINAN+?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <article className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-2xl">✓</span>
                            </div>
                            <h3 className="font-semibold mb-2">100% Algodón Premium</h3>
                            <p className="text-gray-600 text-sm">Material de la más alta calidad, suave al tacto y duradero</p>
                        </article>
                        <article className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-2xl">🚚</span>
                            </div>
                            <h3 className="font-semibold mb-2">Envíos a Toda Colombia</h3>
                            <p className="text-gray-600 text-sm">Llevamos nuestros productos a cualquier ciudad del país</p>
                        </article>
                        <article className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-2xl">📏</span>
                            </div>
                            <h3 className="font-semibold mb-2">Tallas S a XXL</h3>
                            <p className="text-gray-600 text-sm">Ropa básica para todos los cuerpos y estilos</p>
                        </article>
                        <article className="text-center">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-2xl">⭐</span>
                            </div>
                            <h3 className="font-semibold mb-2">Calidad Garantizada</h3>
                            <p className="text-gray-600 text-sm">Prendas resistentes que mantienen su forma lavada tras lavada</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Redes sociales SEO optimizadas */}
            <section className="bg-black text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="bg-white text-black inline-block px-8 py-4 rounded-lg mb-8">
                        <h2 className="text-2xl font-bold italic">¡Síguenos en Redes!</h2>
                    </div>
                    <p className="text-xl mb-8">
                        Únete a nuestra comunidad DINAN+<br />
                        Miles de colombianos ya confían en nosotros
                    </p>
                    <div className="space-y-4 max-w-md mx-auto">
                        <a
                            href="https://instagram.com/dinanbasic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-full transition"
                            aria-label="Síguenos en Instagram @dinanbasic"
                        >
                            <span className="mr-3">Instagram 📱</span>
                            @dinanbasic
                        </a>
                        <a
                            href="https://tiktok.com/@dinanbasic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-full transition"
                            aria-label="Síguenos en TikTok @dinanbasic"
                        >
                            <span className="mr-3">TikTok 🎵</span>
                            @dinanbasic
                        </a>
                        <a
                            href="https://wa.me/573243893455"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full transition"
                            aria-label="Contáctanos por WhatsApp"
                        >
                            <span className="mr-3">WhatsApp 💬</span>
                            324 389 3455
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

// Componente separado para cada producto con SEO optimizado
function ProductCard({ producto, onAgregar, getColorClass, index }: ProductCardProps) {
    const [colorSeleccionado, setColorSeleccionado] = useState<string>(producto.colores[0])
    const [tallaSeleccionada, setTallaSeleccionada] = useState<string>(producto.tallas[0])

    return (
        <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            {/* Imagen del producto */}
            <div className="relative">
                <ProductImage
                    productoId={producto.id}
                    nombreProducto={producto.nombre}
                    colorSeleccionado={colorSeleccionado}
                    coloresDisponibles={producto.colores}
                    size="medium"
                    showColorIndicator={false}
                />

                {/* Indicadores de stock */}
                {producto.stock <= 5 && producto.stock > 0 && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ¡Pocas unidades!
                        </span>
                    </div>
                )}
                {producto.stock === 0 && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Agotado
                        </span>
                    </div>
                )}
            </div>

            {/* Información del producto SEO optimizada */}
            <div className="p-6">
                <header>
                    <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                        ${producto.precio.toLocaleString()} COP
                    </p>
                </header>

                <p className="text-gray-600 text-sm mb-4">
                    {producto.descripcion}
                </p>

                {/* Selector de color SEO optimizado */}
                <div className="mb-4">
                    <label className="font-medium mb-2 block">Color:</label>
                    <div className="flex gap-2" role="group" aria-label="Seleccionar color">
                        {producto.colores.map((color: string) => (
                            <button
                                key={color}
                                onClick={() => setColorSeleccionado(color)}
                                className={`w-8 h-8 rounded-full border-2 ${getColorClass(color)} ${colorSeleccionado === color ? 'border-black ring-2 ring-black' : 'border-gray-300'
                                    }`}
                                title={`Seleccionar color ${color}`}
                                aria-label={`Color ${color}${colorSeleccionado === color ? ' (seleccionado)' : ''}`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Seleccionado: {colorSeleccionado}</p>
                </div>

                {/* Selector de talla SEO optimizado */}
                <div className="mb-6">
                    <label className="font-medium mb-2 block">Talla:</label>
                    <div className="flex gap-2 flex-wrap" role="group" aria-label="Seleccionar talla">
                        {producto.tallas.map((talla: string) => (
                            <button
                                key={talla}
                                onClick={() => setTallaSeleccionada(talla)}
                                className={`px-3 py-1 border rounded ${tallaSeleccionada === talla
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                    }`}
                                aria-label={`Talla ${talla}${tallaSeleccionada === talla ? ' (seleccionada)' : ''}`}
                            >
                                {talla}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Botón agregar al carrito */}
                <button
                    onClick={() => onAgregar(producto, colorSeleccionado, tallaSeleccionada)}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={producto.stock === 0}
                    aria-label={producto.stock === 0 ? 'Producto sin stock' : `Agregar ${producto.nombre} ${colorSeleccionado} talla ${tallaSeleccionada} al carrito`}
                >
                    {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                </button>

                {/* Información adicional SEO */}
                <footer className="mt-2 text-xs text-gray-500 text-center space-y-1">
                    <p><strong>Material:</strong> {producto.material}</p>
                    <p><strong>Stock disponible:</strong> {producto.stock} unidades</p>
                    <p><strong>Categoría:</strong> {producto.categoria} • <strong>Género:</strong> {producto.genero}</p>
                </footer>
            </div>
        </article>
    )
}
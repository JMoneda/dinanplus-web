import { Metadata } from 'next';
import Link from 'next/link';
import ProductImageOptimized from '@/components/ProductImageOptimized';

// SEO específico para la página de inicio
export const metadata: Metadata = {
  title: "DINAN+ | Ropa Básica de Calidad en Colombia - Camisetas y Chompas",
  description: "Descubre DINAN+, la mejor marca de ropa básica en Colombia. Camisetas, chompas y prendas versátiles 100% algodón de alta calidad. Tallas S a XXL. Envíos a toda Colombia.",
  keywords: [
    "ropa básica colombia",
    "camisetas básicas medellín",
    "chompas colombia",
    "ropa algodón calidad",
    "DINAN+",
    "prendas básicas versátiles",
    "ropa casual colombia",
    "tienda ropa online colombia"
  ],
  openGraph: {
    title: "DINAN+ | Ropa Básica de Calidad en Colombia",
    description: "La mejor ropa básica de Colombia. Camisetas, chompas y prendas versátiles 100% algodón. Calidad garantizada.",
    url: "https://dinanplus-web.vercel.app/",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "DINAN+ - Ropa Básica de Calidad Colombia",
      }
    ],
  },
  alternates: {
    canonical: "https://dinanplus-web.vercel.app/",
  },
};

// Schema.org para página de inicio
const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "DINAN+ - Ropa Básica de Calidad",
  "description": "Ropa básica de alta calidad en Colombia. Camisetas, chompas y prendas versátiles.",
  "url": "https://dinanplus-web.vercel.app/",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Categorías de Productos DINAN+",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Camisetas Básicas",
          "description": "Camisetas versátiles 100% algodón",
          "url": "https://dinanplus-web.vercel.app/catalogo?categoria=camiseta"
        }
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "Chompas",
          "description": "Chompas cómodas y duraderas",
          "url": "https://dinanplus-web.vercel.app/catalogo?categoria=chompa"
        }
      }
    ]
  }
};

// PRODUCTOS POPULARES - CONECTADOS AL SISTEMA REAL
const productosPopulares = [
  { 
    id: 1, 
    nombre: 'Camiseta DINAN+ Hombre', 
    descripcion: '100% algodón, perfecta para el día a día',
    precio: 45000,
    categoria: 'camiseta',
    colores: ['Negro', 'Verde', 'Marfil', 'Mocca'],
    tallas: ['S', 'M', 'L', 'XL', 'XXL']
  },
  { 
    id: 2, 
    nombre: 'Camiseta DINAN+ Dama', 
    descripcion: 'Corte femenino, suave y resistente',
    precio: 42000,
    categoria: 'camiseta',
    colores: ['Negro', 'Verde', 'Marfil', 'Mocca'],
    tallas: ['XS', 'S', 'M', 'L', 'XL']
  },
  { 
    id: 3, 
    nombre: 'Chompa DINAN+ Hombre', 
    descripcion: 'Abrigadora y versátil para cualquier ocasión',
    precio: 85000,
    categoria: 'chompa',
    colores: ['Negro', 'Verde', 'Marfil', 'Mocca'],
    tallas: ['S', 'M', 'L', 'XL', 'XXL']
  },
  { 
    id: 4, 
    nombre: 'Chompa DINAN+ Dama', 
    descripción: 'Elegante y cómoda, ideal para cualquier look',
    precio: 82000,
    categoria: 'chompa',
    colores: ['Negro', 'Verde', 'Marfil', 'Mocca'],
    tallas: ['XS', 'S', 'M', 'L', 'XL']
  }
]

export default function Home() {
  return (
    <>
      {/* Schema.org para página de inicio */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
      />
      
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-gray-50 px-6">
        {/* H1 optimizado para SEO */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6">
          Bienvenidos a <span className="text-gray-600">DINAN+</span>
        </h1>
        
        {/* Subtítulo con keywords importantes */}
        <h2 className="text-xl md:text-2xl text-gray-700 mb-6 max-w-3xl">
          Ropa Básica de Calidad Premium en Colombia
        </h2>
        
        {/* Descripción rica en keywords */}
        <div className="max-w-4xl mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Innovación en <strong>corte textil y moda</strong>. 
            Transformamos tus ideas en <strong>prendas y accesorios de calidad</strong>.
          </p>
          
          {/* Beneficios clave para SEO */}
          <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">🌟 Calidad Premium</h3>
              <p className="text-gray-700 text-sm">
                Prendas 100% algodón de alta calidad, suave al tacto y duradero
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">🚚 Envíos Nacional</h3>
              <p className="text-gray-700 text-sm">
                Llevamos nuestros productos a toda Colombia. Envíos rápidos y seguros.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">👕 Tallas Completas</h3>
              <p className="text-gray-700 text-sm">
                Desde talla S hasta XXL. Ropa básica para todos los cuerpos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">💫 Versátil</h3>
              <p className="text-gray-700 text-sm">
                Combina con cualquier estilo. Perfectas para uso diario y ocasiones especiales.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA buttons optimizados */}
        <div className="mt-8 flex gap-4 flex-col sm:flex-row">
          <Link
            href="/catalogo"
            className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition text-lg"
            aria-label="Ver catálogo completo de productos DINAN+"
          >
            Ver Catálogo Completo
          </Link>
          <Link
            href="/contacto"
            className="px-8 py-4 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition text-lg"
            aria-label="Contactar con DINAN+ para más información"
          >
            Contactar Ahora
          </Link>
        </div>
        
        {/* Información adicional para SEO local */}
        <div className="mt-12 text-center max-w-2xl">
          <p className="text-sm text-gray-600 mb-2">
            <strong>DINAN+</strong> - Marca colombiana líder en ropa básica de calidad
          </p>
          <p className="text-xs text-gray-500">
            Con sede en Medellín, Antioquia. Atendemos clientes en Bogotá, Cali, Barranquilla, Cartagena y toda Colombia.
          </p>
        </div>
        
        {/* Microdatos estructurados adicionales */}
        <div itemScope itemType="https://schema.org/Organization" className="hidden">
          <span itemProp="name">DINAN+</span>
          <span itemProp="description">Ropa básica de calidad premium en Colombia</span>
          <span itemProp="url">https://dinanplus-web.vercel.app/</span>
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">Medellín</span>
            <span itemProp="addressRegion">Antioquia</span>
            <span itemProp="addressCountry">Colombia</span>
          </div>
        </div>
      </section>
      
      {/* Sección de productos destacados - CONECTADA AL SISTEMA REAL */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestros Productos Más Populares
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Descubre por qué miles de colombianos confían en DINAN+ para su ropa básica diaria
          </p>
          
          {/* Grid de productos destacados CON IMÁGENES REALES */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productosPopulares.map((producto, index) => (
              <article key={producto.id} className="text-center group">
                <Link 
                  href="/catalogo"
                  className="block"
                  aria-label={`Ver ${producto.nombre} en el catálogo`}
                >
                  {/* IMAGEN REAL DEL PRODUCTO */}
                  <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                    <ProductImageOptimized
                      productoId={producto.id}
                      nombreProducto={producto.nombre}
                      colorSeleccionado={producto.colores[0]} // Color por defecto
                      coloresDisponibles={producto.colores}
                      className="mx-auto"
                      size="medium"
                      showColorIndicator={true}
                      priority={index === 0} // Prioridad para el primer producto
                    />
                    
                    {/* Badge de precio - REPOSICIONADO */}
                    <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      ${producto.precio.toLocaleString()}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{producto.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-3">{producto.descripcion}</p>
                  
                  {/* Información adicional */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>
                      <strong>Colores:</strong> {producto.colores.length} opciones
                    </p>
                    <p>
                      <strong>Tallas:</strong> {producto.tallas.join(', ')}
                    </p>
                  </div>
                  
                  <div className="mt-3 text-black font-medium hover:underline group-hover:text-gray-600 transition-colors">
                    Ver Detalles →
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {/* CTA para ver todo el catálogo */}
          <div className="mt-12">
            <Link
              href="/catalogo"
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition text-lg"
              aria-label="Ver catálogo completo de DINAN+"
            >
              Ver Todo el Catálogo
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de características destacadas */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">¿Por Qué Elegir DINAN+?</h2>
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
    </>
  );
}
import { Metadata } from 'next';

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
    url: "https://dinanplus-web.vercel.app",
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
    canonical: "https://dinanplus-web.vercel.app",
  },
};

// Schema.org para página de inicio
const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "DINAN+ - Ropa Básica de Calidad",
  "description": "Ropa básica de alta calidad en Colombia. Camisetas, chompas y prendas versátiles.",
  "url": "https://dinanplus-web.vercel.app",
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
                Prendas 100% algodón de alta calidad. Resistentes, cómodas y duraderas.
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
          <a
            href="/catalogo"
            className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition text-lg"
            aria-label="Ver catálogo completo de productos DINAN+"
          >
            Ver Catálogo Completo
          </a>
          <a
            href="/contacto"
            className="px-8 py-4 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition text-lg"
            aria-label="Contactar con DINAN+ para más información"
          >
            Contactar Ahora
          </a>
        </div>
        
        {/* Información adicional para SEO local */}
        <div className="mt-12 text-center max-w-2xl">
          <p className="text-sm text-gray-600 mb-2">
            <strong>DINAN+</strong> - Marca colombiana líder en ropa básica de calidad
          </p>
          <p className="text-xs text-gray-500">
            Con sede en Caldas, Antioquia. Atendemos clientes en Bogotá, Cali, Barranquilla, Cartagena y toda Colombia.
          </p>
        </div>
        
        {/* Microdatos estructurados adicionales */}
        <div itemScope itemType="https://schema.org/Organization" className="hidden">
          <span itemProp="name">DINAN+</span>
          <span itemProp="description">Ropa básica de calidad premium en Colombia</span>
          <span itemProp="url">https://dinanplus-web.vercel.app</span>
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">Caldas</span>
            <span itemProp="addressRegion">Antioquia</span>
            <span itemProp="addressCountry">Colombia</span>
          </div>
        </div>
      </section>
      
      {/* Sección de productos destacados */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestros Productos Más Populares
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Descubre por qué miles de colombianos confían en DINAN+ para su ropa básica diaria
          </p>
          
          {/* Grid de productos destacados */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Camiseta DINAN+ Hombre", desc: "100% algodón, perfecta para el día a día", img: "camiseta-hombre" },
              { name: "Camiseta DINAN+ Dama", desc: "Corte femenino, suave y resistente", img: "camiseta-dama" }, 
              { name: "Chompa DINAN+ Hombre", desc: "Abrigadora y versátil para cualquier ocasión", img: "chompa-hombre" },
              { name: "Chompa DINAN+ Dama", desc: "Elegante y cómoda, ideal para cualquier look", img: "chompa-dama" }
            ].map((producto, index) => (
              <article key={index} className="text-center group">
                <div className="bg-gray-100 w-full h-48 rounded-lg mb-4 flex items-center justify-center group-hover:bg-gray-200 transition">
                  <span className="text-4xl">👕</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{producto.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{producto.desc}</p>
                <a 
                  href="/catalogo" 
                  className="text-black font-medium hover:underline"
                  aria-label={`Ver más detalles de ${producto.name}`}
                >
                  Ver Detalles →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
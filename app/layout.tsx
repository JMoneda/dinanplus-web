import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { CarritoProvider } from "@/context/CarritoContext";
import CarritoSidebar from "@/components/CarritoSidebar";
import BotonCarrito from "@/components/BotonCarrito";
import { Metadata } from 'next';

// SEO Optimizado - Metadata Base
export const metadata: Metadata = {
  title: {
    default: "DINAN+ | Ropa Básica de Calidad - Camisetas y Chompas Colombia",
    template: "%s | DINAN+"
  },
  description: "Descubre DINAN+: ropa básica de alta calidad en Colombia. Camisetas, chompas y prendas versátiles 100% algodón. Tallas S a XXL. Envíos a toda Colombia.",
  keywords: [
    "ropa básica colombia",
    "camisetas básicas",
    "chompas colombia", 
    "ropa algodón",
    "DINAN+",
    "prendas básicas",
    "ropa casual colombia",
    "camisetas medellín",
    "ropa online colombia"
  ],
  authors: [{ name: "DINAN+" }],
  creator: "DINAN+",
  publisher: "DINAN+",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://dinanplus-web.vercel.app/',
    siteName: 'DINAN+',
    title: 'DINAN+ | Ropa Básica de Calidad Colombia',
    description: 'Ropa básica de alta calidad en Colombia. Camisetas, chompas 100% algodón. Envíos a toda Colombia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DINAN+ - Ropa Básica de Calidad',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DINAN+ | Ropa Básica de Calidad Colombia',
    description: 'Ropa básica de alta calidad en Colombia. Camisetas, chompas 100% algodón.',
    images: ['/og-image.jpg'],
    creator: '@dinanbasic',
    site: '@dinanbasic',
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://dinanplus-web.vercel.app/',
  },
  other: {
    'theme-color': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'format-detection': 'telephone=no',
  }
};

// Schema.org JSON-LD para SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DINAN+",
  "description": "Ropa básica de alta calidad en Colombia",
  "url": "https://dinanplus-web.vercel.app/",
  "logo": "https://dinanplus-web.vercel.app/logo.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+57-324-389-3455",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  },
  "sameAs": [
    "https://instagram.com/dinanbasic",
    "https://tiktok.com/@dinanbasic",
    "https://wa.me/573243893455"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Medellín",
    "addressRegion": "Antioquia",
    "addressCountry": "CO"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DINAN+",
  "url": "https://dinanplus-web.vercel.app/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dinanplus-web.vercel.app/catalogo?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "name": "DINAN+",
  "description": "Tienda de ropa básica de alta calidad en Colombia",
  "url": "https://dinanplus-web.vercel.app/",
  "telephone": "+57-324-389-3455",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Medellín",
    "addressRegion": "Antioquia", 
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "6.2442",
    "longitude": "-75.5812"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification", 
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "$30,000 - $150,000",
  "currenciesAccepted": "COP",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO">
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        
        {/* Preconnect para optimización */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon optimizado */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="DINAN+" />
        <meta name="apple-mobile-web-app-title" content="DINAN+" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <ToastProvider>
          <AuthProvider>
            <CarritoProvider>
              <header className="bg-black text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                  <h1 className="text-2xl font-bold">
                    <Link href="/" aria-label="DINAN+ - Inicio">DINAN+</Link>
                  </h1>
                  <nav className="hidden md:flex gap-6 text-sm font-medium" role="navigation" aria-label="Navegación principal">
                    <Link href="/" className="hover:text-gray-400 transition" aria-label="Página de inicio">
                      Inicio
                    </Link>
                    <Link href="/catalogo" className="hover:text-gray-400 transition" aria-label="Ver catálogo de productos">
                      DINAN+
                    </Link>
                    <Link href="/contacto" className="hover:text-gray-400 transition" aria-label="Información de contacto">
                      Contacto
                    </Link>
                  </nav>
                  <BotonCarrito />
                </div>
              </header>

              <main className="flex-grow" role="main">{children}</main>

              <footer className="bg-gray-900 text-gray-400 py-6 mt-10" role="contentinfo">
                <div className="container mx-auto text-center text-sm">
                  <p>© {new Date().getFullYear()} DINAN+. Todos los derechos reservados.</p>
                  <p className="mt-2">
                    Síguenos en{" "}
                    <a
                      href="https://www.instagram.com/dinanbasic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300"
                      aria-label="Síguenos en Instagram"
                    >
                      Instagram
                    </a>
                    ,{" "}
                    <a
                      href="https://www.tiktok.com/@dinanbasic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300"
                      aria-label="Síguenos en TikTok"
                    >
                      TikTok
                    </a>
                    {" "}y{" "}
                    <a
                      href="https://wa.me/573243893455"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300"
                      aria-label="Contáctanos por WhatsApp"
                    >
                      WhatsApp
                    </a>
                  </p>
                  {/* Enlaces útiles para SEO */}
                  <nav className="mt-4 flex justify-center gap-4 flex-wrap text-xs" aria-label="Enlaces del pie de página">
                    <Link href="/politica-privacidad" className="hover:text-white">Política de Privacidad</Link>
                    <Link href="/terminos-condiciones" className="hover:text-white">Términos y Condiciones</Link>
                    <Link href="/politica-cambios" className="hover:text-white">Política de Cambios</Link>
                    <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
                  </nav>
                </div>
              </footer>

              <CarritoSidebar />
            </CarritoProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
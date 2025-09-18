// components/SchemaOrg.tsx
// Componente para Schema.org JSON-LD

export default function SchemaOrg() {
  // Schema.org para organización
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DINAN+",
    "description": "Ropa básica de alta calidad en Colombia",
    "url": "https://dinanplus-web.vercel.app/",
    "logo": "https://dinanplus-web.vercel.app//og-image.jpg",
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
  }

  // Schema.org para sitio web
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DINAN+",
    "url": "https://dinanplus-web.vercel.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dinanplus-web.vercel.app//catalogo?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  // Schema.org para tienda local
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
  }

  return (
    <>
      {/* Schema.org Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      
      {/* Schema.org Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      
      {/* Schema.org Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  )
}
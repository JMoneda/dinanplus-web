// components/ProductImageOptimized.tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProductImageOptimizedProps {
  productoId: number
  nombreProducto: string
  colorSeleccionado: string
  coloresDisponibles: string[]
  className?: string
  size?: 'small' | 'medium' | 'large'
  showColorIndicator?: boolean
  priority?: boolean
}

export default function ProductImageOptimized({ 
  productoId, 
  nombreProducto, 
  colorSeleccionado, 
  coloresDisponibles,
  className = '',
  size = 'medium',
  showColorIndicator = false,
  priority = false
}: ProductImageOptimizedProps) {
  const [imagenCargada, setImagenCargada] = useState(false)
  const [errorCarga, setErrorCarga] = useState(false)

  // Configuraciones de tamaño optimizadas
  const sizeConfig = {
    small: { width: 300, height: 300, className: 'w-48 h-48' },
    medium: { width: 600, height: 600, className: 'w-80 h-80' },
    large: { width: 1200, height: 1200, className: 'w-96 h-96' }
  }

  const config = sizeConfig[size]

  // Generar URL de la imagen optimizada
  const getImageUrl = (color: string): string => {
    const colorNormalizado = color.toLowerCase()
    return `/images/productos/${productoId}/${colorNormalizado}.jpg`
  }

  // URL de imagen fallback optimizada
  const getPlaceholderUrl = (): string => {
    return '/images/productos/placeholder.jpg'
  }

  // URL actual basada en color seleccionado
  const imagenUrl = getImageUrl(colorSeleccionado)

  // Manejar carga exitosa
  const handleImageLoad = () => {
    setImagenCargada(true)
    setErrorCarga(false)
  }

  // Manejar error de carga
  const handleImageError = () => {
    setErrorCarga(true)
    setImagenCargada(false)
  }

  // Generar placeholder optimizado con color
  const PlaceholderOptimized = () => {
    const colorStyles = {
      negro: 'from-gray-900 to-gray-700',
      verde: 'from-green-600 to-green-500', 
      marfil: 'from-yellow-100 to-yellow-200',
      mocca: 'from-amber-700 to-amber-600'
    }

    const gradientClass = colorStyles[colorSeleccionado.toLowerCase() as keyof typeof colorStyles] || colorStyles.negro

    return (
      <div className={`${config.className} bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center relative overflow-hidden`}>
        {/* Logo/Texto DINAN+ optimizado para SEO */}
        <div className="text-center z-10">
          <div className="text-white font-bold text-2xl mb-2 drop-shadow-lg">
            DINAN+
          </div>
          <div className="text-white/80 text-sm capitalize font-medium">
            {nombreProducto.split(' ').slice(0, 2).join(' ')}
          </div>
          <div className="text-white/60 text-xs mt-1 capitalize">
            {colorSeleccionado}
          </div>
        </div>

        {/* Badge DINAN+ */}
        <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-bold">
          DINAN+
        </div>
      </div>
    )
  }

  // Alt text optimizado para SEO
  const getOptimizedAltText = (): string => {
    return `${nombreProducto} color ${colorSeleccionado} - DINAN+ ropa básica de calidad Colombia`
  }

  return (
    <div className={`relative ${className}`}>
      {/* Imagen principal optimizada */}
      <div className={`${config.className} relative overflow-hidden rounded-lg bg-gray-100`}>
        {!errorCarga ? (
          <>
            {/* Imagen real optimizada con Next.js Image */}
            <Image
              src={imagenUrl}
              alt={getOptimizedAltText()}
              width={config.width}
              height={config.height}
              className={`object-cover transition-opacity duration-500 ${
                imagenCargada ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={priority} // Para imágenes above-the-fold
              quality={85} // Calidad optimizada
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIHAQAAAAAAAAAAAAABAgADBAUREiExkbHB/9oADAMBAAIRAxEAPwCdwLjU9JsoBAkBBHZQEeE=" // Placeholder muy pequeño
              sizes={`(max-width: 768px) ${config.width/2}px, ${config.width}px`}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
            
            {/* Placeholder mientras carga */}
            {!imagenCargada && (
              <div className="absolute inset-0">
                <PlaceholderOptimized />
              </div>
            )}
          </>
        ) : (
          <PlaceholderOptimized />
        )}

        {/* Overlay de carga optimizado */}
        {!imagenCargada && !errorCarga && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" aria-label="Cargando imagen"></div>
          </div>
        )}

        {/* Badge de marca SEO optimizado */}
        <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded text-xs font-semibold">
          DINAN+
        </div>

        {/* Indicador de color SEO optimizado */}
        {showColorIndicator && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 capitalize">
            {colorSeleccionado}
          </div>
        )}
      </div>

      {/* Precargar imágenes de otros colores para mejor UX */}
      <div className="hidden">
        {coloresDisponibles
          .filter(color => color !== colorSeleccionado)
          .slice(0, 2) // Limitar precargas para performance
          .map(color => (
            <Image
              key={`preload-${color}`}
              src={getImageUrl(color)}
              alt=""
              width={50}
              height={50}
              priority={false}
              onError={() => {}} // Ignorar errores en precargas
            />
          ))
        }
      </div>

      {/* Microdatos estructurados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": imagenUrl,
            "name": getOptimizedAltText(),
            "description": `Imagen de ${nombreProducto} en color ${colorSeleccionado}`,
            "creator": {
              "@type": "Organization",
              "name": "DINAN+"
            }
          })
        }}
      />
    </div>
  )
}

// Hook optimizado para gestión de imágenes con caché
export const useOptimizedProductImages = (productoId: number) => {
  const [imagenesDisponibles, setImagenesDisponibles] = useState<string[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const verificarImagenes = async () => {
      const colores = ['negro', 'verde', 'marfil', 'mocca']
      const disponibles: string[] = []

      // Verificar en paralelo para mejor performance
      const promesas = colores.map(async (color) => {
        try {
          const response = await fetch(`/images/productos/${productoId}/${color}.jpg`, { 
            method: 'HEAD'
          })
          if (response.ok) {
            return color
          }
        } catch (error) {
          // Imagen no disponible
        }
        return null
      })

      const resultados = await Promise.all(promesas)
      resultados.forEach(color => {
        if (color) disponibles.push(color)
      })

      setImagenesDisponibles(disponibles)
      setCargando(false)
    }

    verificarImagenes()
  }, [productoId])

  return { imagenesDisponibles, cargando }
}
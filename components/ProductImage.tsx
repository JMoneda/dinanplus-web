// components/ProductImage.tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProductImageProps {
  productoId: number
  nombreProducto: string
  colorSeleccionado: string
  coloresDisponibles: string[]
  className?: string
  size?: 'small' | 'medium' | 'large'
  showColorIndicator?: boolean
}

export default function ProductImage({ 
  productoId, 
  nombreProducto, 
  colorSeleccionado, 
  coloresDisponibles,
  className = '',
  size = 'medium',
  showColorIndicator = false
}: ProductImageProps) {
  const [imagenCargada, setImagenCargada] = useState(false)
  const [errorCarga, setErrorCarga] = useState(false)
  const [imagenAnterior, setImagenAnterior] = useState<string | null>(null)

  // Configuraciones de tamaño
  const sizeConfig = {
    small: { width: 200, height: 200, className: 'w-48 h-48' },
    medium: { width: 400, height: 400, className: 'w-80 h-80' },
    large: { width: 600, height: 600, className: 'w-96 h-96' }
  }

  const config = sizeConfig[size]

  // Generar URL de la imagen
  const getImageUrl = (color: string): string => {
    const colorNormalizado = color.toLowerCase()
    return `/images/productos/${productoId}/${colorNormalizado}.jpg`
  }

  // URL de imagen fallback
  const getPlaceholderUrl = (): string => {
    return '/images/productos/placeholder.jpg'
  }

  // URL actual basada en color seleccionado
  const imagenUrl = getImageUrl(colorSeleccionado)

  // Reset de estados cuando cambia el color
  useEffect(() => {
    if (imagenAnterior && imagenAnterior !== imagenUrl) {
      setImagenCargada(false)
    }
    setImagenAnterior(imagenUrl)
  }, [imagenUrl, imagenAnterior])

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

  // Generar placeholder con color
  const PlaceholderWithColor = () => {
    const colorStyles = {
      negro: 'from-gray-900 to-gray-700',
      verde: 'from-green-600 to-green-500', 
      marfil: 'from-yellow-100 to-yellow-200',
      mocca: 'from-amber-700 to-amber-600'
    }

    const gradientClass = colorStyles[colorSeleccionado.toLowerCase() as keyof typeof colorStyles] || 'from-gray-400 to-gray-500'

    return (
      <div className={`${config.className} bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center relative overflow-hidden`}>
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}/>
        </div>
        
        {/* Logo/Texto DINAN+ */}
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

        {/* Indicador de que es placeholder */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Preview
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Imagen principal */}
      <div className={`${config.className} relative overflow-hidden rounded-lg bg-gray-100`}>
        {!errorCarga ? (
          <>
            {/* Imagen real */}
            <Image
              src={imagenUrl}
              alt={`${nombreProducto} - ${colorSeleccionado}`}
              width={config.width}
              height={config.height}
              className={`object-cover transition-opacity duration-500 ${
                imagenCargada ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={size === 'large'} // Prioridad para imágenes grandes
            />
            
            {/* Placeholder mientras carga */}
            {!imagenCargada && (
              <div className="absolute inset-0">
                <PlaceholderWithColor />
              </div>
            )}
          </>
        ) : (
          <PlaceholderWithColor />
        )}

        {/* Overlay de carga */}
        {!imagenCargada && !errorCarga && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        )}

        {/* Badge de marca */}
        <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded text-xs font-semibold">
          DINAN+
        </div>

        {/* Indicador de color (opcional) */}
        {showColorIndicator && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 capitalize">
            {colorSeleccionado}
          </div>
        )}
      </div>

      {/* Precargar imágenes de otros colores para transiciones suaves */}
      <div className="hidden">
        {coloresDisponibles
          .filter(color => color !== colorSeleccionado)
          .map(color => (
            <Image
              key={`preload-${color}`}
              src={getImageUrl(color)}
              alt={`Preload ${color}`}
              width={50}
              height={50}
              onError={() => {}} // Ignorar errores en precargas
            />
          ))
        }
      </div>
    </div>
  )
}

// Hook personalizado para gestión de imágenes
export const useProductImages = (productoId: number) => {
  const [imagenesDisponibles, setImagenesDisponibles] = useState<string[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const verificarImagenes = async () => {
      const colores = ['negro', 'verde', 'marfil', 'mocca']
      const disponibles: string[] = []

      for (const color of colores) {
        try {
          const response = await fetch(`/images/productos/${productoId}/${color}.jpg`, { method: 'HEAD' })
          if (response.ok) {
            disponibles.push(color)
          }
        } catch (error) {
          // Imagen no disponible
        }
      }

      setImagenesDisponibles(disponibles)
      setCargando(false)
    }

    verificarImagenes()
  }, [productoId])

  return { imagenesDisponibles, cargando }
}
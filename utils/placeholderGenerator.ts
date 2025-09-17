// utils/placeholderGenerator.ts
// Versión SIMPLE sin errores de TypeScript

export interface PlaceholderConfig {
  width: number
  height: number
  productName: string
  color: string
  brand?: string
}

// Generar URL de imagen por producto y color
export const getProductImageUrl = (productoId: number, color: string): string => {
  const colorNormalizado = color.toLowerCase()
  return `/images/productos/${productoId}/${colorNormalizado}.jpg`
}

// URL de imagen fallback
export const getPlaceholderUrl = (): string => {
  return '/images/productos/placeholder.jpg'
}

// Verificar si una imagen existe
export const checkImageExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

// Generar clases CSS para placeholder por color
export const generateCSSPlaceholder = (color: string): string => {
  const colorStyles: Record<string, string> = {
    negro: 'from-gray-900 to-gray-700',
    verde: 'from-green-600 to-green-500',
    marfil: 'from-yellow-100 to-yellow-300',
    mocca: 'from-amber-700 to-amber-600'
  }
  
  return colorStyles[color.toLowerCase()] || colorStyles.negro
}

// Obtener color de texto según el fondo
export const getTextColor = (color: string): string => {
  const darkColors = ['negro', 'mocca']
  return darkColors.includes(color.toLowerCase()) ? 'text-white' : 'text-gray-900'
}

// Validar colores disponibles
export const validateProductColors = (colores: string[]): string[] => {
  const validColors = ['negro', 'verde', 'marfil', 'mocca']
  return colores.filter(color => 
    validColors.includes(color.toLowerCase())
  )
}

// Hook simple para gestionar estado de imágenes
export const useProductImageState = (productoId: number, color: string) => {
  const imageUrl = getProductImageUrl(productoId, color)
  const placeholderUrl = getPlaceholderUrl()
  const cssClasses = generateCSSPlaceholder(color)
  const textColor = getTextColor(color)
  
  return {
    imageUrl,
    placeholderUrl,
    cssClasses,
    textColor,
    hasError: false // Simplificado por ahora
  }
}
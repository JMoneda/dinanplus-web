// scripts/setupImagenes.ts
// Script para configurar el sistema de imágenes inicial

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

// Configuración de productos
const PRODUCTOS = [
  { id: 1, nombre: 'Camiseta DINAN+ Hombre', categoria: 'camiseta' },
  { id: 2, nombre: 'Camiseta DINAN+ Dama', categoria: 'camiseta' },
  { id: 3, nombre: 'Chompa DINAN+ Hombre', categoria: 'chompa' },
  { id: 4, nombre: 'Chompa DINAN+ Dama', categoria: 'chompa' }
]

const COLORES = [
  { nombre: 'Negro', hex: '#1a1a1a' },
  { nombre: 'Verde', hex: '#22c55e' },
  { nombre: 'Marfil', hex: '#fbbf24' },
  { nombre: 'Mocca', hex: '#92400e' }
]

// Generar SVG placeholder
const generarSVGPlaceholder = (
  producto: typeof PRODUCTOS[0], 
  color: typeof COLORES[0],
  width: number = 800,
  height: number = 800
): string => {
  const isDark = ['Negro', 'Mocca'].includes(color.nombre)
  const textColor = isDark ? '#ffffff' : '#1f2937'
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color.hex};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color.hex};stop-opacity:0.8" />
    </linearGradient>
    <pattern id="texture" patternUnits="userSpaceOnUse" width="60" height="60">
      <rect width="60" height="60" fill="none"/>
      <g fill="${textColor}" fill-opacity="0.05">
        <path d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
      </g>
    </pattern>
  </defs>
  
  <!-- Fondo con gradiente -->
  <rect width="100%" height="100%" fill="url(#bg-gradient)"/>
  
  <!-- Textura sutil -->
  <rect width="100%" height="100%" fill="url(#texture)"/>
  
  <!-- Forma de prenda (camiseta o chompa) -->
  <g transform="translate(${width/2}, ${height/2 - 100})" fill="${textColor}" fill-opacity="0.1">
    ${producto.categoria === 'camiseta' ? 
      // SVG de camiseta
      `<path d="M-80,-80 L-60,-60 L-40,-80 L-20,-80 L-20,-40 L20,-40 L20,-80 L40,-80 L60,-60 L80,-80 L80,80 L-80,80 Z" stroke="${textColor}" stroke-width="2" stroke-opacity="0.2"/>` :
      // SVG de chompa (hoodie)
      `<path d="M-80,-80 L-60,-60 L-40,-80 L-20,-80 L-20,-60 L0,-70 L20,-60 L20,-80 L40,-80 L60,-60 L80,-80 L80,80 L-80,80 Z" stroke="${textColor}" stroke-width="2" stroke-opacity="0.2"/>
       <circle cx="0" cy="-50" r="15" fill="${textColor}" fill-opacity="0.1"/>`
    }
  </g>
  
  <!-- Texto principal -->
  <text x="${width/2}" y="${height/2 - 20}" text-anchor="middle" fill="${textColor}" font-family="Arial, sans-serif" font-size="60" font-weight="bold">
    DINAN+
  </text>
  
  <!-- Nombre del producto -->
  <text x="${width/2}" y="${height/2 + 30}" text-anchor="middle" fill="${textColor}" font-family="Arial, sans-serif" font-size="24" opacity="0.9">
    ${producto.nombre.split(' ').slice(0, 2).join(' ')}
  </text>
  
  <!-- Color -->
  <text x="${width/2}" y="${height/2 + 60}" text-anchor="middle" fill="${textColor}" font-family="Arial, sans-serif" font-size="18" opacity="0.7">
    ${color.nombre}
  </text>
  
  <!-- Badge preview -->
  <rect x="${width - 90}" y="${height - 35}" width="80" height="25" rx="4" fill="rgba(0,0,0,0.7)"/>
  <text x="${width - 50}" y="${height - 18}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12">
    Preview
  </text>
  
  <!-- Badge DINAN+ -->
  <rect x="10" y="10" width="80" height="25" rx="4" fill="rgba(0,0,0,0.8)"/>
  <text x="50" y="27" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
    DINAN+
  </text>
</svg>`
}

// Crear estructura de carpetas
const crearEstructuraCarpetas = () => {
  const baseDir = join(process.cwd(), 'public', 'images', 'productos')
  
  console.log('📁 Creando estructura de carpetas...')
  
  // Crear directorio base
  if (!existsSync(baseDir)) {
    mkdirSync(baseDir, { recursive: true })
    console.log(`✅ Creado: ${baseDir}`)
  }
  
  // Crear carpetas por producto
  PRODUCTOS.forEach(producto => {
    const productoDir = join(baseDir, producto.id.toString())
    if (!existsSync(productoDir)) {
      mkdirSync(productoDir, { recursive: true })
      console.log(`✅ Creado: productos/${producto.id}/`)
    }
  })
  
  console.log('✅ Estructura de carpetas creada')
}

// Generar imágenes placeholder
const generarImagenesPlaceholder = () => {
  console.log('🎨 Generando imágenes placeholder...')
  
  PRODUCTOS.forEach(producto => {
    console.log(`\n🏷️  Procesando ${producto.nombre}...`)
    
    COLORES.forEach(color => {
      const svg = generarSVGPlaceholder(producto, color)
      const fileName = `${color.nombre.toLowerCase()}.svg`
      const filePath = join(
        process.cwd(), 
        'public', 
        'images', 
        'productos', 
        producto.id.toString(), 
        fileName
      )
      
      writeFileSync(filePath, svg, 'utf8')
      console.log(`   ✅ ${fileName}`)
    })
  })
  
  console.log('\n🎉 ¡Todas las imágenes placeholder generadas!')
}

// Generar archivo de configuración
const generarConfigImagenes = () => {
  const config = {
    productos: PRODUCTOS.map(p => ({
      id: p.id,
      nombre: p.nombre,
      categoria: p.categoria,
      colores: COLORES.map(c => c.nombre.toLowerCase()),
      imagenesDisponibles: COLORES.map(c => ({
        color: c.nombre.toLowerCase(),
        url: `/images/productos/${p.id}/${c.nombre.toLowerCase()}.svg`,
        tipo: 'placeholder'
      }))
    })),
    colores: COLORES,
    configuracion: {
      formatoPrincipal: 'svg',
      formatoFallback: 'jpg',
      tamaños: {
        thumbnail: { width: 200, height: 200 },
        medium: { width: 400, height: 400 },
        large: { width: 800, height: 800 }
      }
    }
  }
  
  const configPath = join(process.cwd(), 'config', 'imagenes.json')
  const configDir = join(process.cwd(), 'config')
  
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true })
  }
  
  writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8')
  console.log('📋 Archivo de configuración creado: config/imagenes.json')
}

// Generar instrucciones README
const generarREADME = () => {
  const readme = `# 📸 Sistema de Imágenes DINAN+

## 🗂️ Estructura de Archivos

\`\`\`
public/images/productos/
├── 1/              # Camiseta DINAN+ Hombre
│   ├── negro.svg   # Placeholder temporal
│   ├── verde.svg   # Placeholder temporal  
│   ├── marfil.svg  # Placeholder temporal
│   └── mocca.svg   # Placeholder temporal
├── 2/              # Camiseta DINAN+ Dama
├── 3/              # Chompa DINAN+ Hombre
└── 4/              # Chompa DINAN+ Dama
\`\`\`

## 🚀 Estado Actual

✅ **Placeholders SVG** generados automáticamente
🔄 **Fotos reales** pendientes de crear
📱 **Sistema técnico** completamente funcional

## 📋 Próximos Pasos

### 1. Reemplazar Placeholders (Recomendado)
- Reemplaza los archivos .svg con .jpg reales
- Mantén los mismos nombres de archivo
- Usa las especificaciones técnicas abajo

### 2. Especificaciones de Fotos Reales
- **Formato:** JPG optimizado
- **Tamaño:** 800x800px (cuadradas)
- **Peso:** Máximo 150KB por imagen
- **Fondo:** Blanco puro (#FFFFFF)
- **Calidad:** 85% compresión

### 3. Herramientas Recomendadas
- **TinyPNG.com** - Comprimir imágenes
- **Canva.com** - Crear mockups
- **Remove.bg** - Quitar fondos

## 🎯 Plan de Fotografía

### Opción A: DIY (Recomendado para inicio)
- Smartphone con buena cámara
- Fondo blanco (pared o papel)
- Iluminación natural (cerca de ventana)
- Edición básica (brillo, contraste)

### Opción B: Fotógrafo Profesional
- Presupuesto: $200k - $400k COP
- 16 fotos (4 productos × 4 colores)
- Incluye edición y optimización

## ✅ Sistema Funcionando

El e-commerce **YA funciona** con los placeholders:
- ✅ Cambio de imagen por color
- ✅ Animaciones suaves
- ✅ Carga optimizada
- ✅ Fallbacks automáticos

## 🚀 Lanzamiento

**Puedes lanzar AHORA** con placeholders y mejorar las fotos progresivamente.
Los usuarios verán un preview coherente y profesional de cada color.
`

  const readmePath = join(process.cwd(), 'IMAGENES_README.md')
  writeFileSync(readmePath, readme, 'utf8')
  console.log('📖 README creado: IMAGENES_README.md')
}

// Función principal
const main = () => {
  console.log('🚀 DINAN+ - Setup de Sistema de Imágenes')
  console.log('=====================================\n')
  
  try {
    crearEstructuraCarpetas()
    generarImagenesPlaceholder()
    generarConfigImagenes()
    generarREADME()
    
    console.log('\n🎉 ¡SETUP COMPLETO!')
    console.log('\n📋 Resumen:')
    console.log('✅ Estructura de carpetas creada')
    console.log('✅ 16 placeholders SVG generados')
    console.log('✅ Configuración guardada')
    console.log('✅ Documentación creada')
    console.log('\n🚀 Tu e-commerce ya puede usar imágenes por color!')
    console.log('💡 Lee IMAGENES_README.md para los próximos pasos')
    
  } catch (error) {
    console.error('❌ Error durante el setup:', error)
    process.exit(1)
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main()
}

export { main as setupImagenes }
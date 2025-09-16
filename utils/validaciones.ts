// utils/validaciones.ts
export interface ErroresValidacion {
  nombre?: string
  email?: string
  telefono?: string
  direccion?: string
  ciudad?: string
}

export interface ValidacionResult {
  esValido: boolean
  errores: ErroresValidacion
}

// Validaciones específicas para Colombia
export const validarNombre = (nombre: string): string | null => {
  if (!nombre.trim()) return 'El nombre es requerido'
  if (nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres'
  if (nombre.trim().length > 50) return 'El nombre es demasiado largo'
  
  // Solo letras, espacios y tildes
  const regexNombre = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/
  if (!regexNombre.test(nombre.trim())) {
    return 'El nombre solo puede contener letras y espacios'
  }
  
  // No permitir nombres obviamente falsos
  const nombresFalsos = ['test', 'prueba', 'asdf', 'qwerty', 'admin', 'null', 'undefined']
  if (nombresFalsos.some(falso => nombre.toLowerCase().includes(falso))) {
    return 'Por favor ingresa tu nombre real'
  }
  
  return null
}

export const validarEmail = (email: string): string | null => {
  if (!email.trim()) return 'El email es requerido'
  
  // Regex más estricto para email
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (!regexEmail.test(email)) {
    return 'Ingresa un email válido'
  }
  
  // Verificar dominios sospechosos
  const dominiosSospechosos = ['10minutemail.com', 'tempmail.org', 'guerrillamail.com']
  const dominio = email.split('@')[1]?.toLowerCase()
  if (dominiosSospechosos.includes(dominio)) {
    return 'Por favor usa un email permanente'
  }
  
  return null
}

export const validarTelefono = (telefono: string): string | null => {
  if (!telefono.trim()) return 'El teléfono es requerido'
  
  // Limpiar el teléfono (quitar espacios, guiones, paréntesis)
  const telefonoLimpio = telefono.replace(/[\s\-\(\)\+]/g, '')
  
  // Validar formato colombiano
  // Celulares: 3XX XXX XXXX (10 dígitos)
  // Fijos Bogotá: 1 XXX XXXX (7 dígitos) o 601 XXX XXXX (10 dígitos)
  const regexCelular = /^3[0-9]{9}$/
  const regexFijoBogota = /^1[0-9]{7}$|^601[0-9]{7}$/
  const regexFijoGeneral = /^[2-8][0-9]{6,7}$|^60[2-8][0-9]{7}$/
  
  if (!regexCelular.test(telefonoLimpio) && 
      !regexFijoBogota.test(telefonoLimpio) && 
      !regexFijoGeneral.test(telefonoLimpio)) {
    return 'Ingresa un número de teléfono colombiano válido (ej: 3001234567)'
  }
  
  // Verificar patrones sospechosos
  const numerosSospechosos = ['1111111111', '0000000000', '1234567890', '0987654321']
  if (numerosSospechosos.includes(telefonoLimpio)) {
    return 'Por favor ingresa tu número de teléfono real'
  }
  
  return null
}

export const validarDireccion = (direccion: string): string | null => {
  if (!direccion.trim()) return 'La dirección es requerida'
  if (direccion.trim().length < 10) return 'La dirección debe ser más específica (mín. 10 caracteres)'
  if (direccion.trim().length > 200) return 'La dirección es demasiado larga'
  
  // Verificar que contenga elementos típicos de una dirección
  const tieneNumero = /\d/.test(direccion)
  const tieneIndicador = /\b(calle|carrera|cr|cl|avenida|av|transversal|tv|diagonal|dg|autopista|km|manzana|casa|apto|apartamento|torre|conjunto|barrio)\b/i.test(direccion)
  
  if (!tieneNumero) {
    return 'La dirección debe incluir números (ej: Calle 123 #45-67)'
  }
  
  if (!tieneIndicador && direccion.length < 20) {
    return 'Incluye más detalles en la dirección (calle, carrera, etc.)'
  }
  
  return null
}

export const validarCiudad = (ciudad: string): string | null => {
  if (!ciudad.trim()) return 'La ciudad es requerida'
  if (ciudad.trim().length < 3) return 'Ingresa el nombre completo de la ciudad'
  
  // Solo letras, espacios y tildes
  const regexCiudad = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s\-]+$/
  if (!regexCiudad.test(ciudad.trim())) {
    return 'El nombre de la ciudad solo puede contener letras'
  }
  
  // Lista de ciudades principales de Colombia para sugerencias
  const ciudadesColombianas = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 
    'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué', 'Pasto', 'Manizales'
  ]
  
  // Si no coincide con ninguna ciudad conocida, no es error pero podemos sugerir
  const ciudadNormalizada = ciudad.trim().toLowerCase()
  const coincide = ciudadesColombianas.some(c => 
    c.toLowerCase().includes(ciudadNormalizada) || 
    ciudadNormalizada.includes(c.toLowerCase())
  )
  
  return null
}

// Función principal de validación
export const validarFormulario = (formulario: {
  nombre: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
}): ValidacionResult => {
  const errores: ErroresValidacion = {}
  
  // Validar cada campo
  const errorNombre = validarNombre(formulario.nombre)
  if (errorNombre) errores.nombre = errorNombre
  
  const errorEmail = validarEmail(formulario.email)
  if (errorEmail) errores.email = errorEmail
  
  const errorTelefono = validarTelefono(formulario.telefono)
  if (errorTelefono) errores.telefono = errorTelefono
  
  const errorDireccion = validarDireccion(formulario.direccion)
  if (errorDireccion) errores.direccion = errorDireccion
  
  const errorCiudad = validarCiudad(formulario.ciudad)
  if (errorCiudad) errores.ciudad = errorCiudad
  
  return {
    esValido: Object.keys(errores).length === 0,
    errores
  }
}

// Sistema anti-spam
export const verificarLimitePedidos = (): { permitido: boolean; mensaje?: string } => {
  const hoy = new Date().toDateString()
  const clavePedidos = `dinan_pedidos_${hoy}`
  
  try {
    const pedidosHoy = parseInt(localStorage.getItem(clavePedidos) || '0')
    
    if (pedidosHoy >= 3) {
      return {
        permitido: false,
        mensaje: 'Has alcanzado el límite de 3 pedidos por día. Si necesitas hacer más pedidos, contáctanos por WhatsApp.'
      }
    }
    
    return { permitido: true }
  } catch (error) {
    // Si no hay localStorage, permitir el pedido
    return { permitido: true }
  }
}

export const registrarPedido = (): void => {
  const hoy = new Date().toDateString()
  const clavePedidos = `dinan_pedidos_${hoy}`
  
  try {
    const pedidosHoy = parseInt(localStorage.getItem(clavePedidos) || '0')
    localStorage.setItem(clavePedidos, (pedidosHoy + 1).toString())
  } catch (error) {
    console.warn('No se pudo registrar el pedido en localStorage')
  }
}

// Verificar si el pedido parece sospechoso
export const analizarSospechoso = (formulario: {
  nombre: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
  total: number
}): { sospechoso: boolean; razones: string[] } => {
  const razones: string[] = []
  
  // Verificar patrones sospechosos
  const textoCompleto = `${formulario.nombre} ${formulario.email} ${formulario.direccion}`.toLowerCase()
  
  // Patrones de texto sospechoso
  const patronesSospechosos = ['test', 'prueba', 'fake', 'falso', 'admin', 'null']
  patronesSospechosos.forEach(patron => {
    if (textoCompleto.includes(patron)) {
      razones.push(`Contiene texto sospechoso: "${patron}"`)
    }
  })
  
  // Pedidos de muy alto valor (más de $500k)
  if (formulario.total > 500000) {
    razones.push('Pedido de valor inusualmente alto')
  }
  
  // Misma información repetitiva
  if (formulario.nombre.toLowerCase() === formulario.ciudad.toLowerCase()) {
    razones.push('Nombre y ciudad idénticos')
  }
  
  return {
    sospechoso: razones.length > 0,
    razones
  }
}
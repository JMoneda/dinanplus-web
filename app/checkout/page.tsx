'use client'
import { useState } from 'react'
import { useCarrito } from '@/context/CarritoContext'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { 
  validarFormulario, 
  verificarLimitePedidos, 
  registrarPedido,
  analizarSospechoso,
  ErroresValidacion
} from '@/utils/validaciones'
import { getDepartamentos, getMunicipios } from '@/utils/datosColombiaOptimizado'

interface FormularioCliente {
  nombre: string
  email: string
  telefono: string
  direccion: string
  departamento: string
  ciudad: string
  ciudadOtra: string // NUEVO
  notas: string
  metodo_pago: 'contraentrega' | 'transferencia'
}

export default function CheckoutPage() {
  const { state, limpiarCarrito } = useCarrito()
  const [formulario, setFormulario] = useState<FormularioCliente>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    departamento: '',
    ciudad: '',
    ciudadOtra: '', // NUEVO: Campo para "otra ciudad"
    notas: '',
    metodo_pago: 'contraentrega'
  })
  
  const [errores, setErrores] = useState<ErroresValidacion>({})
  const [loading, setLoading] = useState(false)
  const [pedidoCompletado, setPedidoCompletado] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mostrandoAdvertencia, setMostrandoAdvertencia] = useState(false)

  // Obtener datos de departamentos y municipios
  const departamentos = getDepartamentos()
  const municipios = formulario.departamento ? getMunicipios(formulario.departamento) : []

  // Validación en tiempo real
  const validarCampo = (nombre: keyof FormularioCliente, valor: string) => {
    const validacionTemp = validarFormulario({
      ...formulario,
      [nombre]: valor
    })
    
    setErrores(prev => ({
      ...prev,
      [nombre]: validacionTemp.errores[nombre as keyof ErroresValidacion]
    }))
  }

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Si cambió el departamento, limpiar la ciudad
    if (name === 'departamento') {
      setFormulario(prev => ({
        ...prev,
        [name]: value,
        ciudad: '', // Limpiar ciudad cuando cambia departamento
        ciudadOtra: '' // Limpiar también campo "otra ciudad"
      }))
    } 
    // Si cambió la ciudad y seleccionó "otra", enfocar en el campo texto
    else if (name === 'ciudad' && value === 'Otra ciudad (escribir abajo)') {
      setFormulario(prev => ({
        ...prev,
        [name]: value,
        ciudadOtra: '' // Limpiar el campo para que el usuario escriba
      }))
      // Enfocar el campo "otra ciudad" después de un breve delay
      setTimeout(() => {
        const otraCiudadField = document.getElementById('ciudadOtra')
        if (otraCiudadField) {
          otraCiudadField.focus()
        }
      }, 100)
    }
    // Si es teléfono, solo permitir números
    else if (name === 'telefono') {
      const soloNumeros = value.replace(/[^0-9]/g, '')
      setFormulario(prev => ({
        ...prev,
        [name]: soloNumeros
      }))
    } else {
      setFormulario(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[name as keyof ErroresValidacion]) {
      setErrores(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
    
    // Validar en tiempo real después de que el usuario deje de escribir
    setTimeout(() => {
      validarCampo(name as keyof FormularioCliente, name === 'telefono' ? value.replace(/[^0-9]/g, '') : value)
    }, 500)
  }

  const formatearTelefono = (telefono: string): string => {
    // Limpiar el teléfono (solo números)
    const limpio = telefono.replace(/[^0-9]/g, '')
    
    // No formatear mientras está escribiendo, solo devolver los números
    return limpio
  }

  const generarNumeroPedido = (): string => {
    const fecha = new Date()
    const timestamp = fecha.getTime().toString().slice(-6)
    return `DINAN${timestamp}`
  }

  const enviarPedido = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Verificar límite de pedidos
    const { permitido, mensaje } = verificarLimitePedidos()
    if (!permitido) {
      setError(mensaje || 'Límite de pedidos alcanzado')
      return
    }

    // Validar formulario completo
    const validacion = validarFormulario({
      ...formulario,
      ciudad: formulario.ciudad // Usamos ciudad en lugar de la validación anterior
    })
    if (!validacion.esValido) {
      setErrores(validacion.errores)
      setError('Por favor corrige los errores en el formulario')
      return
    }

    // Analizar si el pedido es sospechoso
    const analisisSospechoso = analizarSospechoso({
      ...formulario,
      total: state.total
    })

    if (analisisSospechoso.sospechoso && !mostrandoAdvertencia) {
      setMostrandoAdvertencia(true)
      setError(`Advertencia: ${analisisSospechoso.razones.join(', ')}. Si la información es correcta, haz clic en "Confirmar Pedido" nuevamente.`)
      return
    }

    setLoading(true)

    try {
      const numeroPedido = generarNumeroPedido()
      
      // Formatear teléfono antes de guardar
      const telefonoFormateado = formulario.telefono.replace(/[^0-9]/g, '')

      // Crear pedido en Supabase
      const { data: pedido, error: errorPedido } = await supabase
        .from('pedidos')
        .insert({
          numero_pedido: numeroPedido,
          cliente_nombre: formulario.nombre.trim(),
          cliente_email: formulario.email.toLowerCase().trim(),
          cliente_telefono: telefonoFormateado,
          cliente_direccion: formulario.direccion.trim(),
          ciudad: formulario.ciudad === 'Otra ciudad (escribir abajo)' 
            ? `${formulario.ciudadOtra.trim()}, ${formulario.departamento}` 
            : `${formulario.ciudad}, ${formulario.departamento}`, // Formato: "Ciudad, Departamento"
          total: state.total,
          estado: analisisSospechoso.sospechoso ? 'revision' : 'pendiente',
          metodo_pago: formulario.metodo_pago,
          notas: formulario.notas.trim()
        })
        .select()
        .single()

      if (errorPedido) throw errorPedido

      // Crear items del pedido
      const itemsPedido = state.items.map(item => ({
        pedido_id: pedido.id,
        producto_id: item.producto_id,
        nombre_producto: item.nombre,
        color: item.color,
        talla: item.talla,
        precio: item.precio,
        cantidad: item.cantidad,
        subtotal: item.precio * item.cantidad
      }))

      const { error: errorItems } = await supabase
        .from('pedido_items')
        .insert(itemsPedido)

      if (errorItems) throw errorItems

      // Registrar pedido para control anti-spam
      registrarPedido()

      // Limpiar carrito
      limpiarCarrito()
      setPedidoCompletado(numeroPedido)

      // Enviar por WhatsApp
      if (formulario.telefono) {
        enviarWhatsApp(numeroPedido, formulario, state)
      }

    } catch (error) {
      console.error('Error al procesar pedido:', error)
      setError('Error al procesar el pedido. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const enviarWhatsApp = (numeroPedido: string, cliente: FormularioCliente, carrito: typeof state) => {
    const resumenPedido = carrito.items.map(item => 
      `• ${item.nombre} (${item.color}, ${item.talla}) x${item.cantidad} = $${(item.precio * item.cantidad).toLocaleString()}`
    ).join('\n')

    const mensaje = encodeURIComponent(`
🛍️ *NUEVO PEDIDO DINAN+*

📋 *Pedido:* ${numeroPedido}
👤 *Cliente:* ${cliente.nombre}
📧 *Email:* ${cliente.email}
📱 *Teléfono:* ${cliente.telefono}
📍 *Dirección:* ${cliente.direccion}
🏙️ *Ciudad:* ${cliente.ciudad === 'Otra ciudad (escribir abajo)' ? cliente.ciudadOtra : cliente.ciudad}, ${cliente.departamento}

🛒 *Productos:*
${resumenPedido}

💰 *Total:* $${carrito.total.toLocaleString()}
💳 *Método de pago:* ${cliente.metodo_pago === 'contraentrega' ? 'Contraentrega' : 'Transferencia'}

${cliente.notas ? `📝 *Notas:* ${cliente.notas}` : ''}

¡Gracias por tu pedido! 🎉
    `)

    // Abrir WhatsApp
    window.open(`https://wa.me/573243893455?text=${mensaje}`, '_blank')
  }

  // Redirigir si el carrito está vacío
  if (state.items.length === 0 && !pedidoCompletado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Tu carrito está vacío</h2>
          <Link
            href="/catalogo"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    )
  }

  // Mostrar confirmación de pedido
  if (pedidoCompletado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Pedido Confirmado!</h2>
          <p className="text-gray-600 mb-6">
            Tu pedido <strong>{pedidoCompletado}</strong> ha sido registrado exitosamente.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Nos pondremos en contacto contigo pronto para confirmar los detalles.
            </p>
            <p className="text-sm text-gray-600">
              También puedes escribirnos directamente a WhatsApp: 
              <a href="https://wa.me/573243893455" className="text-green-600 font-medium ml-1">
                324 389 3455
              </a>
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/catalogo"
              className="block w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition"
            >
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="block w-full border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Información de Envío</h2>
              
              {error && (
                <div className={`border px-4 py-3 rounded mb-6 ${
                  mostrandoAdvertencia ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  {error}
                </div>
              )}

              <form onSubmit={enviarPedido} className="space-y-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      errores.nombre ? 'border-red-300' : 'border-gray-300'
                    }`}
                    style={{
                      color: '#111827',
                      backgroundColor: '#ffffff',
                      WebkitTextFillColor: '#111827',
                      opacity: 1
                    }}
                    placeholder="Tu nombre completo"
                    autoComplete="name"
                    required
                  />
                  {errores.nombre && (
                    <p className="text-red-600 text-sm mt-1">{errores.nombre}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formulario.email}
                    onChange={manejarCambio}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      errores.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    style={{
                      color: '#111827',
                      backgroundColor: '#ffffff',
                      WebkitTextFillColor: '#111827',
                      opacity: 1
                    }}
                    placeholder="tu.email@ejemplo.com"
                    autoComplete="email"
                    required
                  />
                  {errores.email && (
                    <p className="text-red-600 text-sm mt-1">{errores.email}</p>
                  )}
                </div>

                {/* Teléfono - SIMPLIFICADO SIN FORMATEO AUTOMÁTICO */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formulario.telefono}
                    onChange={manejarCambio}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      errores.telefono ? 'border-red-300' : 'border-gray-300'
                    }`}
                    style={{
                      color: '#111827',
                      backgroundColor: '#ffffff',
                      WebkitTextFillColor: '#111827',
                      opacity: 1
                    }}
                    placeholder="3001234567"
                    autoComplete="tel"
                    maxLength={10}
                    required
                  />
                  {errores.telefono && (
                    <p className="text-red-600 text-sm mt-1">{errores.telefono}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Solo números: celular (3001234567) o fijo Bogotá (1234567)
                  </p>
                </div>

                {/* Departamento */}
                <div>
                  <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-1">
                    Departamento *
                  </label>
                  <select
                    id="departamento"
                    name="departamento"
                    value={formulario.departamento}
                    onChange={manejarCambio}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  >
                    <option value="">Selecciona tu departamento</option>
                    {departamentos.map((depto) => (
                      <option key={depto} value={depto}>
                        {depto}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ciudad */}
                <div>
                  <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad *
                  </label>
                  <select
                    id="ciudad"
                    name="ciudad"
                    value={formulario.ciudad}
                    onChange={manejarCambio}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                    disabled={!formulario.departamento}
                  >
                    <option value="">
                      {formulario.departamento ? 'Selecciona tu ciudad' : 'Primero selecciona departamento'}
                    </option>
                    {municipios.map((ciudad) => (
                      <option key={ciudad} value={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                  </select>
                  {!formulario.departamento && (
                    <p className="text-xs text-gray-500 mt-1">
                      Selecciona un departamento para ver las ciudades disponibles
                    </p>
                  )}
                </div>

                {/* Campo "Otra Ciudad" - Solo aparece si selecciona "Otra ciudad" */}
                {formulario.ciudad === 'Otra ciudad (escribir abajo)' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <label htmlFor="ciudadOtra" className="block text-sm font-medium text-gray-700 mb-1">
                      Escribe tu ciudad/municipio *
                    </label>
                    <input
                      type="text"
                      id="ciudadOtra"
                      name="ciudadOtra"
                      value={formulario.ciudadOtra}
                      onChange={manejarCambio}
                      className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      style={{
                        color: '#111827',
                        backgroundColor: '#ffffff',
                        WebkitTextFillColor: '#111827',
                        opacity: 1
                      }}
                      placeholder="Ej: Villa de Leyva, Zipacón, etc."
                      autoComplete="address-level2"
                      required
                    />
                    <p className="text-xs text-yellow-700 mt-1">
                      ✍️ Escribe el nombre exacto de tu ciudad o municipio
                    </p>
                  </div>
                )}

                {/* Dirección */}
                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección completa *
                  </label>
                  <textarea
                    id="direccion"
                    name="direccion"
                    value={formulario.direccion}
                    onChange={manejarCambio}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      errores.direccion ? 'border-red-300' : 'border-gray-300'
                    }`}
                    style={{
                      color: '#111827',
                      backgroundColor: '#ffffff',
                      WebkitTextFillColor: '#111827',
                      opacity: 1
                    }}
                    placeholder="Ej: Calle 123 #45-67, Barrio Los Rosales, Torre 3 Apto 301"
                    autoComplete="street-address"
                    required
                  />
                  {errores.direccion && (
                    <p className="text-red-600 text-sm mt-1">{errores.direccion}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Incluye calle, número, barrio y referencias detalladas
                  </p>
                </div>

                {/* Método de pago */}
                <div>
                  <label htmlFor="metodo_pago" className="block text-sm font-medium text-gray-700 mb-1">
                    Método de pago
                  </label>
                  <select
                    id="metodo_pago"
                    name="metodo_pago"
                    value={formulario.metodo_pago}
                    onChange={manejarCambio}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="contraentrega">Contraentrega (pago al recibir)</option>
                    <option value="transferencia">Transferencia bancaria</option>
                  </select>
                </div>

                {/* Información de transferencia */}
                {formulario.metodo_pago === 'transferencia' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">📋 Datos para Transferencia:</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Banco:</strong> Bancolombia</p>
                      <p><strong>Tipo:</strong> Cuenta de Ahorros</p>
                      <p><strong>Número:</strong> 1234567890</p>
                      <p><strong>Titular:</strong> DINAN TEXTILES</p>
                      <p><strong>Cédula:</strong> 123.456.789</p>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-xs text-yellow-800 font-medium">
                        ⚠️ Importante: Después de transferir, envía el comprobante por WhatsApp al 324 389 3455
                      </p>
                    </div>
                  </div>
                )}

                {/* Notas adicionales */}
                <div>
                  <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    id="notas"
                    name="notas"
                    value={formulario.notas}
                    onChange={manejarCambio}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    style={{
                      color: '#111827',
                      backgroundColor: '#ffffff',
                      WebkitTextFillColor: '#111827',
                      opacity: 1
                    }}
                    placeholder="Instrucciones especiales, referencias de ubicación, horarios de entrega..."
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formulario.notas.length}/500 caracteres
                  </p>
                </div>

                {/* Términos y condiciones */}
                <div className="border-t pt-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">
                      Acepto los{' '}
                      <a href="#" className="text-black underline hover:no-underline">
                        términos y condiciones
                      </a>{' '}
                      y autorizo el tratamiento de mis datos personales según la{' '}
                      <a href="#" className="text-black underline hover:no-underline">
                        política de privacidad
                      </a>
                      .
                    </span>
                  </label>
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Procesando pedido...
                    </>
                  ) : (
                    mostrandoAdvertencia ? 'Confirmar Pedido' : 'Realizar Pedido'
                  )}
                </button>
              </form>
            </div>  
            {/* Resumen del pedido */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Resumen del Pedido</h2>
              <div className="space-y-4"> 
                {state.items.map(item => (
                  <div key={`${item.producto_id}-${item.color}-${item.talla}`} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{item.nombre}</p>
                      <p className="text-sm text-gray-600">
                        Color: {item.color} | Talla: {item.talla} | Cantidad: {item.cantidad}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">   
                      ${ (item.precio * item.cantidad).toLocaleString() }
                    </p>
                  </div>  
                ))}   
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>   
                    <span className="text-xl font-bold text-gray-900">
                      ${ state.total.toLocaleString() }
                    </span>   
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Incluye IVA y todos los impuestos aplicables
                  </p>
                </div>  
              </div>
            </div>  
          </div>  
        </div>
      </div>
    </div>
  )
}
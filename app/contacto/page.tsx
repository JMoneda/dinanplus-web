'use client'
import { useState } from 'react'
import { useToast } from '@/context/ToastContext'

interface FormularioContacto {
  nombre: string
  email: string
  telefono: string
  asunto: string
  mensaje: string
  tipoConsulta: 'general' | 'pedido' | 'producto' | 'envio' | 'cambio'
}

export default function ContactoPage() {
  const { addToast } = useToast()
  const [formulario, setFormulario] = useState<FormularioContacto>({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    tipoConsulta: 'general'
  })
  const [enviando, setEnviando] = useState(false)

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    try {
      // Simular envío (aquí puedes agregar lógica real de envío)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Enviar por WhatsApp
      enviarPorWhatsApp()

      // Limpiar formulario
      setFormulario({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
        tipoConsulta: 'general'
      })

      addToast('Mensaje enviado correctamente. Te contactaremos pronto.', 'success')
    } catch (error) {
      addToast('Error al enviar el mensaje. Inténtalo nuevamente.', 'error')
    } finally {
      setEnviando(false)
    }
  }

  const enviarPorWhatsApp = () => {
    const mensaje = encodeURIComponent(`
🔸 *CONTACTO DINAN+*

👤 *Nombre:* ${formulario.nombre}
📧 *Email:* ${formulario.email}
📱 *Teléfono:* ${formulario.telefono}
🏷️ *Tipo:* ${formulario.tipoConsulta}
📋 *Asunto:* ${formulario.asunto}

💬 *Mensaje:*
${formulario.mensaje}

---
Enviado desde dinanplus.com
    `)

    window.open(`https://wa.me/573243893455?text=${mensaje}`, '_blank')
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
            ¿Tienes preguntas sobre nuestros productos? ¿Necesitas ayuda con tu pedido? 
            Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulario de contacto */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
            
            <form onSubmit={enviarFormulario} className="space-y-6">
              {/* Tipo de consulta */}
              <div>
                <label htmlFor="tipoConsulta" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de consulta
                </label>
                <select
                  id="tipoConsulta"
                  name="tipoConsulta"
                  value={formulario.tipoConsulta}
                  onChange={manejarCambio}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="general">Consulta general</option>
                  <option value="pedido">Estado de pedido</option>
                  <option value="producto">Información de producto</option>
                  <option value="envio">Envíos y entregas</option>
                  <option value="cambio">Cambios y devoluciones</option>
                </select>
              </div>

              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  required
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formulario.email}
                  onChange={manejarCambio}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="tu.email@ejemplo.com"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono/WhatsApp
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={manejarCambio}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="300 123 4567"
                />
              </div>

              {/* Asunto */}
              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formulario.asunto}
                  onChange={manejarCambio}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Resumen de tu consulta"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formulario.mensaje}
                  onChange={manejarCambio}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formulario.mensaje.length}/1000 caracteres
                </p>
              </div>

              {/* Botón enviar */}
              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {enviando ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            {/* Información principal */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <a 
                      href="https://wa.me/573243893455" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 transition"
                    >
                      +57 324 389 3455
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a 
                      href="mailto:contacto@dinanplus.com"
                      className="text-blue-600 hover:text-blue-700 transition"
                    >
                      contacto@dinanplus.com
                    </a>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ubicación</p>
                    <p className="text-gray-600">Medellín, Antioquia<br />Colombia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios de atención */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Horarios de Atención</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lunes - Viernes:</span>
                  <span className="font-semibold text-gray-900">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábados:</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingos:</span>
                  <span className="font-semibold text-gray-900">Cerrado</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Respuesta rápida por WhatsApp:</strong> Generalmente respondemos en menos de 2 horas durante nuestros horarios de atención.
                </p>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Síguenos</h3>
              
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/dinanbasic"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition"
                >
                  <span className="text-white text-xl">📱</span>
                </a>
                <a 
                  href="https://tiktok.com/@dinanbasic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-black transition"
                >
                  <span className="text-white text-xl">🎵</span>
                </a>
                <a 
                  href="https://wa.me/573243893455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition"
                >
                  <span className="text-white text-xl">💬</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Preguntas frecuentes */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preguntas Frecuentes</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">¿Cuánto tarda la entrega?</h3>
              <p className="text-gray-600 text-sm">Los envíos dentro de Medellín tardan 1-2 días. A otras ciudades de Colombia 3-5 días hábiles.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">¿Puedo cambiar mi pedido?</h3>
              <p className="text-gray-600 text-sm">Sí, puedes hacer cambios o devoluciones dentro de los primeros 15 días de recibido el producto.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">¿Qué métodos de pago aceptan?</h3>
              <p className="text-gray-600 text-sm">Aceptamos contraentrega y transferencias bancarias. Próximamente: pagos en línea.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">¿Cómo sé mi talla?</h3>
              <p className="text-gray-600 text-sm">Nuestras prendas tienen tallaje estándar. Si tienes dudas, contáctanos por WhatsApp para asesorarte.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
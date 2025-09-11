'use client'
import { useState } from 'react'
import { useCarrito } from '@/context/CarritoContext'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface FormularioCliente {
  nombre: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
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
    ciudad: '',
    notas: '',
    metodo_pago: 'contraentrega'
  })
  
  const [loading, setLoading] = useState(false)
  const [pedidoCompletado, setPedidoCompletado] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

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

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generarNumeroPedido = (): string => {
    const fecha = new Date()
    const timestamp = fecha.getTime().toString().slice(-6)
    return `DINAN${timestamp}`
  }

  const enviarPedido = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const numeroPedido = generarNumeroPedido()

      // Crear pedido en Supabase
      const { data: pedido, error: errorPedido } = await supabase
        .from('pedidos')
        .insert({
          numero_pedido: numeroPedido,
          cliente_nombre: formulario.nombre,
          cliente_email: formulario.email,
          cliente_telefono: formulario.telefono,
          cliente_direccion: formulario.direccion,
          ciudad: formulario.ciudad,
          total: state.total,
          estado: 'pendiente',
          metodo_pago: formulario.metodo_pago,
          notas: formulario.notas
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

      // Limpiar carrito
      limpiarCarrito()
      setPedidoCompletado(numeroPedido)

      // Enviar por WhatsApp (opcional)
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
🏙️ *Ciudad:* ${cliente.ciudad}

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
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={enviarPedido} className="space-y-4">
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
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

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
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

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
                    placeholder="Ej: 3001234567"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

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
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Calle, carrera, número, barrio, referencias..."
                  />
                </div>

                <div>
                  <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formulario.ciudad}
                    onChange={manejarCambio}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="metodo_pago" className="block text-sm font-medium text-gray-700 mb-1">
                    Método de pago
                  </label>
                  <select
                    id="metodo_pago"
                    name="metodo_pago"
                    value={formulario.metodo_pago}
                    onChange={manejarCambio}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="contraentrega">Contraentrega</option>
                    <option value="transferencia">Transferencia bancaria</option>
                  </select>
                </div>

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
                    placeholder="Instrucciones especiales, referencias de ubicación..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Procesando pedido...' : 'Confirmar Pedido'}
                </button>
              </form>
            </div>

            {/* Resumen del pedido */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👕</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.nombre}</h3>
                      <p className="text-xs text-gray-600">{item.color} • {item.talla}</p>
                      <p className="text-sm">
                        Cantidad: {item.cantidad} x ${item.precio.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.precio * item.cantidad).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${state.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>Por definir</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${state.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                <p>* El costo de envío se calculará según la ciudad de destino</p>
                <p>* Los precios incluyen IVA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
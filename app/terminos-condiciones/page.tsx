// app/terminos-condiciones/page.tsx
// Términos y condiciones para SEO
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Términos y Condiciones | DINAN+",
  description: "Lee los términos y condiciones de compra en DINAN+. Políticas de envío, cambios y garantía.",
  robots: { index: true, follow: false },
}

export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>
        
        <div className="bg-white rounded-lg shadow p-8 prose max-w-none">
          <p className="text-gray-600 mb-6">Última actualización: {new Date().toLocaleDateString('es-CO')}</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Productos y Precios</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Todos los precios están en pesos colombianos (COP) e incluyen IVA</li>
              <li>Los productos están sujetos a disponibilidad</li>
              <li>Nos reservamos el derecho de modificar precios sin previo aviso</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Envíos</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Realizamos envíos a toda Colombia</li>
              <li>Tiempo de entrega: 3-5 días hábiles</li>
              <li>El costo de envío se calcula según la ciudad de destino</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Cambios y Devoluciones</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Tienes 15 días para realizar cambios desde la recepción</li>
              <li>El producto debe estar en perfectas condiciones</li>
              <li>Los gastos de envío del cambio corren por cuenta del cliente</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
// app/politica-privacidad/page.tsx
// Página de política de privacidad para SEO
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Política de Privacidad | DINAN+",
  description: "Conoce cómo DINAN+ protege y maneja tus datos personales. Política de privacidad completa y transparente.",
  robots: { index: true, follow: false },
}

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
        
        <div className="bg-white rounded-lg shadow p-8 prose max-w-none">
          <p className="text-gray-600 mb-6">Última actualización: {new Date().toLocaleDateString('es-CO')}</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Información que Recopilamos</h2>
            <p className="text-gray-700 mb-4">
              En DINAN+ recopilamos información necesaria para procesar tus pedidos:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Dirección de envío</li>
              <li>Ciudad y departamento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Uso de la Información</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos tu información únicamente para:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Procesar y entregar tus pedidos</li>
              <li>Comunicarnos contigo sobre el estado de tu pedido</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Protección de Datos</h2>
            <p className="text-gray-700">
              Implementamos medidas de seguridad técnicas y organizativas para proteger 
              tu información personal contra acceso no autorizado, alteración o divulgación.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Contacto</h2>
            <p className="text-gray-700">
              Para preguntas sobre esta política, contáctanos en:
            </p>
            <ul className="list-none text-gray-700 mt-2">
              <li>📧 Email: contacto@dinanplus.com</li>
              <li>📱 WhatsApp: +57 324 389 3455</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
export default function Servicios() {
  const servicios = [
    {
      id: 1,
      titulo: "Corte de Prendas de Vestir",
      descripcion: "Servicios especializados de corte para marcas reconocidas como Terre y Agua Bendita",
      caracteristicas: [
        "Corte de alta precisión",
        "Manejo de diferentes tipos de tela",
        "Volúmenes desde 100 hasta 10,000 prendas",
        "Control de calidad riguroso"
      ],
      imagen: "/servicio-prendas.jpg",
      clientes: ["Terre", "Agua Bendita", "Studio F"]
    },
    {
      id: 2,
      titulo: "Corte de Accesorios",
      descripcion: "Especialistas en corte de cuero y materiales para bolsos, carteras y accesorios",
      caracteristicas: [
        "Corte de cuero premium",
        "Materiales sintéticos de alta calidad",
        "Formas complejas y detalles finos",
        "Optimización de material"
      ],
      imagen: "/servicio-accesorios.jpg",
      clientes: ["Mesace", "Vélez", "Arturo Calle"]
    },
    {
      id: 3,
      titulo: "Desarrollo de Patrones",
      descripcion: "Creación y optimización de patrones para maximizar eficiencia y calidad",
      caracteristicas: [
        "Digitalización de patrones",
        "Optimización para diferentes tallas",
        "Reducción de desperdicio de material",
        "Escalado automático"
      ],
      imagen: "/servicio-patrones.jpg",
      clientes: ["Empresas privadas", "Diseñadores independientes"]
    }
  ];

  const procesos = [
    {
      paso: "01",
      titulo: "Consulta Inicial",
      descripcion: "Análisis de requerimientos y especificaciones del proyecto"
    },
    {
      paso: "02", 
      titulo: "Cotización",
      descripcion: "Propuesta detallada con tiempos y costos específicos"
    },
    {
      paso: "03",
      titulo: "Desarrollo",
      descripcion: "Preparación de patrones y configuración de maquinaria"
    },
    {
      paso: "04",
      titulo: "Producción",
      descripcion: "Corte con supervisión constante y control de calidad"
    },
    {
      paso: "05",
      titulo: "Entrega",
      descripcion: "Empaque profesional y entrega en tiempos acordados"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Servicios de Corte Textil
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Más de 30 años de experiencia al servicio de las mejores marcas de Colombia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#servicios" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition">
              Ver Servicios
            </a>
            <a href="#contacto" className="border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition">
              Solicitar Cotización
            </a>
          </div>
        </div>
      </section>

      {/* Servicios Principales */}
      <section id="servicios" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones integrales de corte textil para empresas que buscan calidad y precisión
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12">
            {servicios.map((servicio, index) => (
              <div key={servicio.id} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Imagen */}
                <div className="lg:w-1/2">
                  <div className="bg-gray-300 h-64 lg:h-80 rounded-lg"></div>
                </div>
                
                {/* Contenido */}
                <div className="lg:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                    {servicio.titulo}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {servicio.descripcion}
                  </p>
                  
                  {/* Características */}
                  <ul className="space-y-2 mb-6">
                    {servicio.caracteristicas.map((caracteristica, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Clientes */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">Clientes que confían en nosotros:</p>
                    <div className="flex flex-wrap gap-2">
                      {servicio.clientes.map((cliente, i) => (
                        <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                          {cliente}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un flujo de trabajo optimizado que garantiza resultados excepcionales
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {procesos.map((proceso, index) => (
              <div key={index} className="text-center relative">
                {/* Línea conectora */}
                {index < procesos.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-300 -translate-y-1/2"></div>
                )}
                
                {/* Círculo con número */}
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 relative z-10">
                  {proceso.paso}
                </div>
                
                <h3 className="font-semibold text-black mb-2">{proceso.titulo}</h3>
                <p className="text-sm text-gray-600">{proceso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Números */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">30+</div>
              <div className="text-gray-600">Años de experiencia</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">50+</div>
              <div className="text-gray-600">Empresas atendidas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">1M+</div>
              <div className="text-gray-600">Prendas cortadas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">99%</div>
              <div className="text-gray-600">Satisfacción cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para trabajar con nosotros?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a las marcas líderes que confían en DINAN para sus necesidades de corte textil
          </p>
          <a href="/contacto" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition">
            Solicitar Cotización Ahora
          </a>
        </div>
      </section>
    </div>
  );
}
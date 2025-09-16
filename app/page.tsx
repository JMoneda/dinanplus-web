export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-gray-50 px-6">
      <h2 className="text-4xl md:text-6xl font-extrabold text-black">
        Bienvenidos a <span className="text-gray-600">DINAN+</span>
      </h2>
      <p className="mt-6 text-lg text-gray-700 max-w-2xl">
        Innovación en corte textil y moda.  
        Transformamos tus ideas en prendas y accesorios de calidad.
      </p>
      <div className="mt-8 flex gap-4">
        {/* <a
          href="/servicios"
          className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
        >
          Nuestros Servicios
        </a> */}
        <a
          href="/catalogo"
          className="px-6 py-3 bg-gray-200 text-black rounded-full font-medium hover:bg-gray-300 transition"
        >
          Ver Catálogo
        </a>
      </div>
    </section>
  );
}
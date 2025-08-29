import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
      
      {/* Fondo con degradado y efecto blur */}
      <div className="absolute inset-0 bg-[url('/fabric-texture.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">
          Bienvenidos a <span className="text-yellow-300">DINAN+</span>
        </h1>
        <p className="mt-6 text-lg md:text-2xl max-w-2xl mx-auto opacity-90">
          Innovación en <strong>corte textil</strong> y diseño de moda.  
          Calidad que transforma tus ideas en realidad.
        </p>

        {/* Botones de acción */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#servicios"
            className="px-6 py-3 rounded-full bg-yellow-400 text-indigo-900 font-semibold shadow-lg hover:scale-105 transform transition"
          >
            Conoce nuestros servicios
          </a>
          <a
            href="#catalogo"
            className="px-6 py-3 rounded-full bg-white text-indigo-900 font-semibold shadow-lg hover:scale-105 transform transition"
          >
            Ver Catálogo DINAN+
          </a>
        </div>
      </div>

      {/* Logo o imagen decorativa */}
      <div className="absolute bottom-8 right-8 opacity-80 hidden md:block">
        <Image src="/next.svg" alt="Logo decorativo" width={80} height={80} />
      </div>
    </main>
  );
}

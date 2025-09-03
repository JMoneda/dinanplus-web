import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "DINAN+",
  description: "Servicios de corte textil y moda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-black text-white py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6">
            <h1 className="text-2xl font-bold">
              <Link href="/">DINAN+</Link>
            </h1>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-gray-400 transition">
                Inicio
              </Link>
              <Link href="/servicios" className="hover:text-gray-400 transition">
                Servicios
              </Link>
              <Link href="/catalogo" className="hover:text-gray-400 transition">
                DINAN+
              </Link>
              <Link href="/contacto" className="hover:text-gray-400 transition">
                Contacto
              </Link>
            </nav>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-400 py-6 mt-10">
          <div className="container mx-auto text-center text-sm">
            <p>© {new Date().getFullYear()} DINAN+. Todos los derechos reservados.</p>
            <p className="mt-2">
              Síguenos en{" "}
              <a
                href="https://www.instagram.com/dinanplus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                Instagram
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

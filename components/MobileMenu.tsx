'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Evitar errores de hidratación
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Evitar scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Cerrar menú con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // No renderizar hasta que esté mounted para evitar hidratación
  if (!isMounted) {
    return (
      <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </button>
    )
  }

  return (
    <>
      {/* BOTÓN HAMBURGUESA */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          {isOpen ? (
            // ICONO X (CERRAR)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // ICONO HAMBURGUESA (ABRIR)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </div>
      </button>

      {/* OVERLAY CUANDO ESTÁ ABIERTO */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
          aria-label="Cerrar menú"
        />
      )}

      {/* PANEL DE NAVEGACIÓN MÓVIL */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER DEL MENÚ MÓVIL */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">DINAN+</h2>
          <button
            onClick={closeMenu}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Cerrar menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* NAVEGACIÓN MÓVIL */}
        <nav className="p-6" role="navigation" aria-label="Navegación móvil">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-lg"
                onClick={closeMenu}
                aria-label="Ir a página de inicio"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Inicio
              </Link>
            </li>
            
            <li>
              <Link
                href="/catalogo"
                className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-lg"
                onClick={closeMenu}
                aria-label="Ver catálogo de productos"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                DINAN+ Catálogo
              </Link>
            </li>
            
            <li>
              <Link
                href="/contacto"
                className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-lg"
                onClick={closeMenu}
                aria-label="Información de contacto"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contacto
              </Link>
            </li>
          </ul>

          {/* ENLACES RÁPIDOS ADICIONALES PARA MÓVIL */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">ENLACES RÁPIDOS</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/573243893455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-green-700 bg-green-600 transition-colors text-sm"
                  onClick={closeMenu}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
              
              <li>
                <a
                  href="https://instagram.com/dinanbasic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-pink-700 bg-pink-600 transition-colors text-sm"
                  onClick={closeMenu}
                >
                  <span className="mr-2">📱</span>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* FOOTER DEL MENÚ MÓVIL */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            © 2025 DINAN+<br />
            Ropa básica de calidad
          </p>
        </div>
      </div>
    </>
  )
}
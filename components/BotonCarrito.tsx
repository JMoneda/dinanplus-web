'use client'
import { useCarrito } from '@/context/CarritoContext'

export default function BotonCarrito() {
  const { state, toggleCarrito } = useCarrito()

  return (
    <button
      onClick={toggleCarrito}
      className="relative p-2 hover:bg-gray-800 rounded-lg transition flex items-center gap-2"
    >
      {/* Icono del carrito */}
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 004 16v1a1 1 0 001 1h1m2-8v4a1 1 0 001 1h8a1 1 0 001-1v-4M9 21a1 1 0 100-2 1 1 0 000 2zM20 21a1 1 0 100-2 1 1 0 000 2z" 
        />
      </svg>
      
      {/* Contador de items */}
      {state.cantidadTotal > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {state.cantidadTotal > 99 ? '99+' : state.cantidadTotal}
        </span>
      )}
      
      {/* Texto opcional para desktop */}
      <span className="hidden lg:block">
        {state.cantidadTotal > 0 ? `${state.cantidadTotal}` : 'Carrito'}
      </span>
    </button>
  )
}
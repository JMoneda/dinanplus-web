'use client'
import { useCarrito } from '@/context/CarritoContext'
import Link from 'next/link'

export default function CarritoSidebar() {
  const { state, removerItem, actualizarCantidad, toggleCarrito } = useCarrito()

  if (!state.isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleCarrito}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Carrito de Compras</h2>
          <button
            onClick={toggleCarrito}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        {state.items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">🛒</div>
              <p className="text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-sm">¡Agrega algunos productos!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  {/* Imagen placeholder */}
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👕</span>
                  </div>

                  {/* Info del producto */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.nombre}</h3>
                    <p className="text-xs text-gray-600">{item.color} • {item.talla}</p>
                    <p className="font-bold text-gray-900">${item.precio.toLocaleString()}</p>
                    
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs min-w-[2rem] text-center">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs hover:bg-gray-300"
                        disabled={item.cantidad >= item.stock_disponible}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removerItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Footer con total y checkout */}
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="text-2xl font-bold">${state.total.toLocaleString()}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                {state.cantidadTotal} {state.cantidadTotal === 1 ? 'artículo' : 'artículos'}
              </div>

              <Link
                href="/checkout"
                onClick={toggleCarrito}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold text-center block hover:bg-gray-800 transition"
              >
                Proceder al Checkout
              </Link>
              
              <button
                onClick={toggleCarrito}
                className="w-full border border-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Seguir Comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
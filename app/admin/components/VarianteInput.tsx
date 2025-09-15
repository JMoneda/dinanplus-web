import { useState } from 'react'

interface VarianteInputProps {
  color: string
  talla: string
  stock: number
  sku: string
  onStockChange: (nuevoStock: number) => void
}

export default function VarianteInput({ 
  color, 
  talla, 
  stock, 
  sku, 
  onStockChange 
}: VarianteInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempStock, setTempStock] = useState(stock.toString())

  const handleSave = () => {
    const nuevoStock = parseInt(tempStock) || 0
    onStockChange(nuevoStock)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempStock(stock.toString())
    setIsEditing(false)
  }

  const handleIncrement = () => {
    onStockChange(stock + 1)
  }

  const handleDecrement = () => {
    if (stock > 0) {
      onStockChange(stock - 1)
    }
  }

  const getStockColor = () => {
    if (stock <= 2) return 'border-red-300 bg-red-50'
    if (stock <= 5) return 'border-yellow-300 bg-yellow-50'
    return 'border-green-300 bg-green-50'
  }

  const getColorDisplay = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'Negro': 'bg-black',
      'Verde': 'bg-green-600',
      'Marfil': 'bg-yellow-100 border',
      'Mocca': 'bg-amber-700'
    }
    return colorMap[color] || 'bg-gray-400'
  }

  return (
    <div className={`border rounded-lg p-4 transition-colors ${getStockColor()}`}>
      {/* Header con color y talla */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className={`w-4 h-4 rounded-full ${getColorDisplay(color)}`}
            title={color}
          />
          <span className="text-sm font-medium text-gray-700">
            {color}
          </span>
        </div>
        <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded">
          {talla}
        </span>
      </div>

      {/* SKU */}
      <div className="text-xs text-gray-500 mb-3 font-mono">
        {sku}
      </div>

      {/* Stock controls */}
      <div className="space-y-3">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              value={tempStock}
              onChange={(e) => setTempStock(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-transparent"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave()
                if (e.key === 'Escape') handleCancel()
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              {stock}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleDecrement}
                disabled={stock <= 0}
                className="w-6 h-6 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded flex items-center justify-center text-sm font-bold"
              >
                -
              </button>
              <button
                onClick={handleIncrement}
                className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-sm font-bold"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 text-white text-xs py-1 px-2 rounded hover:bg-green-700 transition"
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 text-white text-xs py-1 px-2 rounded hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 transition"
            >
              Editar
            </button>
          )}
        </div>

        {/* Stock status */}
        <div className="text-center">
          {stock <= 2 ? (
            <span className="text-xs font-medium text-red-600">Crítico</span>
          ) : stock <= 5 ? (
            <span className="text-xs font-medium text-yellow-600">Bajo</span>
          ) : (
            <span className="text-xs font-medium text-green-600">Normal</span>
          )}
        </div>
      </div>
    </div>
  )
}
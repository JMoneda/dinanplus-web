import { useState, useEffect } from 'react'
import { supabase, type Producto } from '@/lib/supabase'
import { useToast } from '@/context/ToastContext'

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToast } = useToast()

  const fetchProductos = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('activo', true)
        .order('created_at', { ascending: false }) // Más recientes primero
        
      if (error) throw error
      
      setProductos(data || [])
    } catch (error) {
      console.error('Error al cargar productos:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      setError(errorMessage)
      addToast('Error cargando productos', 'error')
    } finally {
      setLoading(false)
    }
  }

  const actualizarProducto = async (id: number, updates: Partial<Producto>) => {
    try {
      const { error } = await supabase
        .from('productos')
        .update(updates)
        .eq('id', id)

      if (error) throw error

      // Actualizar estado local
      setProductos(prev => prev.map(p => 
        p.id === id ? { ...p, ...updates } : p
      ))

      addToast('Producto actualizado', 'success')
      return true
    } catch (error) {
      console.error('Error actualizando producto:', error)
      addToast('Error actualizando producto', 'error')
      return false
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  return { 
    productos, 
    loading, 
    error, 
    refetch: fetchProductos,
    actualizarProducto
  }
}
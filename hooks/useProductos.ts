import { useState, useEffect } from 'react'
import { supabase, type Producto } from '@/lib/supabase'

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProductos() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .eq('activo', true)
          .order('created_at', { ascending: true })

        if (error) {
          console.error('Error de Supabase:', error)
          throw error
        }

        console.log('Productos cargados desde Supabase:', data)
        setProductos(data || [])
      } catch (error) {
        console.error('Error al cargar productos:', error)
        setError(error instanceof Error ? error.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, [])

  return { productos, loading, error, refetch: () => {
    setLoading(true)
    setError(null)
  }}
}
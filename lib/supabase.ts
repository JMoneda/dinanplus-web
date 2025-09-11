import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos para TypeScript
export interface Producto {
  id: number
  nombre: string
  categoria: string
  genero: string
  precio: number
  descripcion: string
  material: string
  colores: string[]
  tallas: string[]
  imagen_url?: string
  activo: boolean
  stock: number
  created_at: string
  updated_at: string
}

export interface ProductoVariante {
  id: number
  producto_id: number
  color: string
  talla: string
  stock: number
  sku: string
  created_at: string
}

export interface Pedido {
  id: number
  numero_pedido: string
  cliente_nombre: string
  cliente_email: string
  cliente_telefono: string
  cliente_direccion: string
  ciudad: string
  total: number
  estado: string
  metodo_pago?: string
  notas?: string
  created_at: string
  updated_at: string
}
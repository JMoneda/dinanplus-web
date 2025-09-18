// utils/datosColombiaOptimizado.ts
// Datos optimizados de departamentos y municipios de Colombia
export const departamentosData = {
  'Antioquia': [
    'Medellín', 'Bello', 'Itagüí', 'Envigado', 'Apartadó', 'Rionegro', 
    'Sabaneta', 'Copacabana', 'La Estrella', 'Caldas', 'Turbo', 'Caucasia'
  ],
  'Bogotá D.C.': [
    'Bogotá D.C.'
  ],
  'Valle del Cauca': [
    'Cali', 'Palmira', 'Buenaventura', 'Tulúa', 'Cartago', 'Jamundí', 
    'Yumbo', 'Candelaria', 'Florida', 'Pradera'
  ],
  'Atlántico': [
    'Barranquilla', 'Soledad', 'Malambo', 'Sabanagrande', 'Puerto Colombia',
    'Galapa', 'Baranoa', 'Santo Tomás'
  ],
  'Bolívar': [
    'Cartagena', 'Magangué', 'Turbaco', 'Arjona', 'El Carmen de Bolívar'
  ],
  'Santander': [
    'Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja',
    'San Gil', 'Socorro', 'Barbosa'
  ],
  'Cundinamarca': [
    'Soacha', 'Facatativá', 'Chía', 'Zipaquirá', 'Fusagasugá', 
    'Girardot', 'Ubaté', 'Villa de San Diego de Ubate'
  ],
  'Norte de Santander': [
    'Cúcuta', 'Villa del Rosario', 'Los Patios', 'Ocaña', 'Pamplona'
  ],
  'Córdoba': [
    'Montería', 'Cereté', 'Sahagún', 'Planeta Rica', 'Lorica'
  ],
  'Cesar': [
    'Valledupar', 'Aguachica', 'Codazzi', 'Bosconia'
  ],
  'Sucre': [
    'Sincelejo', 'Corozal', 'San Marcos', 'Sampués'
  ],
  'Magdalena': [
    'Santa Marta', 'Ciénaga', 'Fundación', 'El Banco'
  ],
  'Tolima': [
    'Ibagué', 'Espinal', 'Melgar', 'Honda', 'Líbano'
  ],
  'Huila': [
    'Neiva', 'Pitalito', 'Garzón', 'La Plata'
  ],
  'Risaralda': [
    'Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia'
  ],
  'Quindío': [
    'Armenia', 'Calarcá', 'La Tebaida', 'Montenegro'
  ],
  'Caldas': [
    'Manizales', 'Villamaría', 'Chinchiná', 'La Dorada'
  ],
  'Meta': [
    'Villavicencio', 'Acacías', 'Granada', 'San Martín'
  ],
  'Nariño': [
    'Pasto', 'Tumaco', 'Ipiales', 'Túquerres'
  ],
  'Cauca': [
    'Popayán', 'Santander de Quilichao', 'Puerto Tejada'
  ],
  'Boyacá': [
    'Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá'
  ],
  'La Guajira': [
    'Riohacha', 'Maicao', 'Valledupar'
  ],
  'Casanare': [
    'Yopal', 'Aguazul', 'Villanueva'
  ],
  'Arauca': [
    'Arauca', 'Saravena', 'Tame'
  ],
  'Caquetá': [
    'Florencia', 'San Vicente del Caguán'
  ],
  'Putumayo': [
    'Mocoa', 'Puerto Asís'
  ],
  'Amazonas': [
    'Leticia'
  ],
  'Guainía': [
    'Inírida'
  ],
  'Guaviare': [
    'San José del Guaviare'
  ],
  'Vaupés': [
    'Mitú'
  ],
  'Vichada': [
    'Puerto Carreño'
  ],
  'Chocó': [
    'Quibdó', 'Istmina'
  ],
  'San Andrés y Providencia': [
    'San Andrés'
  ]
}

export const getDepartamentos = (): string[] => {
  return Object.keys(departamentosData).sort()
}

export const getMunicipios = (departamento: string): string[] => {
  const ciudades = departamentosData[departamento as keyof typeof departamentosData] || []
  // Agregar opción "Otra ciudad" al final
  return [...ciudades, 'Otra ciudad (escribir abajo)']
}
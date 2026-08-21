export interface Product {
  id: string
  name: string
  price: number
  description?: string
}

export interface Topping {
  id: string
  name: string
}

export interface OrderSelection {
  product: Product | null
  toppings: Topping[]
}

export interface OrderItem {
  id: string
  product: Product
  toppings: Topping[]
  extras: Extra[]
  notes?: string
}

export interface SalsaCategory {
  id: string
  name: string
  salsas: Topping[]
}

export interface Extra {
  id: string
  name: string
  price: number
}



export const products: Product[] = [
  {
    id: 'ricocky-sencillo',
    name: 'Ricocky sencillo',
    price: 5000,
  },
  {
    id: 'ricocky-especial',
    name: 'Ricocky especial',
    price: 7000,
    description: 'Queso + tocineta',
  },
]

export const toppings: Topping[] = [
  { id: 'cebolla-caramelizada', name: 'Cebolla caramelizada' },
  { id: 'guacamole', name: 'Guacamole' },
  { id: 'ripio-de-papa', name: 'Ripio de papa' },
  { id: 'pepino-dulce', name: 'Pepino dulce' },
  { id: 'ensalada-de-repollo', name: 'Ensalada de repollo' },
  { id: 'doritos', name: 'Doritos' },
  { id: 'pina-calada-tronco', name: 'Piña calada' },
  { id: 'maiz-dulce', name: 'Maíz dulce' },
  { id: 'topping-de-temporada', name: 'Topping de temporada' },
]

export const salsaCategories: SalsaCategory[] = [
  {
    id: 'salsas-tradicionales',
    name: 'Salsas tradicionales',
    salsas: [
      { id: 'bbq', name: 'BBQ' }, 
      { id: 'roja', name: 'ROJA' }
    ],
  },
  {
    id: 'salsas-artesanales',
    name: 'Salsas artesanales',
    salsas: [
      { id: 'salsa-rosada',name: 'Rosada' },
      { id: 'ajo-cremoso',name: 'Ajo cremoso' },
      { id: 'crema-pimenton',name: 'Crema de pimentón' },
      { id: 'salsa-pina', name: 'Piña' },
      { id: 'queso-cheddar',name: 'Queso cheddar' },      
    ],
  },
]

export const allSalsas: Topping[] = salsaCategories.flatMap(
  (category) => category.salsas,
)

const salsaIdSet = new Set(allSalsas.map((salsa) => salsa.id))

export const isSalsa = (id: string): boolean => salsaIdSet.has(id)

export const extras: Extra[] = [
  { id: 'salchicha-extra', name: 'Salchicha extra', price: 3000 },
  { id: 'mas-queso', name: 'Más queso', price: 2000 },
  { id: 'mas-tocineta', name: 'Más tocineta', price: 2000 },
]

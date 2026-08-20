export interface Product {
  id: string
  name: string
  price: number
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
}

export const products: Product[] = [
  {
    id: 'perro-sencillo',
    name: 'Perro sencillo',
    price: 5000,
  },
  {
    id: 'perro-especial',
    name: 'Perro especial',
    price: 7000,
  },
]

export const toppings: Topping[] = [
  { id: 'cebolla-caramelizada', name: 'Cebolla caramelizada' },
  { id: 'guacamole', name: 'Guacamole' },
  { id: 'ripio-de-papa', name: 'Ripio de papa' },
  { id: 'pepino-dulce', name: 'Pepino dulce' },
  { id: 'ensalada-de-repollo', name: 'Ensalada de repollo' },
  { id: 'doritos', name: 'Doritos' },
  { id: 'pina', name: 'Piña' },
  { id: 'maiz-dulce', name: 'Maíz dulce' },
  { id: 'topping-de-temporada', name: 'Topping de temporada' },
]

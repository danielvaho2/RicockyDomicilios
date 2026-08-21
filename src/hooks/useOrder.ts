import { useState } from 'react'
import type { Extra, OrderItem, Product, Topping } from '../data/menuData'

export interface BuildingItem {
  product: Product
  toppings: Topping[]
  extras: Extra[]
  notes?: string
  editId?: string
}

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function useOrder() {
  const [order, setOrder] = useState<OrderItem[]>([])
  const [buildingItem, setBuildingItem] = useState<BuildingItem | null>(null)

  const selectProduct = (product: Product) => {
    setBuildingItem({ product, toppings: [], extras: [] })
  }

  const confirmItem = (toppings: Topping[], extras: Extra[], notes: string) => {
    if (!buildingItem) return

    if (buildingItem.editId) {
      setOrder((prev) =>
        prev.map((item) =>
          item.id === buildingItem.editId
            ? { ...item, toppings, extras, notes: notes.trim() || undefined }
            : item
        )
      )
    } else {
      const newItem: OrderItem = {
        id: generateId(),
        product: buildingItem.product,
        toppings,
        extras,
        notes: notes.trim() || undefined,
      }
      setOrder((prev) => [...prev, newItem])
    }

    setBuildingItem(null)
  }

  const cancelBuild = () => {
    setBuildingItem(null)
  }

  const editItem = (item: OrderItem) => {
    setBuildingItem({
      product: item.product,
      toppings: item.toppings,
      extras: item.extras,
      notes: item.notes,
      editId: item.id,
    })
  }

  const deleteItem = (id: string) => {
    setOrder((prev) => prev.filter((item) => item.id !== id))
  }

  return {
    order,
    buildingItem,
    selectProduct,
    confirmItem,
    cancelBuild,
    editItem,
    deleteItem,
  }
}

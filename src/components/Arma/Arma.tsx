import { useState } from 'react'
import { products } from '../../data/menuData'
import type { Extra, Product, Topping, OrderItem } from '../../data/menuData'
import ProductSelector from './ProductSelector/ProductSelector'
import ItemBuilder from './ItemBuilder/ItemBuilder'
import OrderList from './OrderList/OrderList'
import './Arma.css'

function Arma() {
  const [order, setOrder] = useState<OrderItem[]>([])
  const [buildingItem, setBuildingItem] = useState<{
    product: Product
    toppings: Topping[]
    extras: Extra[]
    notes?: string
    editId?: string
  } | null>(null)

  const handleSelectProduct = (product: Product) => {
    setBuildingItem({ product, toppings: [], extras: [] })
  }

  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  const handleConfirmItem = (toppings: Topping[], extras: Extra[], notes: string) => {
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

  const handleCancelBuild = () => {
    setBuildingItem(null)
  }

  const handleEditItem = (item: OrderItem) => {
    setBuildingItem({
      product: item.product,
      toppings: item.toppings,
      extras: item.extras,
      notes: item.notes,
      editId: item.id,
    })
  }

  const handleDeleteItem = (id: string) => {
    setOrder((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <section id="armar" className="section">
      <div className="container">
        <h2 className="arma-title text-center">
          Arma <span>TU RICOCKY</span>
        </h2>
        <p className="text-center text-lg arma-subtitle-text">
          Elige tu tipo de perro y agrégale los toppings que quieras
        </p>

        <div className="arma-content">
          {buildingItem ? (
            <ItemBuilder
              key={buildingItem.editId || 'new'}
              product={buildingItem.product}
              initialToppings={buildingItem.toppings}
              initialExtras={buildingItem.extras}
              initialNotes={buildingItem.notes}
              isEditing={!!buildingItem.editId}
              onConfirm={handleConfirmItem}
              onCancel={handleCancelBuild}
            />
          ) : (
            <>
              <section className="arma-step-card">
                <header className="arma-step-card-header">
                  <span className="arma-step-card-title">Elige tu perro</span>
                  <span className="item-builder-step">Paso 1</span>
                </header>
                <div className="arma-step-card-body">
                  <ProductSelector
                    products={products}
                    onSelect={handleSelectProduct}
                  />
                </div>
              </section>
            </>
          )}

          {order.length > 0 && (
            <OrderList
              items={order}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Arma

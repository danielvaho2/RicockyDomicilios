import { useState } from 'react'
import { products } from '../../data/menuData'
import type { Product, Topping, OrderItem } from '../../data/menuData'
import ProductSelector from './ProductSelector/ProductSelector'
import ItemBuilder from './ItemBuilder/ItemBuilder'
import OrderList from './OrderList/OrderList'
import './Arma.css'

function Arma() {
  const [order, setOrder] = useState<OrderItem[]>([])
  const [buildingItem, setBuildingItem] = useState<{
    product: Product
    toppings: Topping[]
    editId?: string
  } | null>(null)

  const handleSelectProduct = (product: Product) => {
    setBuildingItem({ product, toppings: [] })
  }

  const handleConfirmItem = (toppings: Topping[]) => {
    if (!buildingItem) return

    if (buildingItem.editId) {
      setOrder((prev) =>
        prev.map((item) =>
          item.id === buildingItem.editId
            ? { ...item, toppings }
            : item
        )
      )
    } else {
      const newItem: OrderItem = {
        id: crypto.randomUUID(),
        product: buildingItem.product,
        toppings,
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
          Arma <span>tu perro</span>
        </h2>
        <p className="text-center text-lg arma-subtitle-text">
          Elige tu tipo de perro y agrégale los toppings que quieras
        </p>

        <div className="arma-content">
          {buildingItem ? (
            <ItemBuilder
              product={buildingItem.product}
              initialToppings={buildingItem.toppings}
              isEditing={!!buildingItem.editId}
              onConfirm={handleConfirmItem}
              onCancel={handleCancelBuild}
            />
          ) : (
            <>
              <div className="arma-step">
                <span className="arma-step-number">1</span>
                <span className="arma-step-label">Elegí tu perro</span>
              </div>
              <ProductSelector
                products={products}
                onSelect={handleSelectProduct}
              />
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

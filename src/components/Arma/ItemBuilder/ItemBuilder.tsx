import { useState } from 'react'
import { toppings } from '../../../data/menuData'
import type { Product, Topping } from '../../../data/menuData'
import './ItemBuilder.css'

interface ItemBuilderProps {
  product: Product
  initialToppings?: Topping[]
  isEditing?: boolean
  onConfirm: (toppings: Topping[]) => void
  onCancel: () => void
}

function ItemBuilder({ product, initialToppings = [], isEditing = false, onConfirm, onCancel }: ItemBuilderProps) {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>(initialToppings)

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings((prev) =>
      prev.some((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    )
  }

  const isSelected = (toppingId: string) => selectedToppings.some((t) => t.id === toppingId)

  return (
    <div className="item-builder">
      <div className="item-builder-banner">
        <span className="item-builder-banner-emoji">🌭</span>
        <div className="item-builder-banner-info">
          <span className="item-builder-banner-name">{product.name}</span>
          <span className="item-builder-banner-price">
            ${product.price.toLocaleString('es-CO')}
          </span>
        </div>
        <span className="item-builder-step">Paso 2</span>
      </div>

      <div className="item-builder-body">
        <p className="item-builder-hint">Selecciona los toppings que quieras, sin límite</p>

        <div className="item-builder-toppings">
          {toppings.map((topping) => (
            <button
              key={topping.id}
              className={`arma-topping-chip ${isSelected(topping.id) ? 'arma-topping-selected' : ''}`}
              onClick={() => toggleTopping(topping)}
            >
              {isSelected(topping.id) && <span className="arma-topping-check">✓</span>}
              {topping.name}
            </button>
          ))}
        </div>

        <div className="item-builder-actions">
          <button className="btn btn-outline btn-sm" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onConfirm(selectedToppings)}>
            {isEditing ? 'Actualizar' : 'Agregar a la orden'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemBuilder

import type { OrderItem as OrderItemType } from '../../../data/menuData'
import './OrderItem.css'

interface OrderItemProps {
  item: OrderItemType
  index: number
  onEdit: (item: OrderItemType) => void
  onDelete: (id: string) => void
}

function OrderItem({ item, index, onEdit, onDelete }: OrderItemProps) {
  return (
    <div className="order-item card card-static">
      <div className="order-item-accent" />
      <div className="order-item-body">
        <div className="order-item-header">
          <span className="order-item-number">#{index}</span>
          <span className="order-item-name">{item.product.name}</span>
          <span className="order-item-price">
            ${item.product.price.toLocaleString('es-CO')}
          </span>
        </div>

        {item.toppings.length > 0 && (
          <div className="order-item-toppings">
            {item.toppings.map((t) => (
              <span key={t.id} className="arma-summary-tag">{t.name}</span>
            ))}
          </div>
        )}

        <div className="order-item-actions">
          <button className="btn btn-outline btn-sm order-item-edit" onClick={() => onEdit(item)}>
            Editar
          </button>
          <button className="btn btn-outline btn-sm order-item-delete" onClick={() => onDelete(item.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderItem

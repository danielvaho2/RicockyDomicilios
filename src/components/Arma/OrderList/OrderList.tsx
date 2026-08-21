import type { OrderItem as OrderItemType } from '../../../data/menuData'
import OrderItem from '../OrderItem/OrderItem'
import './OrderList.css'

interface OrderListProps {
  items: OrderItemType[]
  onEdit: (item: OrderItemType) => void
  onDelete: (id: string) => void
}

function OrderList({ items, onEdit, onDelete }: OrderListProps) {
  const total = items.reduce(
    (sum, item) =>
      sum + item.product.price + item.extras.reduce((s, extra) => s + extra.price, 0),
    0,
  )

  return (
    <div className="order-list">
      <div className="order-list-header">
        <h3 className="order-list-title">Tu orden</h3>
        <span className="order-list-count">
          {items.length} {items.length === 1 ? 'ítem' : 'ítems'}
        </span>
      </div>
      <div className="order-list-items">
        {items.map((item, index) => (
          <OrderItem
            key={item.id}
            item={item}
            index={index + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <div className="order-list-total">
        <span>Total</span>
        <span className="order-list-total-amount">
          ${total.toLocaleString('es-CO')}
        </span>
      </div>
    </div>
  )
}

export default OrderList

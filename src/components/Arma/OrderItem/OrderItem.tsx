import { isSalsa } from '../../../data/menuData'
import type { OrderItem as OrderItemType, Topping } from '../../../data/menuData'
import './OrderItem.css'

interface OrderItemProps {
  item: OrderItemType
  index: number
  onEdit: (item: OrderItemType) => void
  onDelete: (id: string) => void
}

interface ItemGroupProps {
  label: string
  items: Topping[]
}

function ItemGroup({ label, items }: ItemGroupProps) {
  if (items.length === 0) return null

  return (
    <div className="order-item-group">
      <span className="order-item-group-label">{label}</span>
      <div className="order-item-tags">
        {items.map((t) => (
          <span key={t.id} className="arma-summary-tag">{t.name}</span>
        ))}
      </div>
    </div>
  )
}

function OrderItem({ item, index, onEdit, onDelete }: OrderItemProps) {
  const salsas = item.toppings.filter((t) => isSalsa(t.id))
  const toppings = item.toppings.filter((t) => !isSalsa(t.id))

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

        <ItemGroup label="Toppings" items={toppings} />
        <ItemGroup label="Salsas" items={salsas} />

        {item.extras.length > 0 && (
          <div className="order-item-group">
            <span className="order-item-group-label">Extras</span>
            <div className="order-item-tags">
              {item.extras.map((extra) => (
                <span key={extra.id} className="arma-summary-tag arma-summary-tag-extra">
                  {extra.name} +${extra.price.toLocaleString('es-CO')}
                </span>
              ))}
            </div>
          </div>
        )}

        {item.notes && (
          <p className="order-item-notes">{item.notes}</p>
        )}

        <div className="order-item-actions">
          <button className="btn btn-outline btn-sm order-item-edit" onClick={() => onEdit(item)} aria-label={`Editar ${item.product.name}`}>
            Editar
          </button>
          <button className="btn btn-outline btn-sm order-item-delete" onClick={() => onDelete(item.id)} aria-label={`Eliminar ${item.product.name}`}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderItem

import { products } from '../../data/menuData'
import { useOrder } from '../../hooks/useOrder'
import ProductSelector from './ProductSelector/ProductSelector'
import ItemBuilder from './ItemBuilder/ItemBuilder'
import OrderList from './OrderList/OrderList'
import './Arma.css'

function Arma() {
  const {
    order,
    buildingItem,
    selectProduct,
    confirmItem,
    cancelBuild,
    editItem,
    deleteItem,
  } = useOrder()

  return (
    <section id="armar" className="section">
      <div className="container">
        <h2 className="arma-title text-center">
          Arma <span>TU RICOCKY</span>
        </h2>
        <p className="text-center text-lg arma-subtitle-text">
          Elige tu tipo de <span>Ricocky</span> y agrégale los toppings que quieras
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
              onConfirm={confirmItem}
              onCancel={cancelBuild}
            />
          ) : (
            <>
              <section className="arma-step-card">
                <header className="arma-step-card-header">
                  <span className="arma-step-card-title">Elige tu <span>Ricocky</span></span>
                  <span className="badge-step">Paso 1</span>
                </header>
                <div className="arma-step-card-body">
                  <ProductSelector
                    products={products}
                    onSelect={selectProduct}
                  />
                </div>
              </section>
            </>
          )}

          {order.length > 0 && (
            <OrderList
              items={order}
              onEdit={editItem}
              onDelete={deleteItem}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Arma

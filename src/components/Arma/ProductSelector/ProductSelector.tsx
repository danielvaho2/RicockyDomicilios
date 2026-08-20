import type { Product } from '../../../data/menuData'
import './ProductSelector.css'

interface ProductSelectorProps {
  products: Product[]
  onSelect: (product: Product) => void
}

const productEmoji: Record<string, string> = {
  'perro-sencillo': '🌭',
  'perro-especial': '🔥',
}

function ProductSelector({ products, onSelect }: ProductSelectorProps) {
  return (
    <div className="arma-products">
      <h3 className="arma-subtitle text-center">¿Qué perro quieres agregar?</h3>
      <div className="arma-products-grid">
        {products.map((product) => (
          <button
            key={product.id}
            className="arma-product-card"
            onClick={() => onSelect(product)}
          >
            <span className="arma-product-emoji">{productEmoji[product.id] || '🌭'}</span>
            <div>
              <span className="arma-product-name">{product.name}</span>
              <span className="arma-product-price">
                ${product.price.toLocaleString('es-CO')}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductSelector

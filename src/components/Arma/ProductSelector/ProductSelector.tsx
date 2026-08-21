import type { Product } from '../../../data/menuData'
import './ProductSelector.css'

interface ProductSelectorProps {
  products: Product[]
  onSelect: (product: Product) => void
}

function ProductSelector({ products, onSelect }: ProductSelectorProps) {
  return (
    <div className="arma-products-grid">
      {products.map((product) => (
        <button
          key={product.id}
          className="arma-product-card"
          onClick={() => onSelect(product)}
        >
          <span className="arma-product-info">
            <span className="arma-product-name">{product.name}</span>
            {product.description && (
              <span className="arma-product-desc">{product.description}</span>
            )}
            <span className="arma-product-price">
              ${product.price.toLocaleString('es-CO')}
            </span>
          </span>
          <svg
            className="arma-product-arrow"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      ))}
    </div>
  )
}

export default ProductSelector

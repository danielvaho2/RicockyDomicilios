import { extras, salsaCategories, toppings } from '../../../data/menuData'
import type { Extra, Product, Topping } from '../../../data/menuData'
import { useItemBuilder } from '../../../hooks/useItemBuilder'
import StepSection from './StepSection'
import './ItemBuilder.css'

interface ItemBuilderProps {
  product: Product
  initialToppings?: Topping[]
  initialExtras?: Extra[]
  initialNotes?: string
  isEditing?: boolean
  onConfirm: (toppings: Topping[], extras: Extra[], notes: string) => void
  onCancel: () => void
}

function ItemBuilder({
  product,
  initialToppings = [],
  initialExtras = [],
  initialNotes = '',
  isEditing = false,
  onConfirm,
  onCancel,
}: ItemBuilderProps) {
  const {
    selectedToppings,
    selectedExtras,
    notes,
    setNotes,
    openSection,
    toggleSection,
    toggleTopping,
    toggleExtra,
    isSelected,
    extrasTotal,
    selectedSalsasCount,
    selectedToppingsCount,
    allSalsasSelected,
    someSalsasSelected,
    allToppingsSelected,
    someToppingsSelected,
    toggleAllSalsas,
    toggleAllToppings,
  } = useItemBuilder({ initialToppings, initialExtras, initialNotes })

  return (
    <div className="item-builder">
      <div className="item-builder-banner">
        <div className="item-builder-banner-info">
          <span className="item-builder-banner-name">{product.name}</span>
          {isEditing && <span className="item-builder-banner-tag">Editando</span>}
        </div>
        <span className="item-builder-banner-price">
          ${product.price.toLocaleString('es-CO')}
        </span>
      </div>

      <div className="item-builder-body">
        <p className="item-builder-hint">Personaliza tu perro paso a paso</p>

         <StepSection
          id="toppings"
          title="Toppings"
          badge="Paso 2"
          count={selectedToppingsCount}
          isOpen={openSection === 'toppings'}
          onToggle={() => toggleSection('toppings')}
        >
          <label className="item-builder-select-all">
            <input
              ref={(el) => {
                if (el) el.indeterminate = someToppingsSelected
              }}
              type="checkbox"
              checked={allToppingsSelected}
              onChange={toggleAllToppings}
            />
            Seleccionar todos
          </label>
          <div className="item-builder-toppings">
            {toppings.map((topping) => (
              <button
                key={topping.id}
                className={`arma-topping-chip ${isSelected(topping.id) ? 'arma-topping-selected' : ''}`}
                onClick={() => toggleTopping(topping)}
              >
                {topping.name}
              </button>
            ))}
          </div>
        </StepSection>

        <StepSection
          id="salsas"
          title="Salsas"
          badge="Paso 3"
          count={selectedSalsasCount}
          isOpen={openSection === 'salsas'}
          onToggle={() => toggleSection('salsas')}
        >
          <label className="item-builder-select-all">
            <input
              ref={(el) => {
                if (el) el.indeterminate = someSalsasSelected
              }}
              type="checkbox"
              checked={allSalsasSelected}
              onChange={toggleAllSalsas}
            />
            Seleccionar todas
          </label>
          {salsaCategories.map((category) => (
            <div key={category.id} className="item-builder-subgroup">
              <span className="item-builder-subgroup-name">{category.name}</span>
              <div className="item-builder-toppings">
                {category.salsas.map((salsa) => (
                  <button
                    key={salsa.id}
                    className={`arma-topping-chip ${isSelected(salsa.id) ? 'arma-topping-selected' : ''}`}
                    onClick={() => toggleTopping(salsa)}
                  >
                    {salsa.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </StepSection>

        <StepSection
          id="extras"
          title="Extras"
          badge="Adicional"
          count={selectedExtras.length}
          isOpen={openSection === 'extras'}
          onToggle={() => toggleSection('extras')}
        >
          <div className="item-builder-toppings">
            {extras.map((extra) => (
              <button
                key={extra.id}
                className={`arma-topping-chip ${isSelected(extra.id) ? 'arma-topping-selected' : ''}`}
                onClick={() => toggleExtra(extra)}
              >
                {extra.name}
                <span className="arma-topping-price">
                  +${extra.price.toLocaleString('es-CO')}
                </span>
              </button>
            ))}
          </div>

          <div className="item-builder-notes">
            <label htmlFor="item-builder-notes-input" className="item-builder-notes-label">
              Detalles para este ítem (opcional)
            </label>
            <textarea
              id="item-builder-notes-input"
              className="item-builder-notes-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: más salsa de ajo, un poco de cada topping, etc."
              rows={3}
              maxLength={250}
            />
          </div>
        </StepSection>

        <div className="item-builder-actions">
          <button className="btn btn-outline btn-sm" onClick={onCancel}>
            Cancelar
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              onConfirm(
                selectedToppings,
                selectedExtras,
                notes
              )
            }
          >
            {isEditing ? 'Actualizar' : `Agregar a la orden · $${(product.price + extrasTotal).toLocaleString('es-CO')}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemBuilder

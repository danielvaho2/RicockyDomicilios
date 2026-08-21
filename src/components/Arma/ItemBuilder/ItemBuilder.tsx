import { useState } from 'react'
import type { ReactNode } from 'react'
import { allSalsas, extras, salsaCategories, toppings } from '../../../data/menuData'
import type { Extra, Product, Topping } from '../../../data/menuData'
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

interface StepSectionProps {
  id: string
  title: string
  badge: string
  count: number
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}

function StepSection({ id, title, badge, count, isOpen, onToggle, children }: StepSectionProps) {
  return (
    <div className="item-builder-section">
      <button
        type="button"
        className="item-builder-section-header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`item-builder-panel-${id}`}
      >
        <span className="item-builder-section-title">
          {title}
          {count > 0 && <span className="item-builder-section-count"> · {count}</span>}
        </span>
        <span className="item-builder-step">{badge}</span>
        <svg
          className={`item-builder-chevron ${isOpen ? 'item-builder-chevron-open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <div id={`item-builder-panel-${id}`} className="item-builder-section-body">
          {children}
        </div>
      )}
    </div>
  )
}

const salsaIds = new Set(allSalsas.map((salsa) => salsa.id))
const toppingIds = new Set(toppings.map((topping) => topping.id))

function ItemBuilder({
  product,
  initialToppings = [],
  initialExtras = [],
  initialNotes = '',
  isEditing = false,
  onConfirm,
  onCancel,
}: ItemBuilderProps) {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>(initialToppings)
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(initialExtras)
  const [notes, setNotes] = useState(initialNotes)
  const [openSection, setOpenSection] = useState<string | null>('salsas')

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings((prev) =>
      prev.some((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    )
  }

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    )
  }

  const isSelected = (id: string) =>
    selectedToppings.some((t) => t.id === id) || selectedExtras.some((e) => e.id === id)

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id))
  }

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0)

  const selectedSalsasCount = selectedToppings.filter((t) => salsaIds.has(t.id)).length
  const selectedToppingsCount = selectedToppings.length - selectedSalsasCount

  const allSalsasSelected = allSalsas.length > 0 && allSalsas.every((s) => isSelected(s.id))
  const someSalsasSelected = selectedSalsasCount > 0 && !allSalsasSelected

  const allToppingsSelected =
    toppings.length > 0 && toppings.every((t) => isSelected(t.id))
  const someToppingsSelected = selectedToppingsCount > 0 && !allToppingsSelected

  const toggleAllSalsas = () => {
    setSelectedToppings((prev) => {
      const rest = prev.filter((t) => !salsaIds.has(t.id))
      return allSalsasSelected ? rest : [...rest, ...allSalsas]
    })
  }

  const toggleAllToppings = () => {
    setSelectedToppings((prev) => {
      const rest = prev.filter((t) => !toppingIds.has(t.id))
      return allToppingsSelected ? rest : [...rest, ...toppings]
    })
  }

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
      </div>

      <div className="item-builder-body">
        <p className="item-builder-hint">Personaliza tu perro paso a paso</p>

        <StepSection
          id="salsas"
          title="Salsas"
          badge="Paso 2"
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
                    {isSelected(salsa.id) && <span className="arma-topping-check"></span>}
                    {salsa.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </StepSection>

        <StepSection
          id="toppings"
          title="Toppings"
          badge="Paso 3"
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
                {isSelected(topping.id) && <span className="arma-topping-check"></span>}
                {topping.name}
              </button>
            ))}
          </div>
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
                {isSelected(extra.id) && <span className="arma-topping-check">✓</span>}
                {extra.name}
                <span className="arma-topping-price">
                  +${extra.price.toLocaleString('es-CO')}
                </span>
              </button>
            ))}
          </div>

          <div className="item-builder-notes">
            <label htmlFor="item-builder-notes-input" className="item-builder-notes-label">
              ¿Algo más? (detalles)
            </label>
            <textarea
              id="item-builder-notes-input"
              className="item-builder-notes-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Pon mas salsa de ajo, un poco de cada topping, etc."
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
            onClick={() => onConfirm(selectedToppings, selectedExtras, notes)}
          >
            {isEditing ? 'Actualizar' : `Agregar a la orden · $${(product.price + extrasTotal).toLocaleString('es-CO')}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemBuilder

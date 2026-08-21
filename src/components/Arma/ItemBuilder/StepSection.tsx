import type { ReactNode } from 'react'

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
        <span className="badge-step">{badge}</span>
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

export default StepSection

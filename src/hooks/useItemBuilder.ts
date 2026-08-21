import { useState } from 'react'
import { allSalsas, isSalsa, toppings } from '../data/menuData'
import type { Extra, Topping } from '../data/menuData'

interface UseItemBuilderOptions {
  initialToppings?: Topping[]
  initialExtras?: Extra[]
  initialNotes?: string
}

const toppingIds = new Set(toppings.map((topping) => topping.id))

export function useItemBuilder({
  initialToppings = [],
  initialExtras = [],
  initialNotes = '',
}: UseItemBuilderOptions = {}) {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>(initialToppings)
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(initialExtras)
  const [notes, setNotes] = useState(initialNotes)
  const [openSection, setOpenSection] = useState<string | null>('toppings')

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

  const selectedSalsasCount = selectedToppings.filter((t) => isSalsa(t.id)).length
  const selectedToppingsCount = selectedToppings.length - selectedSalsasCount

  const allSalsasSelected =
    allSalsas.length > 0 && allSalsas.every((s) => isSelected(s.id))
  const someSalsasSelected = selectedSalsasCount > 0 && !allSalsasSelected

  const allToppingsSelected =
    toppings.length > 0 && toppings.every((t) => isSelected(t.id))
  const someToppingsSelected = selectedToppingsCount > 0 && !allToppingsSelected

  const toggleAllSalsas = () => {
    setSelectedToppings((prev) => {
      const rest = prev.filter((t) => !isSalsa(t.id))
      return allSalsasSelected ? rest : [...rest, ...allSalsas]
    })
  }

  const toggleAllToppings = () => {
    setSelectedToppings((prev) => {
      const rest = prev.filter((t) => !toppingIds.has(t.id))
      return allToppingsSelected ? rest : [...rest, ...toppings]
    })
  }

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0)

  return {
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
  }
}

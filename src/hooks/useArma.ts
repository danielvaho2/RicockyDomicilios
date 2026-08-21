import { useState, useCallback } from 'react'

export function useArma() {
  const [showArma, setShowArma] = useState(false)

  const openArma = useCallback(() => {
    setShowArma(true)
    // Doble rAF: espera a que React monte la sección y el layout esté estable
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('armar')?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }, [])

  return { showArma, openArma }
}

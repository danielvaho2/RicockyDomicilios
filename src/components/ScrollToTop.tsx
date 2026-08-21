import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Doble rAF: espera a que React monte la página y el layout esté estable
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({ behavior: 'smooth' })
        })
      })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop

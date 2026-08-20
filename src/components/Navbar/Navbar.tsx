import { useState } from 'react'
import './Navbar.css'

const navLinks = [
  { label: '¡Armar!', href: '#armar' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Nosotros', href: '#nosotros' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="container flex-between">
        <a href="/" className="navbar-logo">Ricockys</a>

        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href} className="navbar-link">
              <a href={link.href} onClick={closeMenu}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

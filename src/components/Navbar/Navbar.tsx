import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { label: 'Inicio', to: '/', end: true },
  { label: '¡Armar!', to: '/armar' },
  { label: 'Eventos', to: '/eventos' },
  { label: 'Nosotros', to: '/nosotros' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="container flex-between">
        <Link to="/" className="navbar-logo">
          <img
            src="/Ricockys_logo.jpg"
            alt="Logo Ricockys"
            className="navbar-logo-img"
          />
          Ricockys
        </Link>

        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <ul id="navbar-menu" className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to} className="navbar-link">
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

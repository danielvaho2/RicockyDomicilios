import { Link } from 'react-router-dom'
import './Hero.css'
import Carousel from '../Carousel/Carousel'
import { carruselImages } from '../../data/carruselData'

const heroContent = {
  title: ['Arma, ', 'combina', ' y disfruta'],
  subtitle: 'Uno nunca es suficiente',
}

const heroButtons = [
  { label: 'Arma tu pedido', to: '/armar', variant: 'btn-primary' },
  { label: 'Eventos', to: '/eventos', variant: 'btn-outline' },
  { label: 'Nosotros', to: '/nosotros', variant: 'btn-outline' },
]

function Hero() {
  return (
    <section className="hero">
      <Carousel images={carruselImages} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">
          {heroContent.title[0]}<span>{heroContent.title[1]}</span>{heroContent.title[2]}
        </h1>
        <p className="hero-subtitle">{heroContent.subtitle}</p>
        <div className="hero-buttons">
          {heroButtons.map((btn) => (
            <Link key={btn.label} to={btn.to} className={`btn ${btn.variant} btn-lg`}>
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

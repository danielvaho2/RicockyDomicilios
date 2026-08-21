import './Hero.css'
import Carousel from '../Carousel/Carousel'
import { carruselImages } from '../../data/carruselData'

const heroContent = {
  title: ['Arma, ', 'combina', ' y disfruta'],
  subtitle: 'Uno nunca es suficiente',
}

const heroButtons = [
  { label: 'Arma tu pedido', href: '#armar', variant: 'btn-primary' },
  { label: 'Eventos', href: '#eventos', variant: 'btn-outline' },
  { label: 'Nosotros', href: '#nosotros', variant: 'btn-outline' },
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
            <a key={btn.label} href={btn.href} className={`btn ${btn.variant} btn-lg`}>
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

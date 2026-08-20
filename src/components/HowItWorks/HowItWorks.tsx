import './HowItWorks.css'

const steps = [
  {
    number: '1',
    emoji: '🌭',
    title: 'Escogé tu Ricocky',
    description: 'Elegí entre nuestro perro sencillo o especial',
  },
  {
    number: '2',
    emoji: '🫗',
    title: 'Escogé tus salsas',
    description: 'Agregale la salsa que más te guste',
  },
  {
    number: '3',
    emoji: '🧀',
    title: 'Escogé tus toppings',
    description: 'Toppings ilimitados, sin costo adicional',
  },
  {
    number: '4',
    emoji: '🔄',
    title: 'Repetí',
    description: 'Uno nunca es suficiente',
  },
]

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="how-it-works-title text-center">
          Cómo armar tu <span>RICOCKY</span>
        </h2>
        <p className="how-it-works-subtitle text-center">
          Seguí estos pasos y armá el perro perfecto
        </p>

        <div className="how-it-works-grid">
          {steps.map((step) => (
            <div key={step.number} className="how-it-works-card">
              <div className="how-it-works-card-top">
                <span className="how-it-works-emoji">{step.emoji}</span>
                <span className="how-it-works-number">{step.number}</span>
              </div>
              <h3 className="how-it-works-card-title">{step.title}</h3>
              <p className="how-it-works-card-desc">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="how-it-works-cta text-center">
          Uno nunca es suficiente
        </p>
      </div>
    </section>
  )
}

export default HowItWorks

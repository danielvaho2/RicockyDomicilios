import './HowItWorks.css'

const steps = [
  {
    number: '1',
    title: 'Escogé tu Ricocky',
    description: 'Sencillo o especial, el que más te guste',
  },
  {
    number: '2',
    title: 'Escogé tus salsas',
    description: 'La salsa perfecta para tu perro',
  },
  {
    number: '3',
    title: 'Escogé tus toppings',
    description: 'Sin límite, sin costo extra',
  },
  {
    number: '4',
    title: 'Repite',
    description: 'Uno nunca es suficiente',
  },
]

interface HowItWorksProps {
  onArmaClick: () => void
}

function HowItWorks({ onArmaClick }: HowItWorksProps) {
  return (
    <section className="hiw-section">
      <div className="container">
        <h2 className="hiw-title text-center">
          Cómo armar tu <span>RICOCKY</span>
        </h2>
        <p className="hiw-subtitle text-center">
          Armalo a tu gusto. Nosotros ponemos el resto.
        </p>

        <div className="hiw-timeline">
          <div className="hiw-line" />

          {steps.map((step, index) => (
            <div key={step.number} className={`hiw-item ${index % 2 === 0 ? 'hiw-item--left' : 'hiw-item--right'}`}>
              <div className="hiw-dot">
                <span className="hiw-dot-num">{step.number}</span>
              </div>
              <div className="hiw-card">
                <h3 className="hiw-card-title">{step.title}</h3>
                <p className="hiw-card-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hiw-finish">
          <img
            className="hiw-finish-img"
            src="/image.png"
            alt="Ricocky perfecto"
            width={671}
            height={899}
            loading="lazy"
          />
          <p className="hiw-finish-text">RICOCKY PERFECTO</p>
          <p className="hiw-finish-cta">"Uno nunca es suficiente"</p>
        </div>

        <div className="hiw-cta-wrapper text-center">
          <button className="btn btn-primary btn-lg" onClick={onArmaClick}>
            Arma el tuyo
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

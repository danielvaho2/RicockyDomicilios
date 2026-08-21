import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function EventosPage() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <section className="section">
          <div className="container page-hero text-center">
            <h1>
              Eventos <span>Ricockys</span>
            </h1>
            <p>
              Cumpleaños, reuniones y celebraciones con los mejores perros de
              Bello. Estamos preparando esta sección.
            </p>
            <div className="page-hero-cta">
              <Link to="/armar" className="btn btn-primary btn-lg">
                Mientras tanto, ¡arma tu pedido!
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default EventosPage

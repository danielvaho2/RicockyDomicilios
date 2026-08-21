import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function NosotrosPage() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <section className="section">
          <div className="container page-hero text-center">
            <h1>
              Sobre <span>Nosotros</span>
            </h1>
            <p>
              Somos Ricockys Domicilios, perros calientes artesanales a
              domicilio en Bello, Antioquia. Pronto te contaremos nuestra
              historia completa.
            </p>
            <div className="page-hero-cta">
              <Link to="/armar" className="btn btn-primary btn-lg">
                ¡Arma tu pedido!
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default NosotrosPage

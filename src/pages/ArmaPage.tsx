import Navbar from '../components/Navbar/Navbar'
import Arma from '../components/Arma/Arma'
import Footer from '../components/Footer/Footer'

function ArmaPage() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Arma />
      </main>

      <Footer />
    </>
  )
}

export default ArmaPage

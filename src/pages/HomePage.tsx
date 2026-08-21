import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import HowItWorks from '../components/HowItWorks/HowItWorks'
import Footer from '../components/Footer/Footer'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="stripe-divider" />

      <main className="main-content">
        <HowItWorks />
      </main>

      <Footer />
    </>
  )
}

export default HomePage

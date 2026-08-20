import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Arma from './components/Arma/Arma'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="stripe-divider" />

      <main className="main-content">
        <HowItWorks />
        <Arma />
      </main>

      <Footer />
    </>
  )
}

export default App

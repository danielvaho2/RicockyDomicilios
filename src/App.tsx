import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ArmaPage from './pages/ArmaPage'
import EventosPage from './pages/EventosPage'
import NosotrosPage from './pages/NosotrosPage'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/armar" element={<ArmaPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App

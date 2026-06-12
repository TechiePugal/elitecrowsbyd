import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Coimbatore from './pages/Coimbatore'
import Tiruppur from './pages/Tiruppur'
import Erode from './pages/Erode'
import Salem from './pages/Salem'
import ServiceAreas from './pages/ServiceAreas'
import Footer from './pages/Footer'
import WhatsAppFloat from './pages/WhatsAppFloat'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/coimbatore" element={<Coimbatore />} />
        <Route path="/tiruppur" element={<Tiruppur />} />
        <Route path="/erode" element={<Erode />} />
        <Route path="/salem" element={<Salem />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default App

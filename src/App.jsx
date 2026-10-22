import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Flavors from './pages/Flavors'
import Reviews from './pages/Reviews'
import About from './pages/About'
import Contact from './pages/Contact'
import { flavors } from './data'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0].id)
  const location = useLocation()

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      const navOffset = 80
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - (id === 'home' ? 0 : navOffset)
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }, [])

  const handleOrderFlavor = useCallback((flavorId) => {
    if (flavorId) setSelectedFlavor(flavorId)
    scrollToSection('contact')
  }, [scrollToSection])

  const handleScrollToReviews = useCallback(() => {
    scrollToSection('reviews')
  }, [scrollToSection])

  // Handle route matching or hash jumps (e.g. visiting /flavors, /reviews, /about, /contact directly)
  useEffect(() => {
    const rawPath = location.pathname.replace('/', '')
    if (rawPath && ['flavors', 'reviews', 'about', 'contact'].includes(rawPath)) {
      setTimeout(() => scrollToSection(rawPath), 150)
    } else if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => scrollToSection(id), 150)
    }
  }, [location, scrollToSection])

  // Track active section on scroll for navbar active pill indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'flavors', 'reviews', 'about', 'contact']
      const scrollPosition = window.scrollY + 240

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="landing-wrapper">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
      <main>
        <Home
          onOrderFlavor={handleOrderFlavor}
          onScrollToReviews={handleScrollToReviews}
        />
        <div className="landing-content">
          <Flavors
            onOrderFlavor={handleOrderFlavor}
            onScrollToReviews={handleScrollToReviews}
          />
          <Reviews onOrderFlavor={handleOrderFlavor} />
          <About />
          <Contact
            selectedFlavor={selectedFlavor}
            setSelectedFlavor={setSelectedFlavor}
          />
        </div>
      </main>
      <Footer onNavigate={scrollToSection} />
    </div>
  )
}

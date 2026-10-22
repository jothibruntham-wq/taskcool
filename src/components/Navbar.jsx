import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'flavors', label: 'Flavors' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection = 'home', onNavigate }) {
  const [open, setOpen] = useState(false)

  const handleNav = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    if (onNavigate) {
      onNavigate(id)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        className="nav glass"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}
      >
        <a href="#home" className="logo" onClick={handleNav('home')}>
          Velvetspoon
        </a>

        <ul className="nav-links">
          {links.map((l) => {
            const isActive = activeSection === l.id
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={handleNav(l.id)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span>{l.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={handleNav('contact')}
          className="btn nav-cta"
        >
          Order now
        </button>

        <button
          className="burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={open ? 'bar open' : 'bar'} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu glass"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={handleNav(l.id)}
                className={`mobile-link ${activeSection === l.id ? 'active' : ''}`}
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleNav('contact')}
              className="btn"
              style={{
                marginTop: '8px',
                background: 'var(--parrot-ink)',
                color: '#bbf451',
                width: '100%',
              }}
            >
              Order now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { useState } from 'react'

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (email.trim()) setDone(true)
  }

  const handleLink = (id) => (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(id)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer-inner glass">
        <div className="footer-brand">
          <span className="logo">Velvetspoon</span>
          <p>Restaurant desserts, set in a can. Open it, grab a spoon.</p>
          <div className="footer-badge">
            <span className="badge-dot" /> Freshly crafted &amp; shipped cold
          </div>
        </div>

        <nav className="footer-col" aria-label="Footer navigation">
          <h3>Quick Links</h3>
          <a href="#home" onClick={handleLink('home')}>Home</a>
          <a href="#flavors" onClick={handleLink('flavors')}>Flavors</a>
          <a href="#about" onClick={handleLink('about')}>About Us</a>
          <a href="#contact" onClick={handleLink('contact')}>Order &amp; Contact</a>
        </nav>

        <form className="footer-col" onSubmit={submit}>
          <h3>Flavor news</h3>
          <p className="footer-subtext">Be the first to know about new seasonal drops.</p>
          {done ? (
            <p className="footer-ok">Thanks! You are on our VIP list.</p>
          ) : (
            <div className="footer-form">
              <input
                type="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn" type="submit">
                Join
              </button>
            </div>
          )}
        </form>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Velvetspoon. All rights reserved.</p>
          <button type="button" className="back-to-top" onClick={handleLink('home')}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (email.trim()) setDone(true)
  }

  return (
    <footer className="footer">
      <div className="footer-inner glass">
        <div className="footer-brand">
          <span className="logo">Velvetspoon</span>
          <p>Restaurant desserts, set in a can. Open it, grab a spoon.</p>
        </div>

        <nav className="footer-col" aria-label="Footer">
          <h3>Pages</h3>
          <Link to="/">Home</Link>
          <Link to="/flavors">Flavors</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <form className="footer-col" onSubmit={submit}>
          <h3>Flavor news</h3>
          {done ? (
            <p className="footer-ok">Thanks, you are on the list.</p>
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

        <p className="footer-copy">© 2026 Velvetspoon. All rights reserved.</p>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { flavors } from '../data'

export default function Contact({ selectedFlavor, setSelectedFlavor }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }
  const currentFlavorId = selectedFlavor || flavors[0].id
  const chosen = flavors.find((f) => f.id === currentFlavorId) || flavors[0]

  return (
    <section className="landing-section" id="contact">
      <div className="section-container">
        <h2 className="page-title">Order or say hello</h2>
        <p className="page-lead">
          Tell us which flavor you want and where to send it. We reply within one working day.
        </p>

        <div className="contact-grid">
          <div className="glass form-card">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="ok"
                  className="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3>Order request sent!</h3>
                  <p>
                    Thanks {form.name || 'there'}! We will email {form.email || 'you'} about your order of <strong>{chosen.name}</strong>.
                  </p>
                  <button className="btn ghost" onClick={() => setSent(false)}>
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <label className="field">
                    <span>Name</span>
                    <input
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Your name"
                    />
                  </label>
                  <label className="field">
                    <span>Email</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@email.com"
                    />
                  </label>
                  <label className="field">
                    <span>Flavor</span>
                    <select
                      value={currentFlavorId}
                      onChange={(e) => setSelectedFlavor?.(e.target.value)}
                    >
                      {flavors.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name} - ${f.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <span>Message</span>
                    <textarea
                      rows="4"
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Delivery address, quantity, any special requests..."
                    />
                  </label>
                  <button className="btn" type="submit">
                    Send order request
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <aside className="glass info-card">
            <h3>Find us</h3>
            <p><strong>Email:</strong> hello@velvetspoon.example</p>
            <p><strong>Hours:</strong> Monday to Saturday, 9 am to 6 pm</p>
            <p><strong>Shipping:</strong> Cans ship chilled in insulated boxes and arrive within two days.</p>
            <div className="info-highlight">
              <p>🥄 Spoon included inside every can lid</p>
              <p>❄️ Store refrigerated at 2°C – 5°C</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

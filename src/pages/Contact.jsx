import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Page from '../components/Page'
import { flavors } from '../data'

export default function Contact() {
  const { state } = useLocation()
  const [form, setForm] = useState({
    name: '',
    email: '',
    flavor: state?.flavor || flavors[0].id,
    message: '',
  })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }
  const chosen = flavors.find((f) => f.id === form.flavor)

  return (
    <Page>
      <h1 className="page-title">Order or say hello</h1>
      <p className="page-lead">Tell us which flavor you want and where to send it. We reply within one working day.</p>

      <div className="contact-grid">
        <div className="glass form-card">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div key="ok" className="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <h2>Order request sent</h2>
                <p>
                  Thanks {form.name || 'there'}. We will email {form.email || 'you'} about your {chosen.name}.
                </p>
                <button className="btn ghost" onClick={() => setSent(false)}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <label className="field">
                  <span>Name</span>
                  <input required value={form.name} onChange={set('name')} placeholder="Your name" />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" />
                </label>
                <label className="field">
                  <span>Flavor</span>
                  <select value={form.flavor} onChange={set('flavor')}>
                    {flavors.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} - ${f.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Message</span>
                  <textarea rows="4" value={form.message} onChange={set('message')} placeholder="Delivery address, quantity, questions" />
                </label>
                <button className="btn" type="submit">
                  Send order request
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <aside className="glass info-card">
          <h2>Find us</h2>
          <p>hello@velvetspoon.example</p>
          <p>Monday to Saturday, 9 am to 6 pm</p>
          <p>Cans ship chilled and arrive within two days.</p>
        </aside>
      </div>
    </Page>
  )
}

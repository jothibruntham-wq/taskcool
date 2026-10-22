import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { flavors } from '../data'
import { drawLabel } from '../canLabel'

export default function Flavors({ onOrderFlavor }) {
  const images = useMemo(() => flavors.map((f) => drawLabel(f).toDataURL('image/png')), [])

  return (
    <section className="landing-section" id="flavors">
      <div className="section-container">
        <h2 className="page-title">Pick a can</h2>
        <p className="page-lead">
          Three flavors, each set in the can and ready to eat. Chill it, pop the lid, and use the spoon that comes inside.
        </p>

        <div className="grid">
          {flavors.map((f, i) => (
            <motion.article
              key={f.id}
              className="card glass"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img className="card-img" src={images[i]} alt={`${f.name} can label`} loading="lazy" />
              <h3>{f.name}</h3>
              <p>{f.desc}</p>
              <ul className="chips">
                {f.notes.map((n) => (
                  <li key={n} className="chip">
                    {n}
                  </li>
                ))}
              </ul>
              <div className="card-foot">
                <span className="price">${f.price.toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => onOrderFlavor?.(f.id)}
                  className="btn"
                >
                  Order
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

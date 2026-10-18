import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/Page'
import { flavors } from '../data'
import { drawLabel } from '../canLabel'

export default function Flavors() {
  const images = useMemo(() => flavors.map((f) => drawLabel(f).toDataURL('image/png')), [])

  return (
    <Page>
      <h1 className="page-title">Pick a can</h1>
      <p className="page-lead">
        Three flavors, each set in the can and ready to eat. Chill it, pop the lid, and use the spoon that comes inside.
      </p>

      <div className="grid">
        {flavors.map((f, i) => (
          <motion.article key={f.id} className="card glass" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <img className="card-img" src={images[i]} alt={`${f.name} can label`} />
            <h2>{f.name}</h2>
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
              <Link to="/contact" state={{ flavor: f.id }} className="btn">
                Order
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </Page>
  )
}

import { motion, AnimatePresence } from 'framer-motion'

const Berry = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 40 40">
    <defs>
      <radialGradient id="berryG" cx=".35" cy=".3">
        <stop offset="0" stopColor="#6d7dff" />
        <stop offset="1" stopColor="#1c2480" />
      </radialGradient>
    </defs>
    <circle cx="20" cy="20" r="18" fill="url(#berryG)" />
    <path d="M20 12l2.5 3.5-2.5 2.5-2.5-2.5z" fill="#0e1348" />
  </svg>
)

const Almond = ({ s }) => (
  <svg width={s} height={s * 1.5} viewBox="0 0 40 60">
    <path d="M20 2C32 14 38 34 20 58 2 34 8 14 20 2z" fill="#b8702c" />
    <path d="M20 8C28 18 31 34 20 50 9 34 12 18 20 8z" fill="#f1d3a0" />
  </svg>
)

const Cookie = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 40 40">
    <defs>
      <pattern id="waffle" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 0H8V8H0z" fill="none" stroke="#9c3a10" strokeWidth="1.6" />
      </pattern>
    </defs>
    <circle cx="20" cy="20" r="18" fill="#e2662b" />
    <circle cx="20" cy="20" r="18" fill="url(#waffle)" />
    <circle cx="20" cy="20" r="18" fill="none" stroke="#b9481a" strokeWidth="2" />
  </svg>
)

const Orange = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="18" fill="#ff9d1a" />
    <circle cx="20" cy="20" r="15" fill="#ffc45e" />
    {[0, 45, 90, 135].map((a) => (
      <line key={a} x1="20" y1="6" x2="20" y2="34" stroke="#fff3d6" strokeWidth="1.8" transform={`rotate(${a} 20 20)`} />
    ))}
  </svg>
)

const Bean = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 40 40">
    <ellipse cx="20" cy="20" rx="13" ry="18" fill="#7a3a16" />
    <path d="M14 6Q24 20 20 34" stroke="#3b1a08" fill="none" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
)

const Cube = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 40 40">
    <polygon points="20,3 37,12 20,21 3,12" fill="#b25a2e" />
    <polygon points="3,12 20,21 20,38 3,29" fill="#6b2c12" />
    <polygon points="37,12 20,21 20,38 37,29" fill="#4a1c0b" />
  </svg>
)

const MAP = { berry: Berry, almond: Almond, cookie: Cookie, orange: Orange, bean: Bean, cube: Cube }

export default function Ingredients({ flavor }) {
  return (
    <AnimatePresence>
      <motion.div
        key={flavor.id}
        className="ing-layer"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.45 } }}
      >
        {flavor.items.map((it, i) => {
          const Item = MAP[it.t]
          return (
            <motion.div
              key={i}
              className="ing"
              style={{ left: it.x + '%', top: it.y + '%' }}
              initial={{ scale: 0, opacity: 0, rotate: it.r - 70 }}
              animate={{ scale: 1, opacity: 1, rotate: it.r }}
              transition={{ delay: 0.45 + i * 0.07, type: 'spring', stiffness: 130, damping: 12 }}
            >
              <motion.div
                animate={{ y: [0, -14, 0], rotate: [0, 6, -4, 0] }}
                transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Item s={it.s} />
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}

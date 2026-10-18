import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Glass bubbles: CSS handles the long rise, framer-motion handles the sway and breathing.
export default function Bubbles({ count = 16, fixed = false }) {
  const items = useMemo(() => {
    let seed = 7
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      size: 14 + rand() * 72,
      dur: 14 + rand() * 18,
      delay: rand() * 30,
      sway: 10 + rand() * 28,
      swayDur: 5 + rand() * 5,
    }))
  }, [count])

  return (
    <div className={'bubbles' + (fixed ? ' fixed' : '')} aria-hidden="true">
      {items.map((b, i) => (
        <span
          key={i}
          className="bubble-rise"
          style={{ left: b.left + '%', animationDuration: b.dur + 's', animationDelay: `-${b.delay}s` }}
        >
          <motion.span
            className="bubble"
            style={{ width: b.size, height: b.size }}
            animate={{ x: [0, b.sway, -b.sway, 0], scale: [1, 1.08, 0.94, 1] }}
            transition={{ duration: b.swayDur, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      ))}
    </div>
  )
}

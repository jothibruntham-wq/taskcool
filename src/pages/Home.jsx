import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { flavors } from '../data'
import Bubbles from '../components/Bubbles'
import Ingredients from '../components/Ingredients'
import CanScene from '../components/CanScene'

const N = flavors.length

const wordVariants = {
  enter: (d) => ({ x: `${d * 85}vw` }),
  center: { x: 0 },
  exit: (d) => ({ x: `${-d * 85}vw` }),
}

const extrude = (shade) =>
  Array.from({ length: 14 }, (_, i) => `${(i + 1) * 0.8}px ${(i + 1) * 1}px 0 ${shade}`).join(',') +
  ',0 28px 40px rgba(0,0,0,.28)'

export default function Home() {
  const [st, setSt] = useState({ index: 0, prev: -1, dir: 1 })
  const mouse = useRef({ x: 0, y: 0 })
  const startX = useRef(null)
  const flavor = flavors[st.index]

  const step = useCallback(
    (d) => setSt((s) => ({ index: (s.index + d + N) % N, prev: s.index, dir: d })),
    []
  )
  const jump = (i) =>
    setSt((s) => (i === s.index ? s : { index: i, prev: s.index, dir: i > s.index ? 1 : -1 }))

  // autoplay (restarts every time the slide changes)
  useEffect(() => {
    const id = setTimeout(() => step(1), 6500)
    return () => clearTimeout(id)
  }, [st.index, step])

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouse.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
    mouse.current.y = ((e.clientY - r.top) / r.height) * 2 - 1
  }
  const onDown = (e) => (startX.current = e.clientX)
  const onUp = (e) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 70) step(dx < 0 ? 1 : -1)
  }

  return (
    <motion.section
      className="hero"
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerUp={onUp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="hero-bg"
        initial={false}
        animate={{ backgroundColor: flavor.bg }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />
      <div className="hero-vignette" />
      <Bubbles count={18} />
      <Ingredients flavor={flavor} />

      <div className="word-stage">
        <AnimatePresence initial={false} custom={st.dir}>
          <motion.h1
            key={flavor.id}
            className="word"
            custom={st.dir}
            variants={wordVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.95, ease: [0.7, 0, 0.2, 1] }}
            style={{ textShadow: extrude(flavor.shade) }}
          >
            {flavor.word}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="can-shadow" />
      <CanScene index={st.index} prev={st.prev} dir={st.dir} mouse={mouse} />

      <div className="hero-info glass">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={flavor.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            <h2>{flavor.name}</h2>
            <p>{flavor.desc}</p>
          </motion.div>
        </AnimatePresence>
        <Link to="/contact" state={{ flavor: flavor.id }} className="btn">
          Order this flavor
        </Link>
      </div>

      <div className="hero-price glass" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={flavor.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            ${flavor.price.toFixed(2)}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="hero-dots glass">
        <button className="arrow" aria-label="Previous flavor" onClick={() => step(-1)}>
          ‹
        </button>
        {flavors.map((f, i) => (
          <button
            key={f.id}
            className={'dot' + (i === st.index ? ' on' : '')}
            style={{ background: f.can.tagBg === '#17100e' ? '#5a2410' : f.can.tagBg }}
            aria-label={`Show ${f.name}`}
            aria-current={i === st.index}
            onClick={() => jump(i)}
          />
        ))}
        <button className="arrow" aria-label="Next flavor" onClick={() => step(1)}>
          ›
        </button>
      </div>
    </motion.section>
  )
}

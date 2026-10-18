import { motion } from 'framer-motion'
import Bubbles from './Bubbles'

export default function Page({ children }) {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45 }}
    >
      <Bubbles count={16} fixed />
      <div className="page-inner">{children}</div>
    </motion.main>
  )
}

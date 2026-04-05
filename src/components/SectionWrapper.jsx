import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionWrapper({ id, className = '', children }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section id={id} ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}>
      {children}
    </motion.section>
  )
}

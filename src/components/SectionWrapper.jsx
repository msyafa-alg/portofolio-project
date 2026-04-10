import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionWrapper({ id, className = '', children, direction = 'up', delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const variants = {
    hidden: {
      opacity: 0,
      y:  direction === 'up'    ?  44 : 0,
      x:  direction === 'left'  ? -44 : direction === 'right' ? 44 : 0,
    },
    show: {
      opacity: 1, y: 0, x: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.section id={id} ref={ref}
      variants={variants} initial="hidden" animate={inView ? 'show' : 'hidden'}
      className={className}>
      {children}
    </motion.section>
  )
}

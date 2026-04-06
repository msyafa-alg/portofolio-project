import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX  = useMotionValue(-100)
  const cursorY  = useMotionValue(-100)

  // Main dot — snappy
  const springX = useSpring(cursorX, { stiffness: 800, damping: 50 })
  const springY = useSpring(cursorY, { stiffness: 800, damping: 50 })

  // Trailing ring — laggy on purpose
  const trailX = useSpring(cursorX, { stiffness: 120, damping: 22 })
  const trailY = useSpring(cursorY, { stiffness: 120, damping: 22 })

  const isHovering = useRef(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onEnter = () => { isHovering.current = true }
    const onLeave = () => { isHovering.current = false }

    window.addEventListener('mousemove', move)

    // Add hover detection on interactive elements
    const els = document.querySelectorAll('a, button, [role="button"]')
    els.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      els.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-8 h-8 rounded-full border border-cyan-400/60" />
      </motion.div>

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      </motion.div>
    </>
  )
}

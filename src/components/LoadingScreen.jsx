import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const steps = [20, 45, 70, 90, 100]
    let i = 0
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setVisible(false), 400)
      }
    }, 220)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          {/* Logo / name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center"
          >
            <p className="font-display font-bold text-2xl tracking-wider"
              style={{ color: 'var(--text-primary)' }}>
              Syafa<span style={{ color: 'var(--text-muted)' }}>.</span>
            </p>
            <p className="text-xs mt-1 tracking-widest uppercase"
              style={{ color: 'var(--text-muted)' }}>
              Portfolio
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-32 h-px rounded-full overflow-hidden"
            style={{ background: 'var(--border)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'var(--text-primary)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-3 text-[11px] font-mono tabular-nums"
            style={{ color: 'var(--text-muted)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

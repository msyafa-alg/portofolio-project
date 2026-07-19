import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Starfield from './Starfield'

const messages = [
  'Initializing...',
  'Loading assets...',
  'Preparing interface...',
  'Optimizing experience...',
  'Almost ready...',
  'Welcome.',
]

function getMessage(pct) {
  if (pct < 15) return 0
  if (pct < 35) return 1
  if (pct < 55) return 2
  if (pct < 75) return 3
  if (pct < 98) return 4
  return 5
}

function useLoadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalSteps = 60
    const intervalMs = 28
    let step = 0

    const timer = setInterval(() => {
      step++
      const pct = Math.min(Math.round((step / totalSteps) * 100), 100)
      setProgress(pct)
      if (step >= totalSteps) clearInterval(timer)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [])

  return progress
}

export default function LoadingScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false)
  const progress = useLoadingProgress()
  const msgIdx = getMessage(progress)
  const onFinishRef = useRef(onFinish)
  onFinishRef.current = onFinish

  useEffect(() => {
    if (progress < 100) return
    const t1 = setTimeout(() => setExiting(true), 500)
    const t2 = setTimeout(() => onFinishRef.current?.(), 1100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [progress])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#09090b' }}
        >
          <Starfield />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.p
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-3xl tracking-wider"
              style={{ color: 'var(--text-primary)' }}
            >
              Syafa<span style={{ color: 'var(--text-muted)' }}>.</span>
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs mt-2 tracking-widest uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              Frontend Developer Portfolio
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="w-40 mt-10"
            >
              <div className="h-[2px] rounded-full overflow-hidden" style={{ background: '#1c1c1f' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: '#fafafa',
                    boxShadow: '0 0 8px rgba(255,255,255,0.08)',
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </motion.div>

            {/* Status message */}
            <div className="h-4 mt-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[11px] font-mono tabular-nums"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {messages[msgIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

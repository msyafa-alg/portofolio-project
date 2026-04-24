import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX } from 'react-icons/fi'

export default function SuccessToast({ show, onClose }) {
  // Auto close after 5s
  useEffect(() => {
    if (!show) return
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{   opacity: 0, y: 40,  scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className="fixed bottom-6 left-1/2 z-[9998]"
          style={{ translateX: '-50%', minWidth: 300, maxWidth: 380 }}
        >
          <div className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-hover)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            }}>

            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.7), transparent)' }} />

            <div className="flex items-center gap-4 px-5 py-4">
              {/* Animated check icon */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 18 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(52,211,153,0.1)',
                  border: '1px solid rgba(52,211,153,0.25)',
                }}>
                <FiCheck size={16} color="#34d399" strokeWidth={2.5} />
              </motion.div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <motion.p
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text-primary)' }}>
                  Pesan berhasil dikirim!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--text-muted)' }}>
                  Saya akan segera membalasnya.
                </motion.p>
              </div>

              {/* Close button */}
              <button onClick={onClose}
                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                <FiX size={12} />
              </button>
            </div>

            {/* Progress bar — drains over 5s */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-full"
              style={{ background: 'rgba(52,211,153,0.5)' }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

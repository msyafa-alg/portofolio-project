import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX } from 'react-icons/fi'

export default function SuccessToast({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{  opacity: 0, y: 40,  scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed bottom-8 left-1/2 z-[9998] -translate-x-1/2"
          style={{ minWidth: 320 }}
        >
          <div className="relative rounded-2xl px-5 py-4 flex items-center gap-4 overflow-hidden"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(52,211,153,0.3)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(52,211,153,0.1)',
              backdropFilter: 'blur(20px)',
            }}>

            {/* Glow bar top */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.6), transparent)' }} />

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 20 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)' }}>
              <FiCheck size={18} color="#34d399" strokeWidth={2.5} />
            </motion.div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                Message sent!
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Close */}
            <button onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ color: 'var(--text-muted)', background: 'var(--accent-subtle)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <FiX size={13} />
            </button>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-full"
              style={{ background: 'rgba(52,211,153,0.5)' }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

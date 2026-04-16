import { motion } from 'framer-motion'

export default function SectionLabel({ number, label, heading, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      {/* Number + label */}
      <div className="flex items-center gap-3 mb-4">
        <span className="section-num">{number}</span>
        <div className="h-px w-6" style={{ background: 'var(--border-hover)' }} />
        <span className="section-num">{label}</span>
      </div>

      {/* Heading */}
      <h2 className="font-display font-bold leading-[1.05] tracking-tight"
        style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--text-primary)' }}>
        {heading}
      </h2>

      {/* Underline */}
      <div className="mt-3 h-px w-12"
        style={{ background: 'linear-gradient(90deg, var(--border-hover), transparent)' }} />

      {sub && (
        <p className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
          {sub}
        </p>
      )}
    </motion.div>
  )
}



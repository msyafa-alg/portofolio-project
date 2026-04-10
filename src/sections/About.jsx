import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const stats = [
  { value: '6+',  label: 'Projects',     icon: '🚀' },
  { value: '9+',  label: 'Technologies', icon: '⚡' },
  { value: 'SMK', label: 'IT Track',     icon: '🎓' },
  { value: '∞',   label: 'Curiosity',    icon: '🔥' },
]

const bio = [
  <>I'm an IT student at <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>SMK Wikrama</strong> with a strong focus on <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>web development</strong> and <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>server infrastructure</strong>.</>,
  <>My journey started with curiosity about how websites work — from front-end interfaces to the servers that power them. I enjoy building things that are both functional and well-structured.</>,
  <>Currently deepening my skills in modern web technologies, Linux server management, and VPS hosting — while continuously growing as a developer.</>,
]

export default function About() {
  return (
    <SectionWrapper id="about" className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="01" label="About" heading="Who I Am" />

        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Bio — 3/5 */}
          <div className="md:col-span-3 space-y-5">
            {bio.map((line, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm leading-[1.9]"
                style={{ color: 'var(--text-secondary)' }}>
                {line}
              </motion.p>
            ))}

            <motion.blockquote
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8 pl-5 text-sm italic"
              style={{ borderLeft: '1px solid var(--border-hover)', color: 'var(--text-muted)' }}>
              "Code is not just logic — it's craft."
            </motion.blockquote>
          </div>

          {/* Stats — 2/5 */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {stats.map(({ value, label, icon }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, type: 'spring', stiffness: 240, damping: 22 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="gradient-border rounded-2xl p-5 cursor-default"
                style={{ background: 'var(--bg-card)' }}>
                <div className="text-lg mb-2">{icon}</div>
                <p className="text-2xl font-bold font-display mb-0.5" style={{ color: 'var(--text-primary)' }}>{value}</p>
                <p className="text-[10px] tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

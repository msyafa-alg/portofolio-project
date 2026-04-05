import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const stats = [
  { value: '3+',  label: 'Projects Completed'  },
  { value: '6+',  label: 'Technologies Learned' },
  { value: 'SMK', label: 'IT Vocational Track'  },
  { value: '∞',   label: 'Curiosity to Learn'   },
]

const textLines = [
  <>I'm an IT student at <span className="text-zinc-200">SMK Wikrama</span> with a strong focus on{' '}
    <span className="text-zinc-200">web development</span> and{' '}
    <span className="text-zinc-200">server infrastructure</span>.</>,
  <>My journey started with curiosity about how websites work — from front-end
    interfaces to the servers that power them. I enjoy building things that are
    both functional and well-structured.</>,
  <>Currently deepening my skills in modern web technologies, Linux server
    management, and VPS hosting — while continuously growing as a developer.</>,
]

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="01" label="About" heading="Who I Am" />

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Text — each paragraph slides in with stagger */}
          <div className="space-y-4">
            {textLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-zinc-400 leading-relaxed text-sm md:text-base"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Stats — pop in with spring */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: 'spring', stiffness: 200, damping: 18 }}
                whileHover={{ y: -4, borderColor: 'rgba(34,211,238,0.4)' }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 transition-colors cursor-default"
              >
                <p className="text-3xl font-bold text-cyan-400 mb-1">{value}</p>
                <p className="text-xs text-zinc-500">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

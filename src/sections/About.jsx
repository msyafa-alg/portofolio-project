import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const stats = [
  { value: '3+',  label: 'Projects Completed'   },
  { value: '6+',  label: 'Technologies Learned'  },
  { value: 'SMK', label: 'IT Vocational Track'   },
  { value: '∞',   label: 'Curiosity to Learn'    },
]

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="01" label="About" heading="Who I Am" />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-4 text-zinc-400 leading-relaxed text-sm md:text-base">
            <p>I'm an IT student at an SMK (Vocational High School) with a strong focus on{' '}
              <span className="text-zinc-200">web development</span> and{' '}
              <span className="text-zinc-200">server infrastructure</span>.
            </p>
            <p>My journey started with curiosity about how websites work — from front-end
              interfaces to the servers that power them. I enjoy building things that are
              both functional and well-structured.</p>
            <p>Currently deepening my skills in modern web technologies, Linux server
              management, and VPS hosting — while continuously growing as a developer.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-cyan-400/30 transition-colors">
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

import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const stats = [
  { value: '6+', label: 'Projects', icon: '🚀' },
  { value: '9+', label: 'Technologies', icon: '⚡' },
  { value: 'SMK', label: 'IT Track', icon: '🎓' },
  { value: '∞', label: 'Curiosity', icon: '🔥' },
]

const bio = [
  <>I'm an IT student at <strong className="text-primary font-semibold">SMK Wikrama</strong> focused on <strong className="text-primary font-semibold">web development</strong> and <strong className="text-primary font-semibold">server infrastructure</strong>.</>,
  <>I enjoy crafting clean interfaces and building solid backend systems — combining aesthetics with performance.</>,
  <>Currently exploring modern stacks, Linux environments, and VPS deployment while continuously leveling up.</>,
]

export default function About() {
  return (
    <SectionWrapper id="about" className="py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionLabel number="01" label="About" heading="Who I Am" />

        <div className="grid md:grid-cols-5 gap-10 items-start">
          
          {/* LEFT */}
          <div className="md:col-span-3 space-y-5">
            {bio.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="text-[15px] leading-[1.9] text-secondary tracking-[0.2px]"
              >
                {line}
              </motion.p>
            ))}

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pl-5 text-sm italic border-l border-white/10 text-muted relative"
            >
              <span className="absolute -left-[6px] top-1 h-2 w-2 rounded-full bg-white/40 blur-[2px]" />
              "Code is not just logic — it's craft."
            </motion.blockquote>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {stats.map(({ value, label, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl p-5 overflow-hidden group backdrop-blur-md border border-white/5"
              >
                {/* subtle glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-white/5 to-transparent" />

                <div className="text-lg mb-3 opacity-80">{icon}</div>

                <p className="text-2xl font-bold font-display text-primary">
                  {value}
                </p>

                <p className="text-[11px] tracking-widest uppercase text-muted mt-1">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
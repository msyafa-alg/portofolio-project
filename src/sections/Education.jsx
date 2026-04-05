import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const timeline = [
  {
    school: 'SMK Wikrama — Rekayasa Perangkat Lunak',
    major: 'Sekolah IT · Rekayasa Perangkat Lunak',
    period: 'Current', current: true,
    desc: 'Mendalami ilmu IT di SMK Wikrama dengan fokus pada web development, jaringan, dan software engineering. Aktif membangun project dan mengeksplorasi server management di luar kurikulum.',
  },
  {
    school: 'Pesantren Fathan Mubina',
    major: 'MTs / Sekolah Menengah Pertama',
    period: 'Completed', current: false,
    desc: 'Menempuh pendidikan menengah pertama di Pesantren Fathan Mubina. Selain ilmu agama, mulai tertarik dengan dunia komputer dan teknologi yang akhirnya mendorong memilih jalur IT.',
  },
]

export default function Education() {
  return (
    <SectionWrapper id="education" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="03" label="Education" heading="Academic Background" />
        <div className="relative pl-8 border-l border-zinc-800 space-y-10">
          {timeline.map(({ school, major, period, current, desc }, i) => (
            <motion.div key={school}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative">
              <div className={`absolute -left-[2.35rem] top-1.5 w-4 h-4 rounded-full border-4 border-zinc-950 ${
                current ? 'bg-cyan-400 shadow-[0_0_0_4px_rgba(34,211,238,0.15)]' : 'bg-zinc-600'
              }`} />
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-400/25 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-zinc-100">{school}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    current ? 'text-cyan-400 border-cyan-400/30' : 'text-zinc-500 border-zinc-700'
                  }`}>{period}</span>
                </div>
                {major && <p className="text-xs text-zinc-500 mb-3">{major}</p>}
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

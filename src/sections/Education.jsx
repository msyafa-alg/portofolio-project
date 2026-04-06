import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const timeline = [
  {
    school: 'SMK Wikrama — Rekayasa Perangkat Lunak',
    major: 'Sekolah IT · Rekayasa Perangkat Lunak',
    period: 'Current', current: true,
    emoji: '💻',
    color: 'from-cyan-500/10 to-blue-500/5',
    border: 'border-cyan-500/20',
    dot: 'bg-cyan-400',
    desc: 'Mendalami ilmu IT di SMK Wikrama dengan fokus pada web development, jaringan, dan software engineering. Aktif membangun project dan mengeksplorasi server management di luar kurikulum.',
    tags: ['Web Dev', 'Networking', 'RPL'],
  },
  {
    school: 'Pesantren Fathan Mubina',
    major: 'MTs / Sekolah Menengah Pertama',
    period: 'Completed', current: false,
    emoji: '🕌',
    color: 'from-emerald-500/10 to-teal-500/5',
    border: 'border-emerald-500/15',
    dot: 'bg-zinc-500',
    desc: 'Menempuh pendidikan menengah pertama di Pesantren Fathan Mubina. Selain ilmu agama, mulai tertarik dengan dunia komputer dan teknologi yang akhirnya mendorong memilih jalur IT.',
    tags: ['Islamic Studies', 'Boarding School'],
  },
  {
    school: 'SDIT Almadinah Cibinong',
    major: 'Sekolah Dasar Islam Terpadu · Cibinong, Bogor',
    period: 'Completed', current: false,
    emoji: '📚',
    color: 'from-violet-500/10 to-purple-500/5',
    border: 'border-violet-500/15',
    dot: 'bg-zinc-500',
    desc: 'Menempuh pendidikan dasar di SDIT Almadinah Cibinong, sekolah berbasis Islam terpadu yang memadukan kurikulum nasional dengan pendidikan agama. Fondasi awal pembentukan karakter dan semangat belajar.',
    tags: ['SDIT', 'Cibinong', 'Bogor'],
  },
]

export default function Education() {
  return (
    <SectionWrapper id="education" className="py-24" direction="up">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="03" label="Education" heading="Academic Background" />

        <div className="relative space-y-5">

          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/40 via-zinc-700 to-transparent origin-top hidden md:block"
          />

          {timeline.map(({ school, major, period, current, emoji, color, border, dot, desc, tags }, i) => (
            <motion.div
              key={school}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative md:pl-16"
            >
              {/* Timeline dot */}
              <div className="absolute left-[18px] top-6 hidden md:flex items-center justify-center z-10">
                {current && (
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute w-3 h-3 rounded-full bg-cyan-400/40"
                  />
                )}
                <div className={`w-3 h-3 rounded-full ${dot} border-2 border-zinc-950 z-10`} />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                className={`relative bg-gradient-to-br ${color} border ${border} rounded-2xl p-6 overflow-hidden group cursor-default`}
              >
                {/* Background number watermark */}
                <span className="absolute right-5 top-3 text-6xl font-black text-white/[0.03] select-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex items-start gap-4">
                  {/* Emoji icon */}
                  <div className="w-11 h-11 rounded-xl bg-zinc-900/60 border border-zinc-700/50 flex items-center justify-center text-xl flex-shrink-0">
                    {emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold text-zinc-100">{school}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${
                        current
                          ? 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5'
                          : 'text-zinc-500 border-zinc-700 bg-zinc-800/40'
                      }`}>
                        {period}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500 mb-3">{major}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">{desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-900/60 border border-zinc-700/50 text-zinc-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

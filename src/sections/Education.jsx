import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const timeline = [
  {
    school: 'SMK Wikrama — Rekayasa Perangkat Lunak',
    major: 'Sekolah IT · Rekayasa Perangkat Lunak',
    period: 'Current', current: true,
    logo: 'https://files.catbox.moe/44znrc.png',
    logoBg: 'rgba(30,58,138,0.15)',
    desc: 'Mendalami ilmu IT di SMK Wikrama dengan fokus pada web development, jaringan, dan software engineering. Aktif membangun project dan mengeksplorasi server management di luar kurikulum.',
    tags: ['Web Dev', 'Networking', 'RPL'],
  },
  {
    school: 'Pesantren Fathan Mubina',
    major: 'MTs / Sekolah Menengah Pertama',
    period: 'Completed', current: false,
    logo: 'https://files.catbox.moe/r34nyw.jpg',
    logoBg: 'rgba(109,40,217,0.12)',
    desc: 'Menempuh pendidikan menengah pertama di Pesantren Fathan Mubina. Selain ilmu agama, mulai tertarik dengan dunia komputer dan teknologi yang akhirnya mendorong memilih jalur IT.',
    tags: ['Islamic Studies', 'Boarding School'],
  },
  {
    school: 'SDIT Almadinah Cibinong',
    major: 'Sekolah Dasar Islam Terpadu · Cibinong, Bogor',
    period: 'Completed', current: false,
    logo: 'https://files.catbox.moe/kwpewk.png',
    logoBg: 'rgba(30,58,138,0.12)',
    desc: 'Menempuh pendidikan dasar di SDIT Almadinah Cibinong, sekolah berbasis Islam terpadu yang memadukan kurikulum nasional dengan pendidikan agama. Fondasi awal pembentukan karakter dan semangat belajar.',
    tags: ['SDIT', 'Cibinong', 'Bogor'],
  },
]

export default function Education() {
  return (
    <SectionWrapper id="education" className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="03" label="Education" heading="Academic Background" />

        <div className="relative space-y-4">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[22px] top-6 bottom-6 w-px origin-top hidden md:block"
            style={{ background: 'linear-gradient(to bottom, var(--border-hover), var(--border), transparent)' }}
          />

          {timeline.map(({ school, major, period, current, logo, logoBg, desc, tags }, i) => (
            <motion.div key={school}
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.13, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative md:pl-16">

              {/* Dot */}
              <div className="absolute left-[16px] top-6 hidden md:flex items-center justify-center z-10">
                {current && (
                  <motion.div animate={{ scale: [1, 2.4, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.8, repeat: Infinity }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ background: 'var(--text-primary)' }} />
                )}
                <div className="w-3 h-3 rounded-full border-2 z-10"
                  style={{
                    background: current ? 'var(--text-primary)' : 'var(--bg-elevated)',
                    borderColor: current ? 'var(--text-primary)' : 'var(--border-hover)',
                  }} />
              </div>

              <motion.div
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="gradient-border rounded-2xl p-6 cursor-default overflow-hidden relative"
                style={{ background: 'var(--bg-card)' }}>

                {/* Watermark */}
                <span className="absolute right-4 top-1 font-display font-black select-none pointer-events-none"
                  style={{ fontSize: '4.5rem', color: 'var(--accent-subtle)', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ background: logoBg, border: '1px solid var(--border)' }}>
                    <img src={logo} alt={school} className="w-8 h-8 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{school}</h3>
                      <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full"
                        style={{
                          color: current ? 'var(--text-primary)' : 'var(--text-muted)',
                          border: `1px solid ${current ? 'var(--border-hover)' : 'var(--border)'}`,
                          background: current ? 'var(--accent-subtle)' : 'transparent',
                        }}>
                        {period}
                      </span>
                    </div>
                    <p className="text-[11px] mb-3" style={{ color: 'var(--text-muted)' }}>{major}</p>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full"
                          style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
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

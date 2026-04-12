import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const timeline = [
  {
    school: 'SMK Wikrama — Rekayasa Perangkat Lunak',
    major: 'Sekolah IT · Rekayasa Perangkat Lunak',
    period: 'Current', current: true,
    logo: 'https://files.catbox.moe/44znrc.png',
    logoBg: 'rgba(30,58,138,0.12)',
    desc: 'Fokus ke web development, networking, dan software engineering. Aktif eksplorasi project dan server di luar kurikulum.',
    tags: ['Web Dev', 'Networking', 'RPL'],
  },
  {
    school: 'Pesantren Fathan Mubina',
    major: 'MTs / Sekolah Menengah Pertama',
    period: 'Completed', current: false,
    logo: 'https://files.catbox.moe/r34nyw.jpg',
    logoBg: 'rgba(109,40,217,0.10)',
    desc: 'Mulai tertarik dunia teknologi sambil menempuh pendidikan berbasis agama.',
    tags: ['Islamic Studies', 'Boarding School'],
  },
  {
    school: 'SDIT Almadinah Cibinong',
    major: 'Sekolah Dasar Islam Terpadu · Bogor',
    period: 'Completed', current: false,
    logo: 'https://files.catbox.moe/kwpewk.png',
    logoBg: 'rgba(30,58,138,0.10)',
    desc: 'Fondasi awal pendidikan dan karakter dengan kurikulum terpadu.',
    tags: ['SDIT', 'Bogor'],
  },
]

export default function Education() {
  return (
    <SectionWrapper id="education" className="py-14">
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel number="03" label="Education" heading="Academic Journey" />

        <div className="relative mt-10 space-y-6">
          {/* LINE */}
          <div className="absolute left-5 top-4 bottom-4 w-px hidden md:block" style={{ background: 'var(--border)' }} />

          {timeline.map((item, i) => (
            <motion.div
              key={item.school}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative md:pl-14"
            >

              {/* DOT */}
              <div className="absolute left-[14px] top-6 hidden md:flex">
                {item.current && (
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ background: 'var(--text-primary)' }}
                  />
                )}
                <div className="w-3 h-3 rounded-full border"
                  style={item.current
                    ? { background: 'var(--text-primary)', borderColor: 'var(--text-primary)' }
                    : { borderColor: 'var(--border-hover)' }} />
              </div>

              {/* CARD */}
              <motion.div
                whileHover={{ y: -4 }}
                className="relative rounded-2xl p-5 backdrop-blur-xl overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >

                {/* HOVER LIGHT */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 70%)'
                  }}
                />

                <div className="flex items-start gap-4 relative z-10">

                  {/* LOGO */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: item.logoBg, border: '1px solid var(--border)' }}
                  >
                    <img src={item.logo} className="w-7 h-7 object-contain" />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">

                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.school}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                        {item.period}
                      </span>
                    </div>

                    <p className="text-[11px] mb-2" style={{ color: 'var(--text-muted)' }}>{item.major}</p>

                    <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                        >
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



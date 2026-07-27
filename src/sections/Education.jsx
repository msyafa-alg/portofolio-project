import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiBookOpen } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import { useLang } from '../context/LangContext'

const school = {
  name: 'SMK Wikrama Bogor',
  major: 'Rekayasa Perangkat Lunak',
  period: '2024 – 2027',
  current: true,
  logo: 'https://files.catbox.moe/44znrc.png',
  logoBg: 'rgba(30,58,138,0.15)',
  desc: 'Fokus ke web development, networking, dan software engineering. Aktif eksplorasi project di luar kurikulum.',
  tags: ['Web Dev', 'Networking', 'RPL'],
  highlights: [
    { label: 'Focus', value: 'Software Engineering' },
    { label: 'Track', value: 'IT & Web Development' },
    { label: 'Status', value: 'Active Student' },
  ],
}

function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [hover, setHover] = useState(false)

  const onMove = useCallback((e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPos({ x: 50, y: 50 }) }}
      onMouseMove={onMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius: '24px',
        background: 'var(--bg-card)',
        border: `1px solid ${hover ? 'var(--border-hover)' : 'var(--border)'}`,
        boxShadow: hover ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.3s',
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
          borderRadius: '24px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function Education() {
  const { t } = useLang()

  return (
    <SectionWrapper id="education" className="py-8 md:py-10">
      <div className="px-6 md:px-8">
        <SectionLabel number="03" label={t.nav.education} heading={t.academicJourney} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <SpotlightCard>
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">

                {/* Left — Logo */}
                <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: school.logoBg, border: '1px solid var(--border)' }}
                  >
                    <img src={school.logo} className="w-11 h-11 md:w-14 md:h-14 object-contain" />
                  </div>

                  <div className="md:text-center md:w-full">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                      style={{
                        background: 'rgba(34,197,94,0.1)',
                        color: '#22c55e',
                        border: '1px solid rgba(34,197,94,0.2)',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                      {t.current}
                    </div>
                  </div>
                </div>

                {/* Right — Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-display font-bold text-xl md:text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
                    {school.name}
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1">
                      <FiBookOpen size={12} />
                      {school.major}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} />
                      {school.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin size={12} />
                      Bogor, Indonesia
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {t.edu[0].desc}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {school.highlights.map((h, i) => (
                      <motion.div
                        key={h.label}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                        className="rounded-xl p-3 text-center"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                      >
                        <p className="text-[9px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                          {h.label}
                        </p>
                        <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {h.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {t.edu[0].tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

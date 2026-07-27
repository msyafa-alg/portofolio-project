import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiBookOpen, FiAward, FiCode, FiTrendingUp } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import { useLang } from '../context/LangContext'

const milestones = [
  {
    year: 'Year 1 — 2024',
    title: 'Foundation & Exploration',
    items: [
      'Mastered HTML, CSS, JavaScript fundamentals',
      'Built first responsive landing pages',
      'Introduced to Laravel & PHP basics',
    ],
  },
  {
    year: 'Year 2 — 2025',
    title: 'Framework & Fullstack',
    items: [
      'Deep-dive into React & Tailwind CSS',
      'Built full-stack apps with Laravel + MySQL',
      'Started freelance web development',
    ],
  },
  {
    year: 'Year 3 — 2026',
    title: 'Advanced & Deployment',
    items: [
      'Currently exploring Node.js, Express, Supabase',
      'Deploying projects to Vercel & shared hosting',
      'Preparing for internship & final project',
    ],
  },
]

const coursework = [
  'Pemrograman Web',
  'Basis Data',
  'Jaringan Dasar',
  'Pemrograman Berorientasi Objek',
  'UI/UX Design',
  'Laravel Development',
  'React.js',
  'Server Administration',
]

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

function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{label}</span>
        <span style={{ color: 'var(--text-muted)' }}>Year {current} of {total}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: 'var(--text-primary)' }}
        />
      </div>
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
              {/* ── Top: 2 columns ── */}
              <div className="grid md:grid-cols-12 gap-6 md:gap-8">

                {/* Left: School Info (7/12) */}
                <div className="md:col-span-7 space-y-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                    >
                      <img src="https://files.catbox.moe/44znrc.png" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="font-display font-bold text-xl md:text-2xl" style={{ color: 'var(--text-primary)' }}>
                          SMK Wikrama Bogor
                        </h2>
                        <span
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                          style={{
                            background: 'rgba(34,197,94,0.12)',
                            color: '#22c55e',
                            border: '1px solid rgba(34,197,94,0.25)',
                            boxShadow: '0 0 12px rgba(34,197,94,0.08)',
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                          {t.current}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1">
                          <FiBookOpen size={12} />
                          Rekayasa Perangkat Lunak
                        </span>
                        <span className="flex items-center gap-1">
                          <FiCalendar size={12} />
                          2024 – 2027
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMapPin size={12} />
                          Bogor, Indonesia
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t.edu[0].desc}
                  </p>

                  <div
                    className="rounded-xl p-4 text-sm leading-relaxed italic"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>"</span>
                    I chose RPL because I love turning ideas into real, working products. Web development lets me combine logic and creativity — every project is a new challenge to solve.
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>"</span>
                  </div>
                </div>

                {/* Right: Progress + Coursework (5/12) */}
                <div className="md:col-span-5 space-y-5">
                  <div className="rounded-xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <FiTrendingUp size={13} style={{ color: 'var(--text-muted)' }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Progress</span>
                    </div>
                    <ProgressBar current={5} total={6} label="Academic Journey" />
                    <div className="flex items-center justify-between text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>
                      <span>Semester 5 of 6</span>
                      <span>83% Complete</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <FiCode size={13} style={{ color: 'var(--text-muted)' }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Relevant Coursework</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {coursework.map(subject => (
                        <span
                          key={subject}
                          className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                          style={{
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* ── Bottom: Key Milestones (full-width) ── */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <FiAward size={14} style={{ color: 'var(--text-muted)' }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Key Milestones</span>
                  <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {milestones.map((m, i) => (
                    <motion.div
                      key={m.year}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * i, duration: 0.4 }}
                    >
                      <div
                        className="rounded-xl p-4 h-full"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                      >
                        <span className="text-[9px] font-mono font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                          {m.year}
                        </span>
                        <p className="text-sm font-semibold mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>
                          {m.title}
                        </p>
                        <ul className="space-y-1">
                          {m.items.map((item, j) => (
                            <li key={j} className="text-[11px] flex items-start gap-1.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                              <span style={{ color: 'var(--text-muted)' }}>•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

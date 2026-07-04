import { useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaLinux, FaServer, FaPhp } from 'react-icons/fa'
import { SiTailwindcss, SiLaravel, SiVercel, SiMysql } from 'react-icons/si'
import { FiTarget, FiZap, FiUsers } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import { useLang } from '../context/LangContext'

/* level → numeric for bar width */
const levelMap = { Advanced: 90, Intermediate: 65, Beginner: 35 }
const levelColor = {
  Advanced:     'var(--text-primary)',
  Intermediate: 'var(--text-secondary)',
  Beginner:     'var(--text-muted)',
}

const hardSkills = [
  { icon: <FaHtml5 style={{ color: '#e34f26' }} />,       name: 'HTML',         level: 'Advanced'     },
  { icon: <FaCss3Alt style={{ color: '#264de4' }} />,     name: 'CSS',          level: 'Advanced'     },
  { icon: <FaJs style={{ color: '#f7df1e' }} />,          name: 'JavaScript',   level: 'Intermediate' },
  { icon: <FaReact style={{ color: '#61dafb' }} />,       name: 'React',        level: 'Intermediate' },
  { icon: <SiTailwindcss style={{ color: '#38bdf8' }} />, name: 'Tailwind CSS', level: 'Advanced'     },
  { icon: <SiLaravel style={{ color: '#ff2d20' }} />,     name: 'Laravel',      level: 'Beginner'     },
  { icon: <FaPhp style={{ color: '#8892be' }} />,         name: 'PHP',          level: 'Beginner'     },
  { icon: <SiMysql style={{ color: '#f29111' }} />,       name: 'MySQL',        level: 'Beginner'     },
  { icon: <FaServer style={{ color: '#34d399' }} />,      name: 'VPS & Hosting',level: 'Intermediate' },
  { icon: <FaLinux style={{ color: '#fcc624' }} />,       name: 'Linux',        level: 'Beginner'     },
  { icon: <SiVercel />,                                   name: 'Vercel',       level: 'Intermediate' },
]

const softSkills = [
  { icon: <FiTarget size={16} />, label: 'Problem Solving',    desc: 'Breaking complex issues into manageable steps'  },
  { icon: <FiZap size={16} />,    label: 'Fast Learner',       desc: 'Quickly adapting to new tools and frameworks'   },
  { icon: <FiUsers size={16} />,  label: 'Team Collaboration', desc: 'Working effectively in group projects'          },
]

/* ── Marquee ── */
function Marquee({ items, direction = 1, speed = 28 }) {
  const x = useMotionValue(0)
  const ref = useRef(null)
  const [paused, setPaused] = useState(false)

  useAnimationFrame((_, delta) => {
    if (paused || !ref.current) return
    const half = ref.current.scrollWidth / 2
    let next = x.get() - (speed * direction * delta) / 1000
    if (direction > 0 && next < -half) next += half
    if (direction < 0 && next > 0)     next -= half
    x.set(next)
  })

  return (
    <div className="overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, var(--bg), transparent)' }} />
      <motion.div ref={ref} style={{ x }} className="flex gap-2 w-max py-1">
        {[...items, ...items].map((s, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05, y: -2 }}
            className="tech-pill flex-shrink-0">
            <span style={{ fontSize: '0.9rem' }}>{s.icon}</span>
            {s.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Skill row with animated bar ── */
function SkillRow({ icon, name, level, index }) {
  const pct = levelMap[level]
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 group">
      {/* Icon */}
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', fontSize: '0.95rem' }}>
        {icon}
      </div>
      {/* Name + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{name}</span>
          <span className="text-[10px] font-medium" style={{ color: levelColor[level] }}>{level}</span>
        </div>
        {/* Track */}
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{ background: levelColor[level] }}
          />
        </div>
      </div>
    </motion.div>
  )
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }
const cardAnim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }

export default function Skills() {
  const { t } = useLang()
  return (
    <SectionWrapper id="skills" className="py-8 md:py-10 overflow-hidden">
      <div className="px-6 md:px-8">
        <SectionLabel number="02" label={t.nav.skills} heading={t.whatIWorkWith} />

        {/* Legend */}
        <div className="flex items-center gap-4 mb-5">
          {Object.entries(levelColor).map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{t[label.toLowerCase()]}</span>
            </div>
          ))}
        </div>

        {/* Skill rows — two columns on md+ */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
          {hardSkills.map((s, i) => (
            <SkillRow key={s.name} {...s} index={i} />
          ))}
        </div>

        {/* Marquee */}
        <div className="space-y-2 mb-10">
          <Marquee items={hardSkills} direction={1}  speed={26} />
          <Marquee items={[...hardSkills].reverse()} direction={-1} speed={22} />
        </div>

        {/* Soft skills */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          <span className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}>{t.softSkills}</span>
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {softSkills.map(({ icon }, i) => (
            <motion.div key={t.soft[i].label}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="rounded-xl p-4 cursor-default transition-colors"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              <div className="mb-3 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                {icon}
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{t.soft[i].label}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t.soft[i].desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

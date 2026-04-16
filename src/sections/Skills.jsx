import { useState, useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaLinux, FaServer, FaPhp } from 'react-icons/fa'
import { SiTailwindcss, SiLaravel, SiVercel, SiMysql } from 'react-icons/si'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

/* ── All monochrome — no color props ── */
const hardSkills = [
  { icon: <FaHtml5 style={{ color: '#e34f26' }} />,       name: 'HTML',         level: 'Advanced'     },
  { icon: <FaCss3Alt style={{ color: '#264de4' }} />,     name: 'CSS',           level: 'Advanced'     },
  { icon: <FaJs style={{ color: '#f7df1e' }} />,          name: 'JavaScript',    level: 'Intermediate' },
  { icon: <FaReact style={{ color: '#61dafb' }} />,       name: 'React',         level: 'Intermediate' },
  { icon: <SiTailwindcss style={{ color: '#38bdf8' }} />, name: 'Tailwind CSS',  level: 'Advanced'     },
  { icon: <SiLaravel style={{ color: '#ff2d20' }} />,     name: 'Laravel',       level: 'Beginner'     },
  { icon: <FaPhp style={{ color: '#8892be' }} />,         name: 'PHP',           level: 'Beginner'     },
  { icon: <SiMysql style={{ color: '#f29111' }} />,       name: 'MySQL',         level: 'Beginner'     },
  { icon: <FaServer style={{ color: '#34d399' }} />,      name: 'VPS & Hosting', level: 'Intermediate' },
  { icon: <FaLinux style={{ color: '#fcc624' }} />,       name: 'Linux',         level: 'Beginner'     },
  { icon: <SiVercel />,                                   name: 'Vercel',        level: 'Intermediate' },
]

const softSkills = [
  { emoji: '🧩', label: 'Problem Solving',    desc: 'Breaking complex issues into manageable steps'  },
  { emoji: '⚡', label: 'Fast Learner',       desc: 'Quickly adapting to new tools and frameworks'   },
  { emoji: '🤝', label: 'Team Collaboration', desc: 'Working effectively in group projects'          },
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

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }
const cardAnim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-8 md:py-10 overflow-hidden">
      <div className="px-6 md:px-8">
        <SectionLabel number="02" label="Skills" heading="What I Work With" />

        {/* Hard skills grid */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-8">
          {hardSkills.map(({ icon, name, level }) => (
            <motion.div key={name} variants={cardAnim}
              whileHover={{ y: -2, borderColor: 'var(--border-hover)', transition: { duration: 0.15 } }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-default transition-colors"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{name}</p>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{level}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee */}
        <div className="space-y-2 mb-10">
          <Marquee items={hardSkills} direction={1}  speed={26} />
          <Marquee items={[...hardSkills].reverse()} direction={-1} speed={22} />
        </div>

        {/* Soft skills */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          <span className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}>Soft Skills</span>
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {softSkills.map(({ emoji, label, desc }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="rounded-xl p-4 cursor-default transition-colors"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              <div className="text-xl mb-2">{emoji}</div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}


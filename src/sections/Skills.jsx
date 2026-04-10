import { useState, useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaLinux, FaServer, FaPhp } from 'react-icons/fa'
import { SiTailwindcss, SiLaravel, SiVercel, SiMysql } from 'react-icons/si'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const featured = [
  {
    icon: <FaReact />,       name: 'React',        level: 'Intermediate',
    color: '#22d3ee', glow: 'rgba(34,211,238,0.35)',
    size: 'lg', rotate: -3, x: 0, y: 0,
    desc: 'Component-based UI',
  },
  {
    icon: <FaJs />,          name: 'JavaScript',   level: 'Intermediate',
    color: '#eab308', glow: 'rgba(234,179,8,0.35)',
    size: 'md', rotate: 4, x: 0, y: 0,
    desc: 'Core web language',
  },
  {
    icon: <SiTailwindcss />, name: 'Tailwind',     level: 'Advanced',
    color: '#38bdf8', glow: 'rgba(56,189,248,0.35)',
    size: 'sm', rotate: -5, x: 0, y: 0,
    desc: 'Utility-first CSS',
  },
  {
    icon: <SiLaravel />,     name: 'Laravel',      level: 'Beginner',
    color: '#f87171', glow: 'rgba(248,113,113,0.35)',
    size: 'md', rotate: 3, x: 0, y: 0,
    desc: 'PHP framework',
  },
  {
    icon: <FaServer />,      name: 'VPS & Hosting',level: 'Intermediate',
    color: '#34d399', glow: 'rgba(52,211,153,0.35)',
    size: 'lg', rotate: -2, x: 0, y: 0,
    desc: 'Server management',
  },
  {
    icon: <FaLinux />,       name: 'Linux',        level: 'Beginner',
    color: '#a78bfa', glow: 'rgba(167,139,250,0.35)',
    size: 'sm', rotate: 6, x: 0, y: 0,
    desc: 'CLI & sysadmin',
  },
]

const marqueeRow1 = [
  { icon: <FaHtml5 />,       name: 'HTML',         color: '#f97316' },
  { icon: <FaCss3Alt />,     name: 'CSS',          color: '#3b82f6' },
  { icon: <FaJs />,          name: 'JavaScript',   color: '#eab308' },
  { icon: <FaReact />,       name: 'React',        color: '#22d3ee' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#38bdf8' },
  { icon: <SiVercel />,      name: 'Vercel',       color: '#e4e4e7' },
  { icon: <SiLaravel />,     name: 'Laravel',      color: '#f87171' },
]
const marqueeRow2 = [
  { icon: <FaPhp />,     name: 'PHP',           color: '#818cf8' },
  { icon: <SiMysql />,   name: 'MySQL',         color: '#f59e0b' },
  { icon: <FaServer />,  name: 'VPS & Hosting', color: '#34d399' },
  { icon: <FaLinux />,   name: 'Linux',         color: '#d4d4d8' },
  { icon: <FaHtml5 />,   name: 'HTML',          color: '#f97316' },
  { icon: <FaCss3Alt />, name: 'CSS',           color: '#3b82f6' },
]

const levelStyle = {
  Beginner:     { from: '#fbbf24', to: '#f59e0b' },
  Intermediate: { from: '#22d3ee', to: '#6366f1' },
  Advanced:     { from: '#34d399', to: '#059669' },
}

const sizeMap = {
  sm: { card: 'w-32 h-36', icon: 'text-2xl w-10 h-10', name: 'text-xs', desc: 'hidden' },
  md: { card: 'w-40 h-44', icon: 'text-3xl w-12 h-12', name: 'text-sm', desc: 'text-[10px]' },
  lg: { card: 'w-48 h-52', icon: 'text-4xl w-14 h-14', name: 'text-base', desc: 'text-xs' },
}

const softSkills = [
  { emoji: '🧩', label: 'Problem Solving',    desc: 'Breaking complex issues into manageable steps'  },
  { emoji: '⚡', label: 'Fast Learner',       desc: 'Quickly adapting to new tools and frameworks'   },
  { emoji: '🤝', label: 'Team Collaboration', desc: 'Working effectively in group projects'          },
]

/* ─────────────────────────────────────────
   FLOATING CARD
───────────────────────────────────────── */
function FloatingCard({ skill, index }) {
  const [hovered, setHovered] = useState(false)
  const sz  = sizeMap[skill.size]
  const lv  = levelStyle[skill.level]

  // Idle float — each card has unique phase
  const floatY = useMotionValue(0)
  const springY = useSpring(floatY, { stiffness: 60, damping: 12 })
  const t = useRef(index * 1.3)

  useAnimationFrame((_, delta) => {
    if (hovered) return
    t.current += delta / 1000
    floatY.set(Math.sin(t.current * 0.7) * 8)
  })

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.7, rotate: skill.rotate - 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: skill.rotate }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7, type: 'spring', stiffness: 180, damping: 18 }}
      whileHover={{
        scale: 1.12,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{ y: springY }}
      className={`relative flex-shrink-0 ${sz.card} rounded-3xl cursor-default flex flex-col items-center justify-center gap-2 p-4`}
    >
      {/* Glass background */}
      <div className="absolute inset-0 rounded-3xl"
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${skill.color}30`,
          boxShadow: hovered
            ? `0 0 40px ${skill.glow}, 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
          transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
          borderColor: hovered ? `${skill.color}60` : `${skill.color}30`,
        }}
      />

      {/* Gradient blob inside card */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: hovered ? 1.4 : 1, opacity: hovered ? 0.6 : 0.2 }}
          transition={{ duration: 0.4 }}
          className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl"
          style={{ background: skill.color }}
        />
      </div>

      {/* Icon */}
      <motion.div
        animate={{ scale: hovered ? 1.15 : 1 }}
        transition={{ duration: 0.3 }}
        className={`${sz.icon} rounded-2xl flex items-center justify-center relative z-10`}
        style={{
          background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}10)`,
          border: `1px solid ${skill.color}40`,
          color: skill.color,
          fontSize: sz.icon.includes('text-4xl') ? '1.75rem' : sz.icon.includes('text-3xl') ? '1.5rem' : '1.25rem',
          boxShadow: hovered ? `0 0 24px ${skill.color}50` : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        {skill.icon}
      </motion.div>

      {/* Name */}
      <p className={`${sz.name} font-bold relative z-10 text-center`}
        style={{ color: 'rgba(255,255,255,0.9)' }}>
        {skill.name}
      </p>

      {/* Level pill */}
      <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full relative z-10"
        style={{
          background: `linear-gradient(90deg, ${lv.from}25, ${lv.to}25)`,
          border: `1px solid ${lv.from}40`,
          color: lv.from,
        }}>
        {skill.level}
      </span>

      {/* Desc on hover */}
      {skill.desc && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
          transition={{ duration: 0.2 }}
          className={`${sz.desc} text-center relative z-10 leading-tight`}
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {skill.desc}
        </motion.p>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MARQUEE
───────────────────────────────────────── */
function Marquee({ items, direction = 1, speed = 32 }) {
  const x = useMotionValue(0)
  const ref = useRef(null)
  const [paused, setPaused] = useState(false)

  useAnimationFrame((_, delta) => {
    if (paused) return
    const el = ref.current
    if (!el) return
    const halfW = el.scrollWidth / 2
    let next = x.get() - (speed * direction * delta) / 1000
    if (direction > 0 && next < -halfW) next += halfW
    if (direction < 0 && next > 0)      next -= halfW
    x.set(next)
  })

  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, var(--bg), transparent)' }} />
      <motion.div ref={ref} style={{ x }} className="flex gap-3 w-max py-1">
        {doubled.map((s, i) => (
          <motion.div key={i}
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl cursor-default"
            style={{
              background: `${s.color}0d`,
              border: `1px solid ${s.color}25`,
              backdropFilter: 'blur(12px)',
            }}
          >
            <span style={{ color: s.color, fontSize: '1.1rem' }}>{s.icon}</span>
            <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="02" label="Skills" heading="What I Work With" />
      </div>

      {/* ── Organic floating cards ── */}
      <div className="relative max-w-5xl mx-auto px-6 mb-6">
        {/* Background glow blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[80px] opacity-20"
            style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-[60px] opacity-15"
            style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
        </div>

        {/* Cards — asymmetric flex layout */}
        <div className="flex flex-wrap justify-center items-end gap-5 py-8 relative z-10">
          {featured.map((skill, i) => (
            <FloatingCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>

      {/* ── Marquee rows ── */}
      <div className="space-y-3 mb-16">
        <Marquee items={marqueeRow1} direction={1}  speed={30} />
        <Marquee items={marqueeRow2} direction={-1} speed={25} />
      </div>

      {/* ── Soft skills ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: 'var(--text-muted)' }}>Soft Skills</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {softSkills.map(({ emoji, label, desc }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="gradient-border glass rounded-2xl p-5 cursor-default"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

import { useState, useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaLinux, FaServer, FaPhp } from 'react-icons/fa'
import { SiTailwindcss, SiLaravel, SiVercel, SiMysql } from 'react-icons/si'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

/* ================= DATA ================= */
const featured = [
  { icon: <FaReact />, name: 'React', level: 'Intermediate', color: '#22d3ee', size: 'lg', desc: 'Component-based UI' },
  { icon: <FaJs />, name: 'JavaScript', level: 'Intermediate', color: '#eab308', size: 'md', desc: 'Core language' },
  { icon: <SiTailwindcss />, name: 'Tailwind', level: 'Advanced', color: '#38bdf8', size: 'sm', desc: 'Utility CSS' },
  { icon: <SiLaravel />, name: 'Laravel', level: 'Beginner', color: '#f87171', size: 'md', desc: 'Backend framework' },
  { icon: <FaServer />, name: 'VPS', level: 'Intermediate', color: '#34d399', size: 'lg', desc: 'Server infra' },
  { icon: <FaLinux />, name: 'Linux', level: 'Beginner', color: '#a78bfa', size: 'sm', desc: 'CLI usage' },
]

const marquee = [
  { icon: <FaHtml5 />, name: 'HTML', color: '#f97316' },
  { icon: <FaCss3Alt />, name: 'CSS', color: '#3b82f6' },
  { icon: <FaJs />, name: 'JavaScript', color: '#eab308' },
  { icon: <FaReact />, name: 'React', color: '#22d3ee' },
  { icon: <SiTailwindcss />, name: 'Tailwind', color: '#38bdf8' },
  { icon: <SiLaravel />, name: 'Laravel', color: '#f87171' },
  { icon: <SiMysql />, name: 'MySQL', color: '#f59e0b' },
]

const sizeMap = {
  sm: { card: 'w-28 h-32', icon: 'text-xl w-9 h-9', name: 'text-xs' },
  md: { card: 'w-32 h-36', icon: 'text-2xl w-10 h-10', name: 'text-sm' },
  lg: { card: 'w-40 h-44', icon: 'text-3xl w-12 h-12', name: 'text-base' },
}

/* ================= CARD ================= */
function Card({ skill, i }) {
  const [hover, setHover] = useState(false)

  const float = useMotionValue(0)
  const spring = useSpring(float, { stiffness: 50, damping: 14 })
  const t = useRef(i)

  useAnimationFrame((_, d) => {
    if (hover) return
    t.current += d / 1000
    float.set(Math.sin(t.current) * 6)
  })

  const s = sizeMap[skill.size]

  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ delay: i * 0.07 }}
      style={{ y: spring }}
      className={`${s.card} relative rounded-3xl flex flex-col items-center justify-center gap-2 p-4`}
    >

      <div className="absolute inset-0 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl" />

      <motion.div
        animate={{ opacity: hover ? 1 : 0 }}
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${skill.color}20, transparent 70%)`,
        }}
      />

      <motion.div
        animate={{ scale: hover ? 1.08 : 1 }}
        className={`${s.icon} flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] relative z-10`}
        style={{ color: skill.color }}
      >
        {skill.icon}
      </motion.div>

      <p className={`${s.name} font-semibold text-primary relative z-10`}>
        {skill.name}
      </p>

      <span className="text-[10px] text-muted border border-white/10 px-2 py-0.5 rounded-full relative z-10">
        {skill.level}
      </span>

      <motion.p
        animate={{ opacity: hover ? 1 : 0 }}
        className="text-[10px] text-muted text-center relative z-10"
      >
        {skill.desc}
      </motion.p>

    </motion.div>
  )
}

/* ================= MARQUEE ================= */
function Marquee() {
  const x = useMotionValue(0)
  const ref = useRef(null)

  useAnimationFrame((_, d) => {
    const el = ref.current
    if (!el) return
    const w = el.scrollWidth / 2
    let next = x.get() - d * 0.03
    if (next < -w) next += w
    x.set(next)
  })

  const items = [...marquee, ...marquee]

  return (
    <div className="overflow-hidden">
      <motion.div ref={ref} style={{ x }} className="flex gap-3">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02]">
            <span style={{ color: s.color, opacity: 0.8 }}>{s.icon}</span>
            <span className="text-xs text-muted">{s.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ================= MAIN ================= */
export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="02" label="Skills" heading="What I Use" />

        {/* floating */}
        <div className="relative mt-10 mb-10">
          <div className="absolute inset-0 blur-[100px] opacity-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-transparent" />

          <div className="flex flex-wrap justify-center gap-5 relative z-10">
            {featured.map((s, i) => (
              <Card key={s.name} skill={s} i={i} />
            ))}
          </div>
        </div>

        {/* marquee */}
        <div className="mb-12">
          <Marquee />
        </div>

        {/* soft skills */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { emoji: '🧩', title: 'Problem Solving' },
            { emoji: '⚡', title: 'Fast Learner' },
            { emoji: '🤝', title: 'Team Work' },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl"
            >
              <div className="text-2xl mb-2">{s.emoji}</div>
              <p className="text-sm font-semibold text-primary">{s.title}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  )
}



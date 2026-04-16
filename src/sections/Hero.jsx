import { useState, useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { FiMapPin, FiBriefcase, FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaLinux, FaServer } from 'react-icons/fa'
import { SiTailwindcss, SiLaravel, SiVercel, SiMysql } from 'react-icons/si'
import useTyping from '../hooks/useTyping'

/* ── Data ── */
const roles = ['Frontend Developer', 'Server Enthusiast', 'IT Student', 'Web Builder']

const tools = [
  { icon: <FaReact style={{ color: '#61dafb' }} />,       name: 'React'        },
  { icon: <FaJs style={{ color: '#f7df1e' }} />,          name: 'JavaScript'   },
  { icon: <SiTailwindcss style={{ color: '#38bdf8' }} />, name: 'Tailwind CSS' },
  { icon: <SiLaravel style={{ color: '#ff2d20' }} />,     name: 'Laravel'      },
  { icon: <FaPhp style={{ color: '#8892be' }} />,         name: 'PHP'          },
  { icon: <SiMysql style={{ color: '#f29111' }} />,       name: 'MySQL'        },
  { icon: <FaServer style={{ color: '#34d399' }} />,      name: 'VPS'          },
  { icon: <FaLinux style={{ color: '#fcc624' }} />,       name: 'Linux'        },
  { icon: <SiVercel />,                                   name: 'Vercel'       },
  { icon: <FaHtml5 style={{ color: '#e34f26' }} />,       name: 'HTML'         },
  { icon: <FaCss3Alt style={{ color: '#264de4' }} />,     name: 'CSS'          },
]

const featuredProjects = [
  {
    image: 'https://files.catbox.moe/juz07w.png',
    title: 'Anonymous Chat',
    desc: 'Anonymous messaging via unique link — no login required.',
    stack: ['React', 'JavaScript', 'Vercel'],
    demo: 'https://anonymchat-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/anonymchat',
  },
  {
    image: 'https://files.catbox.moe/cyoawr.png',
    title: 'Lumine Beauty',
    desc: 'Modern makeup catalog with e-commerce concept and API integration.',
    stack: ['React', 'API', 'Vercel'],
    demo: 'https://luminebeauty-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/luminebeauty',
  },
]

const testimonials = [
  { name: 'Jihad Akbar',   role: 'Client — Laravel Project',       initial: 'JA',
    text: 'Mantap, sip! Project mandiri Laravel hasilnya bagus banget. Sangat puas.' },
  { name: 'Jaki',          role: 'Client — Website Warkop',         initial: 'JK',
    text: 'Hasilnya bagus, website warkop saya memuaskan. Semoga amanah selalu.' },
  { name: 'Ridwan Surya',  role: 'Client — Website Tongkrongan',    initial: 'RS',
    text: 'Website tongkrongan saya sangat bagus dan sesuai ekspektasi.' },
  { name: 'Zafrah Rizwan', role: 'Client — Web Development',        initial: 'ZR',
    text: 'Pelayanan profesional, komunikasi lancar, pengerjaan tepat waktu. Recommended!' },
]

/* ── Marquee ── */
function Marquee({ items, speed = 28 }) {
  const x = useMotionValue(0)
  const ref = useRef(null)
  const [paused, setPaused] = useState(false)

  useAnimationFrame((_, delta) => {
    if (paused || !ref.current) return
    const half = ref.current.scrollWidth / 2
    let next = x.get() - (speed * delta) / 1000
    if (next < -half) next += half
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
        {[...items, ...items].map((t, i) => (
          <motion.span key={i} whileHover={{ scale: 1.05, y: -2 }}
            className="tech-pill flex-shrink-0">
            <span style={{ fontSize: '0.85rem' }}>{t.icon}</span>
            {t.name}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Project Card ── */
function ProjectCard({ p, i, setActivePage }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hov ? 'var(--border-hover)' : 'var(--border)'}`,
        boxShadow: hov ? 'var(--shadow-md)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}>
      {/* Thumbnail */}
      <div className="relative h-32 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        <img src={p.image} alt={p.title}
          className="w-full h-full object-cover object-top transition-transform duration-500"
          style={{ transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 55%)' }} />
        {/* Hover buttons */}
        <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center gap-2">
          <a href={p.demo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}>
            <FiExternalLink size={11} /> View
          </a>
          <a href={p.repo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
            <FiGithub size={11} /> GitHub
          </a>
        </motion.div>
      </div>
      {/* Body */}
      <div className="p-4">
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
        <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map(t => <span key={t} className="badge">{t}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Testimonials drag scroll ── */
function Testimonials() {
  const scrollRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  return (
    <div>
      <p className="text-xs font-semibold tracking-widest uppercase mb-3"
        style={{ color: 'var(--text-muted)' }}>Clients & Partners</p>
      <div ref={scrollRef}
        onMouseDown={e => { setDragging(true); setStartX(e.pageX - scrollRef.current.offsetLeft); setScrollLeft(scrollRef.current.scrollLeft) }}
        onMouseMove={e => { if (!dragging) return; e.preventDefault(); scrollRef.current.scrollLeft = scrollLeft - (e.pageX - scrollRef.current.offsetLeft - startX) }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        className="flex gap-3 overflow-x-auto pb-1 select-none"
        style={{ scrollbarWidth: 'none', cursor: dragging ? 'grabbing' : 'grab' }}>
        {testimonials.map((t, i) => (
          <motion.div key={t.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="flex-shrink-0 rounded-xl p-4"
            style={{ width: 220, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: 'var(--text-muted)', fontSize: 10 }}>★</span>
                ))}
              </div>
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>"{t.text}"</p>
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
              <span className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                testimonial
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Main ── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }

export default function Hero({ setActivePage }) {
  const typed = useTyping(roles, 70, 38, 2200)

  return (
    <motion.div variants={stagger} initial="hidden" animate="show"
      className="px-6 md:px-8 pt-8 pb-12 space-y-10">

      {/* ── Profile ── */}
      <motion.div variants={fadeUp}>
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <img src="/images/profile.jpeg" alt="Muhammad Syafa"
              className="w-16 h-16 rounded-full object-cover"
              style={{ border: '1px solid var(--border)' }} />
            <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: 'var(--border-strong)', borderColor: 'var(--bg)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h1 className="font-display font-bold text-xl leading-tight"
                style={{ color: 'var(--text-primary)' }}>Muhammad Syafa</h1>
              {/* Verified badge — monochrome */}
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="7.5" fill="var(--border-strong)" />
                <path d="M4.5 7.5l2 2 4-4" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>@msyafa-alg</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"
              style={{ color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1">
                <FiMapPin size={10} style={{ color: 'var(--text-muted)' }} />
                Bogor, Indonesia
              </span>
              <span style={{ color: 'var(--text-muted)' }}>·</span>
              <span className="flex items-center gap-1">
                <FiBriefcase size={10} style={{ color: 'var(--text-muted)' }} />
                <span className="font-mono">{typed}<span className="typing-cursor" /></span>
              </span>
              <span style={{ color: 'var(--text-muted)' }}>·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--text-secondary)' }} />
                Open To Work
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          IT student at <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>SMK Wikrama</strong> focused
          on building clean, efficient, and modern web experiences. Passionate about frontend development
          and server infrastructure.
        </p>
      </motion.div>

      {/* ── Tools ── */}
      <motion.div variants={fadeUp}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: 'var(--text-muted)' }}>Tools That I Have Used</p>
        <Marquee items={tools} speed={26} />
      </motion.div>

      {/* ── Featured Projects ── */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}>Featured Projects</p>
          <button onClick={() => setActivePage('projects')}
            className="flex items-center gap-1 text-xs font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            See all <FiArrowRight size={10} />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} setActivePage={setActivePage} />
          ))}
        </div>
      </motion.div>

      {/* ── Testimonials ── */}
      <motion.div variants={fadeUp}>
        <Testimonials />
      </motion.div>

      {/* ── CTA ── */}
      <motion.div variants={fadeUp}
        className="rounded-xl p-5"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Let's work together
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Open to internships, collaborations, and learning opportunities.
            </p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => setActivePage('contact')}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
            style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}>
            Contact Me <FiArrowRight size={12} />
          </motion.button>
        </div>
      </motion.div>

    </motion.div>
  )
}


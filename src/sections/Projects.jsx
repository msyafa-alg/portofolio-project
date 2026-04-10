import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const projects = [
  {
    id: 1, emoji: '💬', featured: true, accent: '#22d3ee',
    image: 'https://files.catbox.moe/juz07w.png',
    title: 'Anonymous Chat',
    desc: 'Web app yang memungkinkan pengguna menerima pesan anonim melalui link unik — tanpa login, tanpa identitas.',
    stack: ['React', 'JavaScript', 'Vercel'],
    demo: 'https://anonymchat-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/anonymchat',
  },
  {
    id: 2, emoji: '💄', featured: true, accent: '#f472b6',
    image: 'https://files.catbox.moe/cyoawr.png',
    title: 'Lumine Beauty',
    desc: 'Katalog makeup modern dengan konsep e-commerce sederhana dan integrasi API produk kecantikan.',
    stack: ['React', 'API Integration', 'Vercel'],
    demo: 'https://luminebeauty-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/luminebeauty',
  },
  {
    id: 3, emoji: '🛒', featured: false, accent: '#a78bfa',
    title: 'Syafa Store',
    desc: 'Toko panel Pterodactyl dengan payment gateway Atlantic terintegrasi.',
    stack: ['React', 'Payment Gateway', 'Vercel'],
    demo: 'https://syafastoreofficial.vercel.app/',
    repo: 'https://github.com/msyafa-alg/syafastoreofficial',
  },
  {
    id: 4, emoji: '🏥', featured: false, accent: '#34d399',
    title: 'NovaHealth',
    desc: 'Kalkulator kesehatan statis — BMI, kalori, berat ideal, dan jejak karbon.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://novahealth-project.vercel.app',
    repo: 'https://github.com/msyafa-alg/NovaHealt',
  },
  {
    id: 5, emoji: '🎬', featured: false, accent: '#f87171',
    title: 'TIX ID Fake',
    desc: 'Clone sistem pemesanan tiket bioskop berbasis Laravel — latihan MVC architecture.',
    stack: ['Laravel', 'PHP', 'MySQL'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/tixid',
  },
  {
    id: 6, emoji: '🎵', featured: false, accent: '#fb923c',
    title: 'Music Chart',
    desc: 'Aplikasi chart musik dengan data dinamis sebagai latihan frontend rendering.',
    stack: ['JavaScript', 'Web App'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/musicchart',
  },
]

const featured  = projects.filter(p => p.featured)
const secondary = projects.filter(p => !p.featured)

/* ── Featured card ── */
function FeaturedCard({ p, index }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, transition: { duration: 0.28, ease: 'easeOut' } }}
      className="rounded-3xl overflow-hidden flex flex-col cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hov ? p.accent + '35' : 'var(--border)'}`,
        boxShadow: hov ? `0 28px 72px rgba(0,0,0,0.3), 0 0 0 1px ${p.accent}18` : 'var(--shadow-sm)',
        transition: 'border-color 0.35s, box-shadow 0.35s',
      }}>

      {/* Visual */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--bg-elevated)' }}>
        {p.image ? (
          <>
            <img src={p.image} alt={p.title}
              className="w-full h-full object-cover object-top transition-transform duration-500"
              style={{ transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
            {/* Overlay gradient bottom */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 50%)' }} />
            {/* Accent tint on hover */}
            <motion.div animate={{ opacity: hov ? 0.12 : 0 }} transition={{ duration: 0.35 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: p.accent }} />
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-35" style={{
              backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }} />
            <motion.div animate={{ opacity: hov ? 0.45 : 0.12, scale: hov ? 1.15 : 1 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 65%, ${p.accent}35, transparent 60%)` }} />
            <motion.span animate={{ scale: hov ? 1.12 : 1, rotate: hov ? 6 : 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 220 }}
              className="text-6xl relative z-10 select-none">{p.emoji}</motion.span>
          </>
        )}
        <div className="absolute top-4 left-4 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full z-10"
          style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}35`, color: p.accent,
            backdropFilter: 'blur(8px)' }}>
          Featured
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-base font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
        <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.stack.map(t => (
            <span key={t} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: `${p.accent}0e`, border: `1px solid ${p.accent}22`, color: p.accent }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          {p.demo && (
            <motion.a href={p.demo} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-semibold tracking-wide"
              style={{ background: p.accent, color: '#000' }}>
              <FiExternalLink size={11} /> Live Demo
            </motion.a>
          )}
          <motion.a href={p.repo} target="_blank" rel="noopener noreferrer"
            whileHover={{ x: 2 }}
            className="flex items-center gap-1.5 text-[11px] font-medium ml-auto transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <FiGithub size={12} /> Source
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Secondary card ── */
function SecondaryCard({ p, index }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
      className="rounded-2xl overflow-hidden flex flex-col cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hov ? p.accent + '30' : 'var(--border)'}`,
        boxShadow: hov ? `0 16px 48px rgba(0,0,0,0.22)` : 'var(--shadow-sm)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}>

      {/* Strip */}
      <div className="relative h-28 flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--bg-elevated)' }}>
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }} />
        <motion.div animate={{ opacity: hov ? 0.35 : 0.08 }} transition={{ duration: 0.35 }}
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 80%, ${p.accent}30, transparent 55%)` }} />
        <motion.span animate={{ scale: hov ? 1.1 : 1 }} transition={{ duration: 0.28, type: 'spring' }}
          className="text-4xl relative z-10 select-none">{p.emoji}</motion.span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
          <motion.a href={p.demo || p.repo} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.12, rotate: 12 }}
            className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: `${p.accent}10`, border: `1px solid ${p.accent}22`, color: p.accent }}>
            <FiArrowUpRight size={11} />
          </motion.a>
        </div>
        <p className="text-[11px] leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.stack.slice(0, 3).map(t => (
            <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => e.currentTarget.style.color = p.accent}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <FiExternalLink size={10} /> Demo
            </a>
          )}
          <a href={p.repo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-medium ml-auto transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <FiGithub size={10} /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="04" label="Projects" heading="Things I've Built" />
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {featured.map((p, i) => <FeaturedCard key={p.id} p={p} index={i} />)}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {secondary.map((p, i) => <SecondaryCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </SectionWrapper>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const projects = [
  {
    id: 1, featured: true,
    image: 'https://files.catbox.moe/juz07w.png',
    title: 'Anonymous Chat',
    desc: 'Web app anonymous chat tanpa login via link unik — kirim pesan anonim ke siapapun.',
    stack: ['React', 'JavaScript', 'Vercel'],
    demo: 'https://anonymchat-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/anonymchat',
  },
  {
    id: 2, featured: true,
    image: 'https://files.catbox.moe/cyoawr.png',
    title: 'Lumine Beauty',
    desc: 'Katalog makeup modern dengan konsep e-commerce sederhana dan integrasi API produk.',
    stack: ['React', 'API Integration', 'Vercel'],
    demo: 'https://luminebeauty-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/luminebeauty',
  },
  {
    id: 3, featured: false,
    image: 'https://files.catbox.moe/za6llg.png',
    title: 'Syafa Store',
    desc: 'Toko panel Pterodactyl dengan payment gateway Atlantic terintegrasi.',
    stack: ['React', 'Payment Gateway', 'Vercel'],
    demo: 'https://syafastoreofficial.vercel.app/',
    repo: 'https://github.com/msyafa-alg/syafastoreofficial',
  },
  {
    id: 4, featured: false,
    image: 'https://files.catbox.moe/vzcod7.png',
    title: 'NovaHealth',
    desc: 'Kalkulator kesehatan statis — BMI, kalori, berat ideal, dan jejak karbon.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://novahealth-project.vercel.app',
    repo: 'https://github.com/msyafa-alg/NovaHealt',
  },
  {
    id: 5, featured: false,
    image: null,
    title: 'TIX ID Clone',
    desc: 'Clone sistem pemesanan tiket bioskop berbasis Laravel — latihan MVC architecture.',
    stack: ['Laravel', 'PHP', 'MySQL'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/tixid',
  },
  {
    id: 6, featured: false,
    image: 'https://files.catbox.moe/pejgfw.png',
    title: 'Music Chart',
    desc: 'Aplikasi chart musik dengan data dinamis sebagai latihan frontend rendering.',
    stack: ['JavaScript', 'Web App'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/musicchart',
  },
  {
    id: 7, featured: false,
    image: 'https://ibb.co.com/gFys1QFw',
    title: 'Kabeki Warkop',
    desc: 'Website Untuk Melihat Menu dan Deskripsi Warkop Modelan Seperti linktree',
    stack: ['HTML', 'CSS'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/kabeki',
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
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hov ? 'var(--border-hover)' : 'var(--border)'}`,
        boxShadow: hov ? 'var(--shadow-md)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}>
      {/* Image */}
      <div className="relative h-44 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        {p.image && (
          <img src={p.image} alt={p.title}
            className="w-full h-full object-cover object-top transition-transform duration-500"
            style={{ transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
        )}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 50%)' }} />
        {/* Hover buttons */}
        <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center gap-2">
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}>
              <FiExternalLink size={11} /> View
            </a>
          )}
          <a href={p.repo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
            <FiGithub size={11} /> GitHub
          </a>
        </motion.div>
      </div>
      {/* Body */}
      <div className="p-5">
        <p className="text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
        <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.stack.map(t => <span key={t} className="badge">{t}</span>)}
        </div>
        <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <FiExternalLink size={11} /> Live Demo
            </a>
          )}
          <a href={p.repo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium ml-auto transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <FiGithub size={11} /> Source
          </a>
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
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hov ? 'var(--border-hover)' : 'var(--border)'}`,
        boxShadow: hov ? 'var(--shadow-sm)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}>
      {/* Image strip */}
      <div className="relative h-28 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        {p.image && (
          <img src={p.image} alt={p.title}
            className="w-full h-full object-cover object-top transition-transform duration-500"
            style={{ transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
        )}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 55%)' }} />
      </div>
      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
          <a href={p.demo || p.repo} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
            <FiArrowUpRight size={11} />
          </a>
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.slice(0, 3).map(t => <span key={t} className="badge">{t}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-8 md:py-10">
      <div className="px-6 md:px-8">
        <SectionLabel number="04" label="Projects" heading="Things I've Built" />
        {/* Featured 2-col */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {featured.map((p, i) => <FeaturedCard key={p.id} p={p} index={i} />)}
        </div>
        {/* Secondary 4-col */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {secondary.map((p, i) => <SecondaryCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </SectionWrapper>
  )
}


import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowUpRight, FiX } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import { useLang } from '../context/LangContext'

const projects = [
  {
    id: 0, featured: true,
    image: 'https://files.catbox.moe/2cq8vo.png',
    title: 'AsefAI',
    desc: 'Aplikasi AI Chat berbasis web dengan Groq API. Mendukung real-time streaming response (SSE), Firebase Authentication, persistent chat history, conversation memory, multi-model AI, serta UI yang responsif.',
    stack: ['React', 'Firebase', 'Groq API'],
    demo: 'https://asefai.syafapnl.biz.id',
    repo: 'https://github.com/msyafa-alg/AiChat-GroqApi',
  },
  {
    id: 1, featured: true,
    image: 'https://files.catbox.moe/juz07w.png',
    title: 'Anonymous Chat',
    desc: 'Anonymous messaging web app via unique link — no login required. Send messages to anyone anonymously.',
    stack: ['React', 'JavaScript', 'Vercel'],
    demo: 'https://anonymchat.syafapersonalweb.my.id/a',
    repo: 'https://github.com/msyafa-alg/anonymchat',
  },
  {
    id: 2, featured: true,
    image: 'https://files.catbox.moe/cyoawr.png',
    title: 'Lumine Beauty',
    desc: 'Modern makeup catalog with an e-commerce concept and product API integration.',
    stack: ['React', 'API Integration', 'Vercel'],
    demo: 'https://luminebeauty-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/luminebeauty',
  },
  {
    id: 3, featured: false,
    image: 'https://files.catbox.moe/za6llg.png',
    title: 'Syafa Store',
    desc: 'Pterodactyl panel store with integrated Atlantic payment gateway.',
    stack: ['React', 'Payment Gateway', 'Vercel'],
    demo: 'https://syafastoreofficial.vercel.app/',
    repo: 'https://github.com/msyafa-alg/syafastoreofficial',
  },
  {
    id: 4, featured: false,
    image: 'https://files.catbox.moe/vzcod7.png',
    title: 'NovaHealth',
    desc: 'Static health calculator — BMI, calories, ideal weight, and carbon footprint tracker.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://novahealth-project.vercel.app',
    repo: 'https://github.com/msyafa-alg/NovaHealt',
  },
  {
    id: 5, featured: false,
    image: null,
    title: 'TIX ID Clone',
    desc: 'Cinema ticket booking system clone built with Laravel — MVC architecture practice.',
    stack: ['Laravel', 'PHP', 'MySQL'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/tixid',
  },
  {
    id: 6, featured: false,
    image: 'https://files.catbox.moe/pejgfw.png',
    title: 'Music Chart',
    desc: 'Dynamic music chart app with live data rendering — frontend practice project.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/musicchart',
  },
  {
    id: 7, featured: true,
    image: 'https://files.catbox.moe/l7z112.png',
    title: 'Wikrama 2',
    desc: 'Website Resmi Rayon SMK Wikrama Bogor — pusat informasi bagi siswa, alumni, dan masyarakat. Direktori siswa per angkatan, profil siswa, arsip alumni, galeri, berita, pengumuman real-time, data prestasi, live chat, serta panel admin.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Firebase', 'React Router', 'React PDF', 'XLSX'],
    demo: 'https://wikrama-2.vercel.app',
    repo: null,
  },
]

/* ── Floating detail ── */
function ProjectDetail({ p, onClose }) {
  const { t } = useLang()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
        }}>
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
          <FiX size={14} />
        </button>

        {/* Image */}
        {p.image && (
          <div className="relative w-full h-52 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <img src={p.image} alt={p.title}
              className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 40%)' }} />
          </div>
        )}

        {/* Body */}
        <div className="p-6 pt-5">
          <p className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {p.stack.map(t => <span key={t} className="badge">{t}</span>)}
          </div>

          <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                <FiExternalLink size={12} /> {t.liveDemo}
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--border)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-elevated)'; }}>
                <FiGithub size={12} /> {t.source}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Featured card ── */
function FeaturedCard({ p, index, onSelect }) {
  const { t } = useLang()
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onClick={() => onSelect(p)}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden cursor-pointer"
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
        <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center gap-2">
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}>
              <FiExternalLink size={11} /> {t.view}
            </a>
          )}
          <a href={p.repo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
            <FiGithub size={11} /> {t.github}
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
              <FiExternalLink size={11} /> {t.liveDemo}
            </a>
          )}
          <a href={p.repo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium ml-auto transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <FiGithub size={11} /> {t.source}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Secondary card ── */
function SecondaryCard({ p, index, onSelect }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onClick={() => onSelect(p)}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hov ? 'var(--border-hover)' : 'var(--border)'}`,
        boxShadow: hov ? 'var(--shadow-sm)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}>
      <div className="relative h-28 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        {p.image && (
          <img src={p.image} alt={p.title}
            className="w-full h-full object-cover object-top transition-transform duration-500"
            style={{ transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
        )}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 55%)' }} />
      </div>
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
  const { t } = useLang()
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.stack)))]

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.stack.includes(activeFilter))

  const filteredFeatured  = filtered.filter(p => p.featured)
  const filteredSecondary = filtered.filter(p => !p.featured)

  return (
    <>
      <SectionWrapper id="projects" className="py-8 md:py-10">
        <div className="px-6 md:px-8">
          <SectionLabel number="04" label={t.nav.projects} heading={t.thingsIBuilt} />

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map(tag => {
              const on = activeFilter === tag
              return (
                <motion.button key={tag} onClick={() => setActiveFilter(tag)}
                  whileTap={{ scale: 0.96 }}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: on ? 'var(--text-primary)' : 'var(--bg-card)',
                    color: on ? 'var(--bg)' : 'var(--text-muted)',
                    border: `1px solid ${on ? 'var(--text-primary)' : 'var(--border)'}`,
                  }}>
                  {tag === 'All' ? t.allFilter : tag}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeFilter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>

              {/* Featured 2-col */}
              {filteredFeatured.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {filteredFeatured.map((p, i) => <FeaturedCard key={p.id} p={p} index={i} onSelect={setSelected} />)}
                </div>
              )}

              {/* Secondary grid */}
              {filteredSecondary.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {filteredSecondary.map((p, i) => <SecondaryCard key={p.id} p={p} index={i} onSelect={setSelected} />)}
                </div>
              )}

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {t.noProjects} <span style={{ color: 'var(--text-primary)' }}>{activeFilter === 'All' ? t.allFilter : activeFilter}</span>.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionWrapper>

      {/* Floating detail */}
      <AnimatePresence>
        {selected && <ProjectDetail p={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}

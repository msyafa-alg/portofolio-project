import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome, FiUser, FiZap, FiBook, FiFolder, FiMail,
  FiSearch, FiMenu, FiX, FiTerminal,
} from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { useLang } from '../context/LangContext'

const navItems = [
  { icon: FiHome,   label: 'Home',      id: 'home'      },
  { icon: FiUser,   label: 'About',     id: 'about'     },
  { icon: FiZap,    label: 'Skills',    id: 'skills'    },
  { icon: FiBook,   label: 'Education', id: 'education' },
  { icon: FiFolder, label: 'Projects',  id: 'projects'  },
  { icon: FiMail,   label: 'Contact',   id: 'contact'   },
]

const appItems = [
  { icon: FiTerminal, label: 'JS Playground', id: 'playground-app' },
]

/* ── Smooth ripple on click ── */
function NavItem({ icon: Icon, label, id, active, onClick }) {
  const btnRef = useRef(null)
  const [ripples, setRipples] = useState([])
  const [hovered, setHovered] = useState(false)

  const handleClick = useCallback((e) => {
    const btn  = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const id_r = Date.now()

    setRipples(r => [...r, { id: id_r, x, y }])
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id_r)), 600)
    onClick(id)
  }, [id, onClick])

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-2.5 w-full px-3 py-2 rounded-full text-[13px] font-medium text-left mb-0.5 overflow-hidden select-none"
      style={{
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        transition: 'color 0.2s',
      }}
    >
      {/* Active background — pill, not full box */}
      {active && (
        <motion.div
          layoutId="nav-active-bg"
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--bg-elevated)' }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      )}

      {/* Hover background */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ opacity: !active && hovered ? 1 : 0 }}
        transition={{ duration: 0.18, delay: hovered ? 0.04 : 0 }}
        style={{ background: 'var(--bg-elevated)' }}
      />

      {/* Ripple */}
      {ripples.map(rp => (
        <motion.span
          key={rp.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: rp.x - 40, top: rp.y - 40,
            width: 80, height: 80,
            background: 'var(--text-primary)',
          }}
          initial={{ scale: 0, opacity: 0.1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      <Icon size={14} className="relative z-10 flex-shrink-0" />
      <span className="relative z-10 flex-1">{label}</span>
    </motion.button>
  )
}

export default function Sidebar({ activePage, setActivePage }) {
  const [search,     setSearch]     = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = useCallback((id) => { setActivePage(id); setMobileOpen(false) }, [setActivePage])
  const { lang, toggle: toggleLang, t } = useLang()

  const allNavItems = [
    { icon: FiHome,   label: t.nav.home,      id: 'home'      },
    { icon: FiUser,   label: t.nav.about,     id: 'about'     },
    { icon: FiZap,    label: t.nav.skills,    id: 'skills'    },
    { icon: FiBook,   label: t.nav.education, id: 'education' },
    { icon: FiFolder, label: t.nav.projects,  id: 'projects'  },
    { icon: FiMail,   label: t.nav.contact,   id: 'contact'   },
  ]
  const allAppItems = [
    { icon: FiTerminal, label: t.nav.playground, id: 'playground-app' },
  ]

  const filtered = search
    ? allNavItems.filter(n => n.label.toLowerCase().includes(search.toLowerCase()))
    : allNavItems

  const Content = () => (
    <div className="flex flex-col h-full" style={{ overflow: 'hidden auto' }}>

      {/* ── Profile ── */}
      <div className="px-4 pt-6 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col items-center text-center gap-3">
          {/* Avatar with soft glow ring */}
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full opacity-30"
              style={{ background: 'var(--border-hover)' }} />
            <img src="/images/profile.jpeg" alt="Syafa"
              className="relative w-14 h-14 rounded-full object-cover object-center"
              style={{ border: '1px solid var(--border)' }} />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
              style={{ background: 'var(--text-secondary)', borderColor: 'var(--bg-surface)' }} />
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <p className="text-sm font-semibold tracking-tight"
                style={{ color: 'var(--text-primary)' }}>Muhammad Syafa</p>
              {/* Monochrome verified */}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="6.5" fill="var(--border-strong)" />
                <path d="M4 6.5l1.8 1.8 3.5-3.5" stroke="var(--bg)" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>@msyafa-alg</p>
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="px-3 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="relative">
          <FiSearch size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t.search}
            className="w-full pl-7 pr-8 py-1.5 rounded-xl text-xs outline-none transition-all"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--border-hover)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] px-1 py-0.5 rounded-md"
            style={{ background: 'var(--bg)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
            ⌘K
          </span>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-2 py-2">
        {filtered.map(item => (
          <NavItem key={item.id} {...item} active={activePage === item.id} onClick={go} />
        ))}

        {/* Apps */}
        <div className="mt-5 mb-1.5 px-3">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: 'var(--text-muted)' }}>{t.apps}</p>
        </div>
        {allAppItems.map(item => (
          <NavItem key={item.id} {...item} active={activePage === item.id} onClick={go} />
        ))}
      </nav>

      {/* ── Theme + Lang ── */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-0.5"
              style={{ color: 'var(--text-muted)' }}>{t.theme}</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.darkMode}</p>
          </div>
          <ThemeToggle />
        </div>
        {/* Language toggle */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: 'var(--text-muted)' }}>Language</p>
          <motion.button
            onClick={toggleLang}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <motion.span
              key={lang}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {lang === 'en' ? '🇺🇸 EN' : '🇮🇩 ID'}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col h-full"
        style={{ background: 'var(--bg-surface)' }}>
        <Content />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-4"
        style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <span className="font-display text-sm font-bold tracking-wider" style={{ color: 'var(--text-primary)' }}>
          Syafa<span style={{ color: 'var(--text-muted)' }}>.</span>
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(v => !v)}
            className="w-7 h-7 flex items-center justify-center rounded-xl transition-colors"
            style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
            {mobileOpen ? <FiX size={13} /> : <FiMenu size={13} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 36 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 flex flex-col"
              style={{ width: '220px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>
              <Content />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

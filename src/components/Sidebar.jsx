import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome, FiUser, FiZap, FiBook, FiFolder, FiMail,
  FiSearch, FiMenu, FiX, FiTerminal,
} from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

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

export default function Sidebar({ activePage, setActivePage }) {
  const [search,     setSearch]     = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = id => { setActivePage(id); setMobileOpen(false) }

  const filtered = search
    ? navItems.filter(n => n.label.toLowerCase().includes(search.toLowerCase()))
    : navItems

  const Content = () => (
    <div className="flex flex-col h-full overflow-y-auto" style={{ gap: 0 }}>

      {/* ── Profile ── */}
      <div className="px-4 pt-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="relative">
            <img src="/images/profile.jpeg" alt="Syafa"
              className="w-14 h-14 rounded-full object-cover object-center"
              style={{ border: '1px solid var(--border)' }} />
            <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: 'var(--border-strong)', borderColor: 'var(--bg-surface)' }} />
          </div>
          <div>
            <div className="flex items-center justify-center gap-1">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Muhammad Syafa
              </p>
              {/* Verified badge */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#3b82f6" />
                <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>@msyafa-alg</p>
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
            placeholder="Search..."
            className="w-full pl-7 pr-3 py-1.5 rounded-lg text-xs outline-none"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--border-hover)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] px-1 py-0.5 rounded"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
            ⌘K
          </span>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-2 py-2">
        {filtered.map(({ icon: Icon, label, id }) => {
          const on = activePage === id
          return (
            <motion.button key={id} onClick={() => go(id)}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] font-medium text-left mb-0.5 transition-colors"
              style={{ color: on ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = 'var(--bg-elevated)' }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent' }}
            >
              {on && (
                <motion.div layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-hover)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <Icon size={14} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10 flex-1">{label}</span>
              {on && (
                <FiMenu size={10} className="relative z-10 flex-shrink-0"
                  style={{ color: 'var(--text-muted)' }} />
              )}
            </motion.button>
          )
        })}

        {/* Apps section */}
        <div className="mt-4 mb-1 px-3">
          <p className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}>Apps</p>
        </div>
        {appItems.map(({ icon: Icon, label, id }) => {
          const on = activePage === id
          return (
            <motion.button key={id} onClick={() => go(id)}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] font-medium text-left mb-0.5 transition-colors"
              style={{ color: on ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = 'var(--bg-elevated)' }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent' }}
            >
              {on && (
                <motion.div layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-hover)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <Icon size={14} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10 flex-1">{label}</span>
            </motion.button>
          )
        })}
      </nav>

      {/* ── Theme ── */}
      <div className="px-3 py-3 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-[10px] font-semibold tracking-widest uppercase mb-2"
          style={{ color: 'var(--text-muted)' }}>Theme</p>
        <div className="flex items-center justify-between px-1">
          <span className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Dark Mode
          </span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar — no fixed, just fills the sticky container from App */}
      <aside className="hidden lg:flex flex-col h-full"
        style={{
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border)',
        }}>
        <Content />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-4"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
        }}>
        <span className="font-display text-sm font-bold tracking-wider"
          style={{ color: 'var(--text-primary)' }}>
          Syafa<span style={{ color: 'var(--text-muted)' }}>.</span>
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(v => !v)}
            className="w-7 h-7 flex items-center justify-center rounded-lg"
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
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.6)' }}
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 flex flex-col"
              style={{
                width: '220px',
                background: 'var(--bg-surface)',
                borderRight: '1px solid var(--border)',
              }}>
              <Content />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}



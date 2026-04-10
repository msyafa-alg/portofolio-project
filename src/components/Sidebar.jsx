import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiUser, FiZap, FiBook, FiFolder, FiMail, FiSearch, FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { icon: FiHome,   label: 'Home',      id: 'home'      },
  { icon: FiUser,   label: 'About',     id: 'about'     },
  { icon: FiZap,    label: 'Skills',    id: 'skills'    },
  { icon: FiBook,   label: 'Education', id: 'education' },
  { icon: FiFolder, label: 'Projects',  id: 'projects'  },
  { icon: FiMail,   label: 'Contact',   id: 'contact'   },
]

export default function Sidebar({ activePage, setActivePage }) {
  const [search,     setSearch]     = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = id => { setActivePage(id); setMobileOpen(false) }

  const filtered = navItems.filter(n =>
    search === '' || n.label.toLowerCase().includes(search.toLowerCase())
  )

  const Content = () => (
    <div className="flex flex-col h-full px-4 py-6 gap-5">

      {/* Profile */}
      <div className="flex flex-col items-center text-center pb-5"
        style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="relative mb-3">
          <img src="/images/profile.jpeg" alt="Syafa"
            className="w-16 h-16 rounded-full object-cover object-center"
            style={{ border: '2px solid var(--border)' }} />
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2"
            style={{ borderColor: 'var(--bg-surface)' }} />
        </div>
        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Muhammad Syafa</p>
        <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>@msyafa-alg</p>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch size={12} className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--text-muted)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pl-8 pr-3 py-2 rounded-xl text-xs outline-none"
          style={{
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            color: 'var(--text-primary)', fontFamily: 'inherit', transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--border-hover)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {filtered.map(({ icon: Icon, label, id }) => {
          const on = activePage === id
          return (
            <motion.button key={id} onClick={() => go(id)}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left w-full relative"
              style={{ color: on ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = 'var(--accent-subtle)' }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent' }}
            >
              {on && (
                <motion.div layoutId="sidebar-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <Icon size={15} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10">{label}</span>
              {on && (
                <div className="ml-auto relative z-10 w-1 h-1 rounded-full"
                  style={{ background: 'var(--text-primary)' }} />
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Theme toggle */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}>Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 z-40"
        style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>
        <Content />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5"
        style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <span className="font-display text-sm font-bold tracking-wider" style={{ color: 'var(--text-primary)' }}>
          Syafa<span style={{ color: 'var(--text-muted)' }}>.</span>
        </span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(v => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ color: 'var(--text-secondary)', background: 'var(--accent-subtle)', border: '1px solid var(--border)' }}>
            {mobileOpen ? <FiX size={15} /> : <FiMenu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50"
              style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>
              <Content />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

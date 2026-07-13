import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome, FiUser, FiZap, FiBook, FiFolder, FiMail,
  FiSearch, FiMenu, FiX, FiTerminal,
} from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { useLang } from '../context/LangContext'

/* ── Nav Item — clean, no ripple, minimal DOM ── */
function NavItem({ icon: Icon, label, id, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className="relative flex items-center gap-2.5 w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left select-none transition-all duration-200"
      style={{
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        background: active ? 'var(--bg-elevated)' : 'transparent',
        border: 'none',
        outline: 'none',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)' }}
    >
      <Icon size={13} className="flex-shrink-0" />
      <span>{label}</span>
    </button>
  )
}

export default function Sidebar({ activePage, setActivePage }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = (id) => { setActivePage(id); setMobileOpen(false) }
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

  const Content = () => (
    <div className="flex flex-col h-full" style={{ overflow: 'hidden auto' }}>

      {/* ── Profile ── */}
      <div className="px-3 pt-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img src="/images/profile.jpeg" alt="Syafa"
              className="w-9 h-9 rounded-full object-cover"
              style={{ border: '1px solid var(--border)' }} />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-[1.5px]"
              style={{ background: 'var(--text-secondary)', borderColor: 'var(--bg-surface)' }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
              Muhammad Syafa
            </p>
            <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>@msyafa-alg</p>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {allNavItems.map(item => (
          <NavItem key={item.id} {...item} active={activePage === item.id} onClick={go} />
        ))}

        <div className="mt-5 mb-2 px-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-[9px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'var(--text-muted)' }}>{t.apps}</p>
        </div>
        {allAppItems.map(item => (
          <NavItem key={item.id} {...item} active={activePage === item.id} onClick={go} />
        ))}
      </nav>

      {/* ── Theme + Lang ── */}
      <div className="px-3 py-3 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'var(--text-muted)' }}>{t.theme}</p>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'var(--text-muted)' }}>Lang</p>
          <button
            onClick={toggleLang}
            className="text-[10px] font-medium px-2 py-0.5 rounded-md transition-colors"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            {lang === 'en' ? 'EN' : 'ID'}
          </button>
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
        <button onClick={() => setMobileOpen(v => !v)}
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          {mobileOpen ? <FiX size={14} /> : <FiMenu size={14} />}
        </button>
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
              style={{ width: '200px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>
              <Content />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

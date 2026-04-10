import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'About',     href: '#about'     },
  { label: 'Skills',    href: '#skills'    },
  { label: 'Education', href: '#education' },
  { label: 'Projects',  href: '#projects'  },
  { label: 'Contact',   href: '#contact'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.3 }
    )
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const go = href => { setMenuOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
      } : {}}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => go('#hero')}
          className="font-display text-sm font-bold tracking-[0.12em] uppercase transition-colors"
          style={{ color: 'var(--text-primary)' }}>
          Syafa<span style={{ color: 'var(--text-muted)' }}>.</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {links.map(({ label, href }) => {
            const on = active === href.slice(1)
            return (
              <li key={label}>
                <button onClick={() => go(href)}
                  className="relative px-4 py-2 text-xs font-medium tracking-wide rounded-lg transition-colors"
                  style={{ color: on ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {on && (
                    <motion.span layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border-hover)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="block w-4 h-0.5 bg-current origin-center" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} className="block w-4 h-0.5 bg-current" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="block w-4 h-0.5 bg-current origin-center" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(28px)', borderTop: '1px solid var(--border)' }}>
            <ul className="flex flex-col px-6 py-3 gap-0.5">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <button onClick={() => go(href)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors"
                    style={{
                      color: active === href.slice(1) ? 'var(--text-primary)' : 'var(--text-secondary)',
                      background: active === href.slice(1) ? 'var(--accent-subtle)' : 'transparent',
                    }}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

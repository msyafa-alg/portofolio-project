import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.4 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60' : ''
    }`}>
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          className="text-sm font-bold tracking-widest text-zinc-300 hover:text-cyan-400 transition-colors">
          SYAFA<span className="text-cyan-400">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map(({ label, href }) => (
            <li key={label}>
              <button onClick={() => scrollTo(href)}
                className={`transition-colors hover:text-zinc-100 ${active === href.slice(1) ? 'text-cyan-400' : 'text-zinc-400'}`}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-zinc-400 hover:text-zinc-100 focus:outline-none space-y-1"
          onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          <span className="block w-5 h-0.5 bg-current" />
          <span className="block w-5 h-0.5 bg-current" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="md:hidden bg-zinc-950/95 backdrop-blur border-t border-zinc-800 px-6 py-4">
            <ul className="flex flex-col gap-4 text-sm text-zinc-400">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <button onClick={() => scrollTo(href)}
                    className={`hover:text-zinc-100 transition-colors ${active === href.slice(1) ? 'text-cyan-400' : ''}`}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const socials = [
  { Icon: FiGithub,   href: 'https://github.com/msyafa-alg',                          label: 'GitHub'   },
  { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/syafa-algiffari-567a48375/', label: 'LinkedIn' },
  { Icon: FiMail,     href: 'mailto:firdaussyafa12@gmail.com',                        label: 'Email'    },
]

export default function Footer() {
  return (
    <footer className="relative" style={{ borderTop: '1px solid var(--border)' }}>
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border-hover), transparent)' }} />

      <div className="px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-5">

        <div className="text-center md:text-left">
          <p className="font-display text-xs font-bold tracking-[0.15em] uppercase"
            style={{ color: 'var(--text-muted)' }}>
            Syafa<span style={{ color: 'var(--text-primary)' }}>.</span>
          </p>
          <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
            © 2026 Muhammad Syafa Algiffari Firdaus
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ Icon, href, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', background: 'var(--bg-elevated)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
              <Icon size={13} />
            </motion.a>
          ))}
        </div>

        <p className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          React · Tailwind · Framer Motion
        </p>
      </div>
    </footer>
  )
}









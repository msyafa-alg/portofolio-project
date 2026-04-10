import { motion } from 'framer-motion'
import { FiArrowRight, FiMapPin, FiExternalLink, FiGithub } from 'react-icons/fi'
import useTyping from '../hooks/useTyping'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const roles = ['Frontend Developer', 'Server Enthusiast', 'IT Student', 'Web Builder']

const projects = [
  {
    image: 'https://files.catbox.moe/juz07w.png',
    title: 'Anonymous Chat',
    desc: 'Anonymous messaging via unique link — no login required.',
    stack: ['React', 'JavaScript', 'Vercel'],
    demo: 'https://anonymchat-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/anonymchat',
  },
  {
    image: 'https://files.catbox.moe/cyoawr.png',
    title: 'Lumine Beauty',
    desc: 'Modern makeup catalog with e-commerce concept and API integration.',
    stack: ['React', 'API', 'Vercel'],
    demo: 'https://luminebeauty-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/luminebeauty',
  },
]

export default function Hero({ setActivePage }) {
  const typed = useTyping(roles, 75, 40, 2400)

  return (
    <motion.div variants={stagger} initial="hidden" animate="show"
      className="w-full max-w-2xl mx-auto px-5 pt-8 pb-12 space-y-7">

      {/* Profile */}
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <img src="/images/profile.jpeg" alt="Muhammad Syafa"
            className="w-14 h-14 rounded-full object-cover"
            style={{ border: '1px solid var(--border)' }} />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
            style={{ background: 'var(--text-primary)', borderColor: 'var(--bg)' }} />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl leading-tight"
            style={{ color: 'var(--text-primary)' }}>
            Hi, I'm Syafa
          </h1>
          <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            <FiMapPin size={10} />
            <span>Bogor, Indonesia</span>
            <span>·</span>
            <span className="font-mono">{typed}<span className="typing-cursor" /></span>
          </div>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.p variants={fadeUp} className="text-sm leading-relaxed"
        style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        IT student at{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>SMK Wikrama</span>{' '}
        focused on building clean and modern web experiences. Passionate about
        frontend development and server infrastructure.
      </motion.p>

      {/* Featured Projects */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'var(--text-muted)' }}>Featured Projects</span>
          <button onClick={() => setActivePage('projects')}
            className="flex items-center gap-1 text-[11px] font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            See all <FiArrowRight size={10} />
          </button>
        </div>

        <div className="space-y-2">
          {projects.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-3 rounded-2xl p-3 transition-all"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div className="w-20 h-14 rounded-xl overflow-hidden flex-shrink-0"
                style={{ background: 'var(--bg-elevated)' }}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-tight"
                    style={{ color: 'var(--text-primary)' }}>{p.title}</p>
                  <button onClick={() => setActivePage('projects')}
                    className="flex-shrink-0 text-[10px] font-medium flex items-center gap-0.5"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    More <FiArrowRight size={9} />
                  </button>
                </div>
                <p className="text-[11px] mt-0.5 mb-2 leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {p.stack.slice(0, 2).map(t => (
                      <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                        style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                      <FiExternalLink size={12} />
                    </a>
                    <a href={p.repo} target="_blank" rel="noopener noreferrer"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                      <FiGithub size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Collab CTA */}
      <motion.div variants={fadeUp} className="rounded-2xl p-5"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          Let's work together
        </p>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Open to internships, collaborations, and learning opportunities.
        </p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => setActivePage('contact')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
          style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}>
          Contact Me <FiArrowRight size={12} />
        </motion.button>
      </motion.div>

    </motion.div>
  )
}

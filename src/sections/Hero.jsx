import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import useTyping from '../hooks/useTyping'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const roles = ['Frontend Developer', 'Server Enthusiast', 'IT Student', 'Web Builder']

export default function Hero() {
  const ref = useRef(null)
  const go  = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  const typed = useTyping(roles, 70, 38, 2200)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <motion.div style={{ y, opacity }} className="w-full max-w-5xl mx-auto px-6 py-24">
        <motion.div variants={container} initial="hidden" animate="show"
          className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-14">

          {/* Left */}
          <div className="flex-1 max-w-lg">

            {/* Badge */}
            <motion.div variants={item} className="mb-7">
              <span className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.18em] uppercase px-4 py-2 rounded-full glass"
                style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                    style={{ background: 'var(--text-primary)' }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ background: 'var(--text-primary)' }} />
                </span>
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item} className="mb-2">
              <h1 className="font-display font-bold leading-[1.02] tracking-tight"
                style={{ fontSize: 'clamp(3rem, 7.5vw, 5rem)', color: 'var(--text-primary)' }}>
                Muhammad<br />Syafa
              </h1>
            </motion.div>

            <motion.p variants={item} className="text-lg font-light tracking-widest mb-6"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              Algiffari Firdaus
            </motion.p>

            {/* Typing */}
            <motion.div variants={item} className="flex items-center gap-2 mb-5 font-mono text-sm"
              style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--text-muted)' }}>$</span>
              <span>{typed}</span>
              <span className="typing-cursor" />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={item} className="text-sm leading-[1.9] mb-10 max-w-sm"
              style={{ color: 'var(--text-secondary)' }}>
              Building clean, efficient, and modern web experiences — one component at a time.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => go('#projects')}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all"
                style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}>
                View Projects
                <FiArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => go('#contact')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all glass"
                style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                Contact Me
              </motion.button>
            </motion.div>

            {/* Scroll */}
            <motion.div variants={item} className="mt-14 flex items-center gap-3"
              style={{ color: 'var(--text-muted)' }}>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-px h-8 rounded-full"
                style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
              <span className="text-[9px] tracking-[0.25em] uppercase font-semibold">Scroll</span>
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div variants={item} className="flex justify-center md:justify-end flex-shrink-0">
            <div className="relative">
              {/* Rotating ring */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, var(--border-strong), transparent 40%, var(--border), transparent 70%, var(--border-strong))',
                  filter: 'blur(0.5px)',
                }} />

              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative w-44 h-44 md:w-52 md:h-52">
                <img src="/images/profile.jpeg" alt="Muhammad Syafa"
                  className="w-full h-full rounded-full object-cover object-center"
                  style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }} />
                <div className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(to top, var(--accent-subtle), transparent)' }} />
              </motion.div>

              {/* Badge */}
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -right-3 glass rounded-xl px-3 py-1.5 text-[11px] font-medium"
                style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
                💻 Open to work
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  )
}

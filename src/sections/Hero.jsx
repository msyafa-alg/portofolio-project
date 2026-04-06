import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const float = {
  animate: {
    y: [0, -7, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function Hero() {
  const ref = useRef(null)
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  // Parallax: text drifts up slightly as user scrolls
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} id="hero" className="min-h-screen flex items-center pt-20 max-w-5xl mx-auto px-6 overflow-hidden">

      <motion.div style={{ y, opacity }} className="py-24 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-12"
        >

          {/* ── Left: text ── */}
          <div className="flex-1">
            <motion.div variants={item}>
              <motion.span variants={float} animate="animate"
                className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-cyan-400 uppercase border border-cyan-400/30 px-3 py-1 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Available for opportunities
              </motion.span>
            </motion.div>

            <motion.h1 variants={item} className="text-5xl md:text-6xl font-extrabold text-zinc-100 leading-tight">
              Muhammad Syafa
            </motion.h1>

            <motion.p variants={item} className="text-xl md:text-2xl font-light text-zinc-500 mt-1 mb-5 tracking-wide">
              Algiffari Firdaus
            </motion.p>

            <motion.p variants={item} className="text-base md:text-lg text-cyan-400 font-medium tracking-wide mb-4">
              IT Student &nbsp;•&nbsp; Frontend Developer &nbsp;•&nbsp; Server Enthusiast
            </motion.p>

            <motion.p variants={item} className="text-zinc-400 text-lg max-w-xl mb-10 leading-relaxed">
              Building clean, efficient, and modern web experiences.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(34,211,238,0.25)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#projects')}
                className="px-6 py-3 bg-cyan-400 text-zinc-950 font-semibold rounded-lg text-sm hover:bg-cyan-300 transition-colors">
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#contact')}
                className="px-6 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded-lg text-sm hover:border-cyan-400 hover:text-cyan-400 transition-colors">
                Contact Me
              </motion.button>
            </motion.div>

            <motion.div variants={item} className="mt-16 flex items-center gap-2 text-zinc-700 text-xs">
              <motion.div
                animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-px h-10 bg-zinc-700 origin-top"
              />
              <span>Scroll to explore</span>
            </motion.div>
          </div>

          {/* ── Right: profile photo ── */}
          <motion.div variants={item} className="flex justify-center md:justify-end flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="relative w-40 h-40 md:w-48 md:h-48"
            >
              {/* Spinning gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-400/50 via-blue-500/20 to-transparent blur-sm"
              />
              <img
                src="/images/profile.jpeg"
                alt="Profile Photo"
                className="relative w-full h-full rounded-full object-cover object-center border-2 border-zinc-800 shadow-2xl shadow-black/60"
              />
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  )
}

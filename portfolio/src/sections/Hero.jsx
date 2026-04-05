import { motion } from 'framer-motion'

// Stagger container — children animate one after another
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Subtle floating animation for the badge
const float = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-20 max-w-5xl mx-auto px-6"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="py-24 w-full"
      >
        {/* Floating availability badge */}
        <motion.div variants={item}>
          <motion.span
            variants={float}
            animate="animate"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-cyan-400 uppercase border border-cyan-400/30 px-3 py-1 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Available for opportunities
          </motion.span>
        </motion.div>

        {/* Main name */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-extrabold text-zinc-100 leading-tight"
        >
          Muhammad Syafa
        </motion.h1>

        {/* Subtitle name */}
        <motion.p
          variants={item}
          className="text-xl md:text-2xl font-light text-zinc-500 mt-1 mb-5 tracking-wide"
        >
          Algiffari Firdaus
        </motion.p>

        {/* Role */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-cyan-400 font-medium tracking-wide mb-4"
        >
          IT Student &nbsp;•&nbsp; Frontend Developer &nbsp;•&nbsp; Server Enthusiast
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-zinc-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Building clean, efficient, and modern web experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#projects')}
            className="px-6 py-3 bg-cyan-400 text-zinc-950 font-semibold rounded-lg text-sm hover:bg-cyan-300 transition-colors"
          >
            View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#contact')}
            className="px-6 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded-lg text-sm hover:border-cyan-400 hover:text-cyan-400 transition-colors"
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={item}
          className="mt-20 flex items-center gap-2 text-zinc-700 text-xs"
        >
          <div className="w-px h-10 bg-zinc-800" />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const projects = [
  {
    emoji: '💬', color: 'from-sky-900/30 to-zinc-900/10',
    title: 'Anonymous Chat',
    desc: 'Web app anonymous chat yang memungkinkan pengguna menerima pesan anonim melalui link khusus tanpa perlu login akun.',
    stack: ['React', 'JavaScript', 'Vercel'],
    demo: 'https://anonymchat-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/anonymchat',
  },
  {
    emoji: '💄', color: 'from-pink-900/30 to-zinc-900/10',
    title: 'Lumine Beauty',
    desc: 'Website katalog makeup dengan konsep e-commerce sederhana yang menampilkan produk kecantikan secara modern dan responsive.',
    stack: ['React', 'JavaScript', 'API Integration', 'Vercel'],
    demo: 'https://luminebeauty-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/luminebeauty',
  },
  {
    emoji: '🎬', color: 'from-red-900/30 to-zinc-900/10',
    title: 'TIX ID Fake',
    desc: 'Clone sistem pemesanan tiket bioskop berbasis Laravel sebagai latihan pengembangan web backend dan MVC architecture.',
    stack: ['Laravel', 'PHP', 'MySQL'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/tixid',
  },
  {
    emoji: '🎵', color: 'from-emerald-900/30 to-zinc-900/10',
    title: 'Music Chart',
    desc: 'Aplikasi web untuk menampilkan chart musik menggunakan data dinamis sebagai latihan pengolahan data dan frontend rendering.',
    stack: ['JavaScript', 'Web App'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/musicchart',
  },
  {
    emoji: '🛒', color: 'from-violet-900/30 to-zinc-900/10',
    title: 'Syafa Store',
    desc: 'Website penjualan panel Pterodactyl dengan sistem pembayaran online menggunakan gateway Atlantic.',
    stack: ['React', 'Payment Gateway', 'Vercel'],
    demo: 'https://syafastoreofficial.vercel.app/',
    repo: 'https://github.com/msyafa-alg/syafastoreofficial',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const card = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-24 bg-zinc-900/30" direction="up">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="04" label="Projects" heading="Things I've Built" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map(({ emoji, color, title, desc, stack, demo, repo }) => (
            <motion.div
              key={title}
              variants={card}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-colors flex flex-col"
            >
              {/* Thumbnail */}
              <div className={`h-44 bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden`}>
                <motion.span
                  className="text-5xl"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {emoji}
                </motion.span>
                {/* Shine sweep on hover */}
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ x: '200%', opacity: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-1">{desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {stack.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
                <div className="flex gap-3">
                  {demo && (
                    <motion.a
                      href={demo} target="_blank" rel="noopener noreferrer"
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
                    >
                      <FiExternalLink size={13} /> Demo
                    </motion.a>
                  )}
                  <motion.a
                    href={repo} target="_blank" rel="noopener noreferrer"
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    <FiGithub size={13} /> GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

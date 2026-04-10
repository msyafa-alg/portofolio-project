import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const projects = [
  {
    id: 1, featured: true, accent: '#22d3ee',
    image: 'https://files.catbox.moe/juz07w.png',
    title: 'Anonymous Chat',
    desc: 'Web app anonymous chat tanpa login via link unik.',
    stack: ['React', 'JavaScript', 'Vercel'],
    demo: 'https://anonymchat-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/anonymchat',
  },
  {
    id: 2, featured: true, accent: '#f472b6',
    image: 'https://files.catbox.moe/cyoawr.png',
    title: 'Lumine Beauty',
    desc: 'Katalog makeup modern dengan konsep e-commerce.',
    stack: ['React', 'API', 'Vercel'],
    demo: 'https://luminebeauty-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/luminebeauty',
  },
  {
    id: 3, featured: false,
    title: 'Syafa Store',
    desc: 'Toko panel Pterodactyl dengan payment gateway.',
    stack: ['React', 'Payment', 'Vercel'],
    repo: 'https://github.com/msyafa-alg/syafastoreofficial',
  },
  {
    id: 4, featured: false,
    title: 'NovaHealth',
    desc: 'Kalkulator BMI & kesehatan sederhana.',
    stack: ['HTML', 'CSS', 'JS'],
    repo: 'https://github.com/msyafa-alg/NovaHealt',
  },
  {
    id: 5, featured: false,
    title: 'TIX ID Clone',
    desc: 'Latihan sistem booking Laravel.',
    stack: ['Laravel', 'PHP'],
    repo: 'https://github.com/msyafa-alg/tixid',
  },
  {
    id: 6, featured: false,
    title: 'Music Chart',
    desc: 'Chart musik sederhana berbasis JS.',
    stack: ['JavaScript'],
    repo: 'https://github.com/msyafa-alg/musicchart',
  },
]

const featured = projects.filter(p => p.featured)
const secondary = projects.filter(p => !p.featured)

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

/* ───────── Featured Card ───────── */
function FeaturedCard({ p, index }) {
  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
      }}
    >

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <span className="absolute top-4 left-4 text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/20">
          Featured
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[15px] font-semibold mb-2">
          {p.title}
        </h3>

        <p className="text-[12px] opacity-70 mb-5 flex-1 leading-relaxed">
          {p.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.stack.map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <a href={p.demo} target="_blank" className="text-[11px] font-medium hover:opacity-100 opacity-70">
            <FiExternalLink size={12} /> Demo
          </a>

          <a href={p.repo} target="_blank" className="text-[11px] ml-auto opacity-50 hover:opacity-100">
            <FiGithub size={12} /> Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ───────── Secondary Card ───────── */
function SecondaryCard({ p, index }) {
  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl p-4 flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.015)',
        border: '1px solid var(--border)',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
      }}
    >

      <h3 className="text-[13px] font-semibold mb-1">
        {p.title}
      </h3>

      <p className="text-[11px] opacity-70 mb-3 flex-1">
        {p.desc}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {p.stack.map(t => (
          <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
            {t}
          </span>
        ))}
      </div>

      <a
        href={p.repo}
        target="_blank"
        className="text-[10px] opacity-60 hover:opacity-100"
      >
        View Project →
      </a>
    </motion.div>
  )
}

/* ───────── MAIN ───────── */
export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-12">
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        <SectionLabel
          number="04"
          label="Projects"
          heading="Things I've Built"
        />

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} p={p} index={i} />
          ))}
        </div>

        {/* Secondary */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondary.map((p, i) => (
            <SecondaryCard key={p.id} p={p} index={i} />
          ))}
        </div>

      </div>
    </SectionWrapper>
  )
}
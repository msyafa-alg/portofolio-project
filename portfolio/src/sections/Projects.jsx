import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const projects = [
  {
    emoji:  '🛒',
    color:  'from-sky-900/30 to-zinc-900/10',
    title:  'Online Store Website',
    desc:   'A responsive e-commerce front-end with product listings, cart UI, and clean layout built from scratch.',
    stack:  ['HTML', 'CSS', 'JavaScript'],
    demo:   '#',
    repo:   '#',
  },
  {
    emoji:  '🖥️',
    color:  'from-emerald-900/30 to-zinc-900/10',
    title:  'Hosting Panel Setup',
    desc:   'Configured and deployed a VPS-based hosting panel with domain management, Nginx reverse proxy, and SSL.',
    stack:  ['Linux', 'VPS', 'Nginx', 'SSL'],
    demo:   '#',
    repo:   '#',
  },
  {
    emoji:  '👤',
    color:  'from-violet-900/30 to-zinc-900/10',
    title:  'Personal Portfolio',
    desc:   'This portfolio — built with React, Tailwind CSS, and Framer Motion for smooth animations.',
    stack:  ['React', 'Tailwind', 'Framer Motion'],
    demo:   '#',
    repo:   '#',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const card = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-24 bg-zinc-900/30">
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
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-colors flex flex-col"
            >
              {/* Image placeholder */}
              <div className={`h-44 bg-gradient-to-br ${color} flex items-center justify-center`}>
                <span className="text-5xl">{emoji}</span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-1">{desc}</p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {stack.map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <a
                    href={demo}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    <FiExternalLink size={13} /> Demo
                  </a>
                  <a
                    href={repo}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    <FiGithub size={13} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

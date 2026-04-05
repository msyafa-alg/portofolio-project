import { motion } from 'framer-motion'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaLinux, FaServer,
  FaLightbulb, FaUsers, FaBolt,
} from 'react-icons/fa'
import { SiTailwindcss } from 'react-icons/si'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const hardSkills = [
  { icon: <FaHtml5    className="text-orange-400" />, label: 'HTML'         },
  { icon: <FaCss3Alt  className="text-blue-400"   />, label: 'CSS'          },
  { icon: <FaJs       className="text-yellow-400" />, label: 'JavaScript'   },
  { icon: <FaReact    className="text-cyan-400"   />, label: 'React'        },
  { icon: <SiTailwindcss className="text-sky-400" />, label: 'Tailwind CSS' },
  { icon: <FaServer   className="text-emerald-400"/>, label: 'VPS & Hosting'},
  { icon: <FaLinux    className="text-zinc-300"   />, label: 'Linux Basics' },
]

const softSkills = [
  { icon: <FaLightbulb className="text-yellow-400" />, label: 'Problem Solving',    desc: 'Breaking complex issues into manageable steps'     },
  { icon: <FaBolt      className="text-cyan-400"   />, label: 'Fast Learner',       desc: 'Quickly adapting to new tools and frameworks'      },
  { icon: <FaUsers     className="text-violet-400" />, label: 'Team Collaboration', desc: 'Working effectively in group projects'             },
]

// Stagger children
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-24 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="02" label="Skills" heading="What I Work With" />

        <div className="grid md:grid-cols-2 gap-8">

          {/* Hard Skills */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-6">
              Hard Skills
            </p>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3"
            >
              {hardSkills.map(({ icon, label }) => (
                <motion.div
                  key={label}
                  variants={cardAnim}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(34,211,238,0.4)' }}
                  className="flex items-center gap-3 bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 cursor-default transition-colors"
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm text-zinc-300">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Soft Skills */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-6">
              Soft Skills
            </p>
            <div className="space-y-5">
              {softSkills.map(({ icon, label, desc }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 text-lg">
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{label}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

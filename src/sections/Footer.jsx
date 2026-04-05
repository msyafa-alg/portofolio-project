import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const socials = [
  { icon: <FiGithub size={16} />,   href: 'https://github.com/msyafa-alg', label: 'GitHub'   },
  { icon: <FiLinkedin size={16} />, href: 'https://www.linkedin.com/in/syafa-algiffari-567a48375/', label: 'LinkedIn' },
  { icon: <FiMail size={16} />,     href: 'mailto:firdaussyafa12@gmail.com', label: 'Email'    },
]

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-600">© 2026 Muhammad Syafa Algiffari Firdaus</p>
        <div className="flex items-center gap-4">
          {socials.map(({ icon, href, label }) => (
            <motion.a key={label} href={href} aria-label={label}
              whileHover={{ scale: 1.15 }}
              className="text-zinc-600 hover:text-cyan-400 transition-colors">
              {icon}
            </motion.a>
          ))}
        </div>
        <p className="text-xs text-zinc-700">Built with React · Tailwind · Framer Motion</p>
      </div>
    </footer>
  )
}

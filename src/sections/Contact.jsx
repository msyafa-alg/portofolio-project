import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const socials = [
  { icon: <FiMail size={15} />,     label: 'firdaussyafa12@gmail.com',                          href: 'mailto:firdaussyafa12@gmail.com' },
  { icon: <FiLinkedin size={15} />, label: 'linkedin.com/in/syafa-algiffari',                   href: 'https://www.linkedin.com/in/syafa-algiffari-567a48375/' },
  { icon: <FiGithub size={15} />,   label: 'github.com/msyafa-alg',                             href: 'https://github.com/msyafa-alg' },
]

const formStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const formItem = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [success, setSuccess] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSuccess(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <SectionWrapper id="contact" className="py-24" direction="up">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="05" label="Contact" heading="Get In Touch"
          sub="Have a project in mind or just want to connect? Feel free to reach out." />

        <div className="grid md:grid-cols-2 gap-12">

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={formStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
            noValidate
          >
            {['name', 'email'].map(field => (
              <motion.div key={field} variants={formItem}>
                <label className="block text-xs text-zinc-400 mb-1.5 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field} value={form[field]} onChange={handleChange}
                  placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)] transition-all"
                />
              </motion.div>
            ))}

            <motion.div variants={formItem}>
              <label className="block text-xs text-zinc-400 mb-1.5">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} rows={5}
                placeholder="What's on your mind?"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)] transition-all resize-none"
              />
            </motion.div>

            <motion.div variants={formItem}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-cyan-400 text-zinc-950 font-semibold rounded-xl text-sm hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2"
              >
                <FiSend size={14} />
                Send Message
              </motion.button>
            </motion.div>

            {success && (
              <motion.p
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-emerald-400 text-center"
              >
                ✓ Message sent! I'll get back to you soon.
              </motion.p>
            )}
          </motion.form>

          {/* Social links */}
          <div className="space-y-6 pt-1">
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Other ways to reach me</p>
            <div className="space-y-4">
              {socials.map(({ icon, label, href }, i) => (
                <motion.a
                  key={label} href={href}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-zinc-100 transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/40 transition-colors">
                    {icon}
                  </span>
                  {label}
                </motion.a>
              ))}
            </div>
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-sm text-zinc-500 leading-relaxed">
                Based in Indonesia. Open to learning opportunities, collaborations, and internships.
              </p>
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  )
}

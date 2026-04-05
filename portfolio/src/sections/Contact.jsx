import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const socials = [
  { icon: <FiMail     size={15} />, label: 'syafa.algiffari@email.com',      href: '#' },
  { icon: <FiLinkedin size={15} />, label: 'linkedin.com/in/syafa-algiffari', href: '#' },
  { icon: <FiGithub   size={15} />, label: 'github.com/syafa-algiffari',      href: '#' },
]

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [success, setSuccess] = useState(false)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSuccess(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <SectionWrapper id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel
          number="05"
          label="Contact"
          heading="Get In Touch"
          sub="Have a project in mind or just want to connect? Feel free to reach out."
        />

        <div className="grid md:grid-cols-2 gap-12">

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {['name', 'email'].map(field => (
              <div key={field}>
                <label className="block text-xs text-zinc-400 mb-1.5 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="What's on your mind?"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
              />
            </div>

            {/* Animated submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-cyan-400 text-zinc-950 font-semibold rounded-xl text-sm hover:bg-cyan-300 transition-colors"
            >
              Send Message
            </motion.button>

            {/* Success feedback */}
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-emerald-400 text-center"
              >
                Message sent! I'll get back to you soon.
              </motion.p>
            )}
          </form>

          {/* Social links */}
          <div className="space-y-6 pt-1">
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              Other ways to reach me
            </p>
            <div className="space-y-4">
              {socials.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-zinc-100 transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/40 transition-colors">
                    {icon}
                  </span>
                  {label}
                </a>
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

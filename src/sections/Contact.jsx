import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiSend, FiArrowUpRight } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const socials = [
  { Icon: FiMail,     label: 'firdaussyafa12@gmail.com',        href: 'mailto:firdaussyafa12@gmail.com'                        },
  { Icon: FiLinkedin, label: 'linkedin.com/in/syafa-algiffari', href: 'https://www.linkedin.com/in/syafa-algiffari-567a48375/' },
  { Icon: FiGithub,   label: 'github.com/msyafa-alg',           href: 'https://github.com/msyafa-alg'                         },
]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
const fi      = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

const inputBase = {
  width: '100%',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: '0.875rem',
  padding: '0.75rem 1rem',
  fontSize: '0.8125rem',
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [success, setSuccess] = useState(false)

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const onFocus  = e => { e.target.style.borderColor = 'var(--border-strong)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-subtle)' }
  const onBlur   = e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }

  const onSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSuccess(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <SectionWrapper id="contact" className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel number="05" label="Contact" heading="Get In Touch"
          sub="Have a project in mind or just want to connect? Feel free to reach out." />

        <div className="grid md:grid-cols-2 gap-6">

          {/* Form */}
          <motion.form onSubmit={onSubmit} variants={stagger} initial="hidden"
            whileInView="show" viewport={{ once: true }}
            className="gradient-border rounded-2xl p-6 space-y-4 noValidate"
            style={{ background: 'var(--bg-card)' }}>

            {['name', 'email'].map(field => (
              <motion.div key={field} variants={fi}>
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
                  style={{ color: 'var(--text-muted)' }}>{field}</label>
                <input type={field === 'email' ? 'email' : 'text'}
                  name={field} value={form[field]} onChange={onChange}
                  onFocus={onFocus} onBlur={onBlur}
                  placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                  style={inputBase} />
              </motion.div>
            ))}

            <motion.div variants={fi}>
              <label className="block text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
                style={{ color: 'var(--text-muted)' }}>Message</label>
              <textarea name="message" value={form.message} onChange={onChange}
                onFocus={onFocus} onBlur={onBlur}
                rows={5} placeholder="What's on your mind?"
                style={{ ...inputBase, resize: 'none' }} />
            </motion.div>

            <motion.div variants={fi}>
              <motion.button type="submit"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all"
                style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}>
                <FiSend size={12} /> Send Message
              </motion.button>
            </motion.div>

            {success && (
              <motion.div initial={{ opacity: 0, y: 6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                className="rounded-xl px-4 py-3 text-xs text-center font-medium"
                style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.18)', color: '#34d399' }}>
                ✓ Message sent! I'll get back to you soon.
              </motion.div>
            )}
          </motion.form>

          {/* Info */}
          <div className="flex flex-col gap-4">

            {/* Socials */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="gradient-border rounded-2xl p-6 flex-1"
              style={{ background: 'var(--bg-card)' }}>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
                style={{ color: 'var(--text-muted)' }}>Reach me directly</p>
              <div className="space-y-3">
                {socials.map(({ Icon, label, href }, i) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
                      <Icon size={13} />
                    </div>
                    <span className="text-xs truncate transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                      {label}
                    </span>
                    <FiArrowUpRight size={10} className="ml-auto flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="gradient-border rounded-2xl p-6"
              style={{ background: 'var(--bg-card)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">Available</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Based in <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Indonesia</strong>. Open to internships, collaborations, and learning opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiMail, FiLinkedin, FiGithub, FiSend, FiArrowUpRight, FiUser, FiMessageSquare, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import SuccessToast from '../components/SuccessToast'
import { useLang } from '../context/LangContext'

const EMAILJS_SERVICE  = 'service_v0rynvg'
const EMAILJS_TEMPLATE = 'template_csq3uer'
const EMAILJS_KEY      = '1UfkAKwDC7DZp3ucC'

const socials = [
  {
    Icon: FiMail,
    label: 'Email',
    sub: 'firdaussyafa12@gmail.com',
    href: 'mailto:firdaussyafa12@gmail.com',
  },
  {
    Icon: FiLinkedin,
    label: 'LinkedIn',
    sub: 'syafa-algiffari',
    href: 'https://www.linkedin.com/in/syafa-algiffari-567a48375/',
  },
  {
    Icon: FiGithub,
    label: 'GitHub',
    sub: 'msyafa-alg',
    href: 'https://github.com/msyafa-alg',
  },
]

/* ── Validation helpers ── */
const validators = {
  name:    v => v.trim().length < 2  ? 'Name must be at least 2 characters.' : '',
  email:   v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? 'Enter a valid email address.' : '',
  message: v => v.trim().length < 10 ? 'Message must be at least 10 characters.' : '',
}

/* ── Field component ── */
function Field({ label, icon: Icon, error, touched, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider mb-1.5"
        style={{ color: 'var(--text-muted)' }}>
        <Icon size={10} />
        {label}
      </label>
      {children}
      <AnimatePresence>
        {touched && error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1 text-[11px] mt-1.5"
            style={{ color: '#f87171' }}>
            <FiAlertCircle size={10} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const { t } = useLang()
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const errors = {
    name:    validators.name(form.name),
    email:   validators.email(form.email),
    message: validators.message(form.message),
  }
  const isValid = !errors.name && !errors.email && !errors.message

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleBlur = e => {
    setTouched(t => ({ ...t, [e.target.name]: true }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Mark all touched on submit
    setTouched({ name: true, email: true, message: true })
    if (!isValid) return

    setLoading(true)
    setError('')

    try {
      let ipInfo = 'Unknown'
      try {
        const res = await fetch('https://ipapi.co/json/')
        const data = await res.json()
        ipInfo = `${data.ip} — ${data.city}, ${data.region}, ${data.country_name}`
      } catch {
        ipInfo = 'Could not retrieve'
      }

      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:  form.name,
          from_email: form.email,
          name:       form.name,
          message:    form.message,
          reply_to:   form.email,
          time:       new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' }),
          ip_address: ipInfo,
        },
        EMAILJS_KEY
      )
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
      setTouched({ name: false, email: false, message: false })
      setTimeout(() => setSuccess(false), 4000)
    } catch {
      setError('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputBase = `w-full text-sm px-3 py-2.5 rounded-xl outline-none transition-all`
  const inputStyle = (field) => ({
    background: 'var(--bg-elevated)',
    border: `1px solid ${touched[field] && errors[field] ? '#f87171' : touched[field] && !errors[field] ? 'var(--border-hover)' : 'var(--border)'}`,
    color: 'var(--text-primary)',
  })

  return (
    <>
      <SuccessToast show={success} onClose={() => setSuccess(false)} />

      <SectionWrapper id="contact" className="py-8 md:py-10">
        <div className="px-6 md:px-8">

          <SectionLabel
            number="05"
            label={t.nav.contact}
            heading={t.getInTouch}
            sub={t.getInTouchSub}
          />

          <div className="flex flex-col gap-6 mt-8 md:grid md:grid-cols-2 md:gap-8">

            {/* FORM */}
            <motion.form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5"
              style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
            >
              <Field label={t.name} icon={FiUser} error={errors.name} touched={touched.name}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t.namePlaceholder}
                  className={inputBase}
                  style={inputStyle('name')}
                />
              </Field>

              <Field label={t.email} icon={FiMail} error={errors.email} touched={touched.email}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t.emailPlaceholder}
                  className={inputBase}
                  style={inputStyle('email')}
                />
              </Field>

              <Field label={t.message} icon={FiMessageSquare} error={errors.message} touched={touched.message}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  placeholder={t.messagePlaceholder}
                  className={`${inputBase} resize-none`}
                  style={inputStyle('message')}
                />
                {/* Character count */}
                <p className="text-right text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
                  {form.message.length} chars
                </p>
              </Field>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full"
                    />
                    {t.sending}
                  </>
                ) : (
                  <><FiSend size={13} /> {t.send}</>
                )}
              </motion.button>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-xl"
                    style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171' }}>
                    <FiAlertCircle size={12} /> {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-xl"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                    <FiCheckCircle size={12} /> {t.sent}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>

            {/* RIGHT */}
            <div className="flex flex-col gap-5">

              {/* SOCIAL */}
              <div className="rounded-2xl p-4 sm:p-6 border border-[var(--border)] bg-[var(--bg-elevated)]">
                <p className="text-[11px] uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
                  Contact Info
                </p>
                <div className="space-y-3">
                  {socials.map(({ Icon, label, sub, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-xl transition-colors"
                      style={{ color: 'inherit' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                        <Icon size={14} />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{sub}</span>
                      </div>
                      <FiArrowUpRight className="ml-auto" style={{ color: 'var(--text-muted)' }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* STATUS */}
              <div className="rounded-2xl p-4 sm:p-6 border border-[var(--border)] bg-[var(--bg-elevated)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--text-secondary)' }} />
                  <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Available
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Open for freelance, internship, and collaboration.
                </p>
              </div>

            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}

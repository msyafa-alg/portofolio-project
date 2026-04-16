import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiMail, FiLinkedin, FiGithub, FiSend, FiArrowUpRight } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import SuccessToast from '../components/SuccessToast'

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

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setLoading(true)
    setError('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          reply_to:   form.email,
          time:       new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' }),
        },
        EMAILJS_KEY
      )
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      setError('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SuccessToast show={success} onClose={() => setSuccess(false)} />

      <SectionWrapper id="contact" className="py-8 md:py-10">
        <div className="px-6 md:px-8">

          <SectionLabel
            number="05"
            label="Contact"
            heading="Get In Touch"
            sub="Feel free to reach out anytime."
          />

          <div className="flex flex-col gap-6 mt-8 md:grid md:grid-cols-2 md:gap-8">

            {/* FORM */}
            <motion.form
              onSubmit={handleSubmit}
              className="rounded-2xl p-4 sm:p-6  space-y-4 sm:space-y-5"
              style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
            >

              {['name', 'email'].map((field) => (
                <div key={field}>
                  <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5 block">
                    {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                    className="w-full text-sm px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] 
                    focus:border-[var(--border-hover)] focus:ring-2 focus:ring-[var(--border)] outline-none transition"
                  />
                </div>
              ))}

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5 block">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message..."
                  className="w-full text-sm px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] 
                  focus:border-[var(--border-hover)] focus:ring-2 focus:ring-[var(--border)] outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 rounded-xl text-sm font-semibold 
                flex items-center justify-center gap-2 active:scale-95 transition disabled:opacity-60"
                style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
              >
                <FiSend size={14} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {error && (
                <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 
                rounded-xl px-3 py-2.5 text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border)] 
                rounded-xl px-3 py-2.5 text-center">
                  Message sent 🚀
                </div>
              )}
            </motion.form>

            {/* RIGHT */}
            <div className="flex flex-col gap-5">

              {/* SOCIAL */}
              <div className="rounded-2xl p-4 sm:p-6 border border-[var(--border)] bg-[var(--bg-elevated)] ">
                <p className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-4">
                  Contact Info
                </p>

                <div className="space-y-3">
                  {socials.map(({ Icon, label, sub, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg-elevated)] transition"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl 
                      bg-[var(--bg-elevated)] border border-[var(--border)]">
                        <Icon size={14} />
                      </div>

                      <div className="flex flex-col leading-tight">
                        <span className="text-sm text-[var(--text-primary)]">{label}</span>
                        <span className="text-xs text-[var(--text-muted)]">{sub}</span>
                      </div>

                      <FiArrowUpRight className="ml-auto text-[var(--text-muted)]" />
                    </a>
                  ))}
                </div>
              </div>

              {/* STATUS */}
              <div className="rounded-2xl p-4 sm:p-6 border border-[var(--border)] bg-[var(--bg-elevated)] ">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-pulse" />
                  <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                    Available
                  </span>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
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







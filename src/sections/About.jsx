import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiFileText, FiAward, FiDownload } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import { useLang } from '../context/LangContext'

/* ─── Sub-tab nav ─── */
const tabs = [
  { id: 'about', label: 'About',        icon: FiUser      },
  { id: 'cv',    label: 'CV',           icon: FiFileText  },
  { id: 'certs', label: 'Certificates', icon: FiAward     },
]

/* ─── Certificates data ─── */
const certificates = [
  {
    id: 1,
    title: 'Certificate 1',
    issuer: 'Dicoding JS',
    date: '2024',
    image: '/images/cert-1.jpg',   // ganti dengan foto sertifikat kamu
    desc: 'Deskripsi sertifikat pertama. Belajar Dasar Javascript',
  },
  {
    id: 2,
    title: 'Certificate 2',
    issuer: 'Dicoding Web Dev Dasar',
    date: '2024',
    image: '/images/cert-2.jpg',
    desc: 'Deskripsi sertifikat kedua. Belajar Dasar Pemrograman Website',
  },
  {
    id: 3,
    title: 'Certificate 3',
    issuer: 'K3',
    date: '2024',
    image: '/images/cert-3.jpg',
    desc: 'Deskripsi sertifikat ketiga. keselamatan,Kenyamanan dan Keamanan Kerja',
  },
]

/* ─── Page transition ─── */
const pageAnim = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.2 } },
}

/* ─── About tab ─── */
const stats = [
  { value: '6+',  label: 'Projects',     icon: '🚀' },
  { value: '9+',  label: 'Technologies', icon: '⚡' },
  { value: 'SMK', label: 'IT Track',     icon: '🎓' },
  { value: '∞',   label: 'Curiosity',    icon: '🔥' },
]

function AboutTab() {
  return (
    <motion.div {...pageAnim} className="space-y-6">
      <div className="grid md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-3 space-y-4">
          {[
            <>I'm an IT student at <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>SMK Wikrama</strong> with a strong focus on <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>web development</strong> and <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>server infrastructure</strong>.</>,
            <>My journey started with curiosity about how websites work — from front-end interfaces to the servers that power them. I enjoy building things that are both functional and well-structured.</>,
            <>Currently deepening my skills in modern web technologies, Linux server management, and VPS hosting — while continuously growing as a developer.</>,
          ].map((line, i) => (
            <p key={i} className="text-sm leading-[1.9]" style={{ color: 'var(--text-secondary)' }}>{line}</p>
          ))}
          <blockquote className="mt-6 pl-4 text-sm italic"
            style={{ borderLeft: '1px solid var(--border-hover)', color: 'var(--text-muted)' }}>
            "Code is not just logic — it's craft."
          </blockquote>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-3">
          {stats.map(({ value, label, icon }) => (
            <div key={label} className="gradient-border rounded-2xl p-4 cursor-default"
              style={{ background: 'var(--bg-card)' }}>
              <div className="text-lg mb-2">{icon}</div>
              <p className="text-xl font-bold font-display mb-0.5" style={{ color: 'var(--text-primary)' }}>{value}</p>
              <p className="text-[10px] tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── CV tab ─── */
function CVTab() {
  const sections = [
    {
      title: 'Experience',
      items: [
        { role: 'Freelance Web Developer', place: 'Self-employed', period: '2023 – Present', desc: 'Building websites and web apps for clients — from e-commerce to company profiles.' },
      ],
    },
    {
      title: 'Education',
      items: [
        { role: 'SMK Wikrama — Rekayasa Perangkat Lunak', place: 'Bogor', period: 'Current', desc: 'Vocational IT track focused on software engineering and networking.' },
        { role: 'Pesantren Fathan Mubina', place: 'MTs', period: 'Completed', desc: 'Junior high school with Islamic boarding school curriculum.' },
        { role: 'SDIT Almadinah Cibinong', place: 'Cibinong, Bogor', period: 'Completed', desc: 'Islamic integrated elementary school.' },
      ],
    },
    {
      title: 'Skills',
      items: [
        { role: 'Frontend', place: '', period: '', desc: 'HTML, CSS, JavaScript, React, Tailwind CSS' },
        { role: 'Backend', place: '', period: '', desc: 'Laravel, PHP, MySQL' },
        { role: 'Infrastructure', place: '', period: '', desc: 'VPS, Linux, Nginx, SSL' },
      ],
    },
  ]

  return (
    <motion.div {...pageAnim} className="space-y-8">
      {/* Download button */}
      <div className="flex items-center justify-between">
        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
          Muhammad Syafa Algiffari Firdaus — IT Student & Web Developer
        </p>
        <a href="/cv.pdf" download
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
          <FiDownload size={12} /> Download CV
        </a>
      </div>

      {sections.map(sec => (
        <div key={sec.title}>
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3"
            style={{ color: 'var(--text-muted)' }}>{sec.title}</p>
          <div className="space-y-2">
            {sec.items.map((item, i) => (
              <div key={i} className="rounded-xl p-4"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.role}</p>
                  {item.period && (
                    <span className="text-[10px] flex-shrink-0 px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      {item.period}
                    </span>
                  )}
                </div>
                {item.place && <p className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>{item.place}</p>}
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

/* ─── Certificates tab ─── */
function CertificatesTab() {
  const [selected, setSelected] = useState(null)

  return (
    <motion.div {...pageAnim}>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
        Click a certificate to view full size.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certificates.map(cert => (
          <motion.div key={cert.id}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => setSelected(cert)}
            className="rounded-2xl overflow-hidden cursor-pointer"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            {/* Certificate image placeholder */}
            <div className="h-36 flex items-center justify-center relative overflow-hidden"
              style={{ background: 'var(--bg-elevated)' }}>
              {cert.image ? (
                <img src={cert.image} alt={cert.title}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none' }} />
              ) : null}
              {/* Fallback placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                style={{ background: 'var(--bg-elevated)' }}>
                <FiAward size={28} style={{ color: 'var(--text-muted)' }} />
                <p className="text-base" style={{ color: 'var(--text-muted)' }}>Certificate Image</p>
              </div>
              {/* If image loads, show it on top */}
              {cert.image && (
                <img src={cert.image} alt={cert.title}
                  className="absolute inset-0 w-full h-full object-cover z-10" />
              )}
            </div>

            <div className="p-3">
              <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{cert.title}</p>
              <p className="text-base" style={{ color: 'var(--text-muted)' }}>{cert.issuer} · {cert.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden max-w-2xl w-full"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="h-72 flex items-center justify-center"
                style={{ background: 'var(--bg-elevated)' }}>
                {selected.image ? (
                  <img src={selected.image} alt={selected.title}
                    className="w-full h-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <FiAward size={40} style={{ color: 'var(--text-muted)' }} />
                    <p className="text-base" style={{ color: 'var(--text-muted)' }}>No image available</p>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{selected.title}</p>
                <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{selected.issuer} · {selected.date}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selected.desc}</p>
                <button onClick={() => setSelected(null)}
                  className="mt-4 text-xs px-3 py-1.5 rounded-xl transition-all"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Main ─── */
export default function About() {
  const [activeTab, setActiveTab] = useState('about')
  const { t } = useLang()

  const tabs = [
    { id: 'about', label: t.nav.about,        icon: FiUser      },
    { id: 'cv',    label: 'CV',               icon: FiFileText  },
    { id: 'certs', label: t.nav.education + ' Certs', icon: FiAward },
  ]

  return (
    <SectionWrapper id="about" className="py-8 md:py-10">
      <div className="px-6 md:px-8">
        <SectionLabel number="01" label={t.nav.about} heading={t.whoIAm} />

        {/* Sub-tab nav */}
        <div className="flex items-center gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
              style={{ color: activeTab === id ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              {activeTab === id && (
                <motion.div layoutId="about-tab"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <Icon size={13} className="relative z-10" />
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'about' && <AboutTab key="about" />}
          {activeTab === 'cv'    && <CVTab    key="cv"    />}
          {activeTab === 'certs' && <CertificatesTab key="certs" />}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}





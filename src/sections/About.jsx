import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiFileText, FiAward, FiDownload, FiBox, FiCpu, FiBookOpen, FiZap } from 'react-icons/fi'
import { FiLayers, FiTrendingUp, FiUsers } from 'react-icons/fi'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import { useLang } from '../context/LangContext'

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
function AboutTab() {
  const { t } = useLang()
  const statsData = [
    { value: '6+',  key: 'projects',     icon: <FiBox size={16} />        },
    { value: '9+',  key: 'technologies', icon: <FiCpu size={16} />        },
    { value: 'SMK', key: 'track',        icon: <FiBookOpen size={16} />   },
    { value: '∞',   key: 'curiosity',    icon: <FiTrendingUp size={16} /> },
  ]
  return (
    <motion.div {...pageAnim} className="space-y-6">
      <div className="grid md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-3 space-y-4">
          {t.aboutBio.map((line, i) => (
            <p key={i} className="text-sm leading-[1.9]" style={{ color: 'var(--text-secondary)' }}>{line('SMK Wikrama')}</p>
          ))}
<blockquote className="mt-6 pl-4 text-sm italic"
              style={{ borderLeft: '1px solid var(--border-hover)', color: 'var(--text-muted)' }}>
              {t.quote}
            </blockquote>
            <hr className="my-4 border-t" style={{ borderColor: 'var(--border)', opacity: 0.3 }} />
          </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-3">
          {statsData.map(({ value, key, icon }) => (
            <div key={key} className="gradient-border rounded-2xl p-4 cursor-default"
              style={{ background: 'var(--bg-card)' }}>
              <div className="mb-2" style={{ color: 'var(--text-muted)' }}>{icon}</div>
              <p className="text-xl font-bold font-display mb-0.5" style={{ color: 'var(--text-primary)' }}>{value}</p>
              <p className="text-[10px] tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>{t.stats[key]}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── CV tab ─── */
function CVTab() {
  const { t } = useLang()
  const sections = [
    {
      title: t.experience,
      items: [
        {
          role: 'Freelance Web Developer',
          place: 'Self-employed',
          period: '2023 – Present',
          desc: 'Delivered web projects for multiple clients — including e-commerce stores, company profiles, and custom web apps. Handled full cycle from design to deployment.',
          tags: ['React', 'Laravel'],
        },
        {
          role: 'Laravel Project — Client Work',
          place: 'Jihad Akbar · Remote',
          period: '2024',
          desc: 'Built a standalone Laravel application for a client. Handled backend logic, database design, and deployment.',
          tags: ['Laravel', 'PHP', 'MySQL'],
        },
        {
          role: 'Warkop Website',
          place: 'Jaki · Remote',
          period: '2024',
          desc: 'Designed and developed a business profile website for a local coffee shop. Focused on clean UI and mobile responsiveness.',
          tags: ['HTML', 'CSS', 'JavaScript'],
        },
        {
          role: 'Tongkrongan Website',
          place: 'Ridwan Surya · Remote',
          period: '2024',
          desc: 'Built a community hangout website with a modern look and smooth user experience.',
          tags: ['React', 'Tailwind CSS'],
        },
      ],
    },
    {
      title: t.nav.education,
      items: [
        {
          role: 'SMK Wikrama — Rekayasa Perangkat Lunak',
          place: 'Bogor',
          period: 'Current',
          desc: 'Vocational IT track focused on software engineering, web development, and networking.',
          tags: ['Web Dev', 'Networking', 'RPL'],
        },
        {
          role: 'Pesantren Fathan Mubina',
          place: 'MTs · Boarding School',
          period: 'Completed',
          desc: 'Junior high with Islamic boarding school curriculum. Developed early interest in computers and technology.',
          tags: [],
        },
        {
          role: 'SDIT Almadinah Cibinong',
          place: 'Cibinong, Bogor',
          period: 'Completed',
          desc: 'Islamic integrated elementary school. Foundation of character and love for learning.',
          tags: [],
        },
      ],
    },
    {
      title: t.technicalSkills,
      items: [
        { role: 'Frontend',        place: '', period: '', desc: 'HTML · CSS · JavaScript · React · Tailwind CSS', tags: [] },
        { role: 'Backend',         place: '', period: '', desc: 'Laravel · PHP · MySQL',                          tags: [] },
        { role: 'Deployment',  place: '', period: '', desc: 'Vercel',             tags: [] },
      ],
    },
  ]

  return (
    <motion.div {...pageAnim} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Muhammad Syafa Algiffari Firdaus
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            IT Student · Web Developer · Bogor, Indonesia
          </p>
        </div>
        <a href="https://drive.google.com/file/d/17U5rM7LZ62KEBwg-gJI1MCwtzYpj5Os2/view?usp=sharing"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          style={{ background: 'var(--text-primary)', color: 'var(--bg)', border: '1px solid var(--text-primary)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg)'; }}>
          <motion.span whileHover={{ rotate: 15 }} className="inline-block">
            <FiDownload size={14} />
          </motion.span>
          {t.downloadCv}
        </a>
      </div>

      {sections.map(sec => (
        <div key={sec.title}>
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3"
            style={{ color: 'var(--text-muted)' }}>{sec.title}</p>
          <div className="space-y-2">
            {sec.items.map((item, i) => (
              <motion.div key={i} className="rounded-xl p-4 cursor-default"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-lift rounded-xl p-4 cursor-default"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.role}</p>
                  {item.period && (
                    <span className="text-[10px] flex-shrink-0 px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      {item.period === 'Current' ? t.current : item.period === 'Completed' ? t.completed : item.period}
                    </span>
                  )}
                </div>
                {item.place && <p className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>{item.place}</p>}
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

/* ─── Certificates tab ─── */
function CertificatesTab() {
  const { t } = useLang()
  const [selected, setSelected] = useState(null)

  return (
    <motion.div {...pageAnim}>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
        {t.clickToView}
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
                <p className="text-base" style={{ color: 'var(--text-muted)' }}>{t.certificateImage}</p>
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
                    <p className="text-base" style={{ color: 'var(--text-muted)' }}>{t.noImage}</p>
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
                  {t.close}
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
    { id: 'about', label: t.aboutTab,  icon: FiUser     },
    { id: 'cv',    label: t.cvTab,     icon: FiFileText },
    { id: 'certs', label: t.certsTab,  icon: FiAward    },
  ]

  return (
    <SectionWrapper id="about" className="py-8 md:py-10">
      <div className="px-6 md:px-8">
        <SectionLabel number="01" label={t.nav.about} heading={t.whoIAm} />

        {/* Sub-tab nav */}
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl mb-8"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          {tabs.map(({ id, label, icon: Icon }) => {
            const on = activeTab === id
            return (
<motion.button key={id} onClick={() => setActiveTab(id)}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'var(--bg-elevated)' }}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
                  style={{ color: on ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {on && (
                  <motion.div layoutId="about-tab"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-hover)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <Icon size={12} className="relative z-10" />
                <span className="relative z-10 font-semibold">{label}</span>
              </motion.button>
            )
          })}
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





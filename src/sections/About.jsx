import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiMapPin, FiBriefcase, FiBookOpen, FiCode, FiServer, FiCloud, FiExternalLink } from 'react-icons/fi'
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaPhp } from 'react-icons/fa'
import { SiTailwindcss, SiLaravel, SiVercel, SiSupabase, SiPostgresql, SiMysql, SiExpress } from 'react-icons/si'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import { useLang } from '../context/LangContext'

const experiences = [
  {
    year: '2024 – Now',
    title: 'Freelance Web Developer',
    company: 'Self-employed',
    desc: 'Delivering web projects for clients — e-commerce stores, company profiles, and custom web apps. Handling full cycle from design to deployment.',
    tags: ['React', 'Laravel', 'Tailwind CSS'],
  },
  {
    year: '2024',
    title: 'Laravel Developer',
    company: 'Jihad Akbar · Remote',
    desc: 'Built a standalone Laravel application for a client. Handled backend logic, database design, and deployment.',
    tags: ['Laravel', 'PHP', 'MySQL'],
  },
  {
    year: '2024',
    title: 'Frontend Developer',
    company: 'Jaki · Remote',
    desc: 'Designed and developed business profile websites. Focused on clean UI, modern design, and mobile responsiveness.',
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
  },
  {
    year: '2024',
    title: 'Web Developer',
    company: 'Ridwan Surya · Remote',
    desc: 'Built community websites with modern frontend architecture and smooth user experiences.',
    tags: ['React', 'Tailwind CSS'],
  },
]

const education = [
  {
    year: '2024 – 2027',
    title: 'SMK Wikrama Bogor',
    degree: 'Rekayasa Perangkat Lunak',
    desc: 'Vocational IT track focused on software engineering, web development, and networking.',
    status: 'Current',
  },
  {
    year: '2021 – 2024',
    title: 'Pesantren Fathan Mubina',
    degree: 'MTs',
    desc: 'Junior high with Islamic boarding school curriculum. Developed early interest in computers and technology.',
    status: 'Completed',
  },
  {
    year: '2018 – 2021',
    title: 'SDIT Almadinah Cibinong',
    degree: 'SD',
    desc: 'Islamic integrated elementary school. Foundation of character and love for learning.',
    status: 'Completed',
  },
]

const techFocus = [
  {
    label: 'Frontend',
    icon: <FiCode size={14} />,
    items: [
      { name: 'React', icon: <FaReact style={{ color: '#61dafb' }} /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss style={{ color: '#38bdf8' }} /> },
      { name: 'JavaScript', icon: <FaJs style={{ color: '#f7df1e' }} /> },
      { name: 'HTML', icon: <FaHtml5 style={{ color: '#e34f26' }} /> },
      { name: 'CSS', icon: <FaCss3Alt style={{ color: '#264de4' }} /> },
    ],
  },
  {
    label: 'Backend',
    icon: <FiServer size={14} />,
    items: [
      { name: 'Laravel', icon: <SiLaravel style={{ color: '#ff2d20' }} /> },
      { name: 'Express.js', icon: <SiExpress style={{ color: '#ffffff' }} /> },
      { name: 'Node.js', icon: <FaNodeJs style={{ color: '#339933' }} /> },
      { name: 'PHP', icon: <FaPhp style={{ color: '#8892be' }} /> },
      { name: 'Supabase', icon: <SiSupabase style={{ color: '#3ECF8E' }} /> },
    ],
  },
  {
    label: 'Deployment',
    icon: <FiCloud size={14} />,
    items: [
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'PostgreSQL', icon: <SiPostgresql style={{ color: '#336791' }} /> },
      { name: 'MySQL', icon: <SiMysql style={{ color: '#f29111' }} /> },
    ],
  },
]

function SpotlightCard({ children, className = '', style: extraStyle }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [hover, setHover] = useState(false)

  const onMove = useCallback((e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPos({ x: 50, y: 50 }) }}
      onMouseMove={onMove}
      className={`relative overflow-hidden cursor-default ${className}`}
      style={{
        borderRadius: '20px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        ...extraStyle,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.3s',
          background: `radial-gradient(500px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
          borderRadius: '20px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function TimelineDot({ index }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-3 h-3 rounded-full border-2 flex-shrink-0 z-10"
        style={{
          background: 'var(--bg)',
          borderColor: 'var(--border-strong)',
        }}
      />
      {index < experiences.length - 1 && (
        <div className="w-px flex-1 min-h-[24px]" style={{ background: 'var(--border)' }} />
      )}
    </div>
  )
}

function TechChip({ name, icon }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.span
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ scale: 1.04 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-default"
      style={{
        background: hover ? 'var(--bg-elevated)' : 'var(--bg-card)',
        border: `1px solid ${hover ? 'var(--border-hover)' : 'var(--border)'}`,
        color: hover ? 'var(--text-primary)' : 'var(--text-secondary)',
        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
      }}
    >
      <span style={{ fontSize: '0.85rem', display: 'flex' }}>{icon}</span>
      {name}
    </motion.span>
  )
}

function StatCard({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <SpotlightCard className="p-4 text-center">
        <p className="text-xl font-bold font-display mb-0.5" style={{ color: 'var(--text-primary)' }}>{value}</p>
        <p className="text-[10px] tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>{label}</p>
      </SpotlightCard>
    </motion.div>
  )
}

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  )
}

export default function About() {
  const { t } = useLang()
  const fullName = 'Muhammad Syafa Algiffari Firdaus'

  return (
    <SectionWrapper id="about" className="py-8 md:py-10 overflow-hidden">
      <div className="px-6 md:px-8">
        <SectionLabel number="01" label={t.nav.about} heading={t.whoIAm} />

        {/* ── Hero Profile ── */}
        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {/* Left: photo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '24px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                aspectRatio: '4 / 5',
              }}
            >
              <img
                src="/images/profile.jpeg"
                alt={fullName}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 50%)' }}
              />
            </div>
          </motion.div>

          {/* Right: info */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider mb-4"
              style={{ background: 'var(--accent-subtle)', color: 'var(--accent)', border: '1px solid var(--accent-subtle)', width: 'fit-content' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
              Frontend Developer
            </div>

            <h1 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
              {fullName}
            </h1>

            <div className="flex items-center gap-3 text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1">
                <FiMapPin size={11} />
                Bogor, Indonesia
              </span>
              <span style={{ color: 'var(--border)' }}>/</span>
              <span className="flex items-center gap-1">
                <FiBriefcase size={11} />
                Available for projects
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Saya adalah siswa SMK jurusan Rekayasa Perangkat Lunak yang fokus pada frontend development menggunakan React dan Tailwind CSS. Saya membangun aplikasi web modern, responsif, dan user-friendly — dari landing page hingga dashboard kompleks.
            </p>

            <a
              href="https://drive.google.com/file/d/17U5rM7LZ62KEBwg-gJI1MCwtzYpj5Os2/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all w-fit"
              style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              <FiDownload size={14} />
              Download CV
              <FiExternalLink size={11} style={{ opacity: 0.5 }} />
            </a>
          </motion.div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-3 mb-14">
          <StatCard value="2+" label="Years Learning" index={0} />
          <StatCard value="6+" label="Projects Built" index={1} />
          <StatCard value="9+" label="Technologies" index={2} />
        </div>

        {/* ── Experience Timeline ── */}
        <SectionDivider label="Experience" />

        <div className="mb-14">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4"
            >
              {/* Timeline gutter */}
              <div className="flex flex-col items-center pt-1">
                <div
                  className="w-3 h-3 rounded-full border-2 flex-shrink-0 z-10"
                  style={{
                    background: 'var(--bg)',
                    borderColor: 'var(--border-strong)',
                  }}
                />
                {i < experiences.length - 1 && (
                  <div className="w-px flex-1 min-h-[20px]" style={{ background: 'var(--border)' }} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <SpotlightCard className="p-5" style={{ transform: 'none' }}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                        {exp.year}
                      </span>
                      <h3 className="text-sm font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                        {exp.title}
                      </h3>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md flex-shrink-0"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      {exp.company}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {exp.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map(tag => (
                      <span key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Education ── */}
        <SectionDivider label="Education" />

        <div className="grid md:grid-cols-3 gap-3 mb-14">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <SpotlightCard className="p-5 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <FiBookOpen size={15} />
                  </div>
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: edu.status === 'Current' ? 'rgba(34,197,94,0.1)' : 'var(--bg-elevated)',
                      color: edu.status === 'Current' ? '#22c55e' : 'var(--text-muted)',
                      border: `1px solid ${edu.status === 'Current' ? 'rgba(34,197,94,0.2)' : 'var(--border)'}`,
                    }}
                  >
                    {edu.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{edu.title}</h3>
                <p className="text-[11px] mb-2" style={{ color: 'var(--text-muted)' }}>{edu.degree} · {edu.year}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{edu.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* ── Tech Focus ── */}
        <SectionDivider label="Tech Focus" />

        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {techFocus.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <SpotlightCard className="p-5 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    {group.icon}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <TechChip key={tech.name} name={tech.name} icon={tech.icon} />
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center py-10"
        >
          <div
            className="inline-block rounded-2xl p-8"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Interested working together?
            </p>
            <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
              Let's build something great.
            </p>
            <a
              href="https://drive.google.com/file/d/17U5rM7LZ62KEBwg-gJI1MCwtzYpj5Os2/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              <FiDownload size={14} />
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp,
} from 'react-icons/fa'
import {
  SiTailwindcss, SiExpress, SiVercel, SiSupabase, SiPostgresql, SiMysql, SiLaravel,
} from 'react-icons/si'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import { useLang } from '../context/LangContext'

const levelStyles = {
  Advanced: {
    borderColor: '#52525b',
    glow: 'rgba(255,255,255,0.08)',
    badgeBg: '#fafafa',
    badgeText: '#09090b',
    tagBorder: '#3f3f46',
  },
  Intermediate: {
    borderColor: '#3f3f46',
    glow: 'rgba(255,255,255,0.04)',
    badgeBg: '#27272a',
    badgeText: '#a1a1aa',
    tagBorder: '#27272a',
  },
  Beginner: {
    borderColor: '#27272a',
    glow: 'rgba(255,255,255,0.02)',
    badgeBg: '#1c1c1f',
    badgeText: '#636363',
    tagBorder: '#18181b',
  },
}

const featuredSkills = [
  {
    icon: <FaReact style={{ color: '#61dafb' }} />,
    name: 'React',
    category: 'Frontend',
    level: 'Advanced',
    desc: 'Building SPA dashboards, real-time apps, and interactive interfaces.',
    tags: ['Hooks', 'Router', 'State', 'Motion', 'API'],
  },
  {
    icon: <SiTailwindcss style={{ color: '#38bdf8' }} />,
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 'Advanced',
    desc: 'Rapid UI development with utility-first workflow and custom design systems.',
    tags: ['Utility-first', 'Responsive', 'Dark Mode', 'Custom Config'],
  },
]

const coreSkills = [
  {
    icon: <FaHtml5 style={{ color: '#e34f26' }} />,
    name: 'HTML',
    category: 'Frontend',
    level: 'Advanced',
    desc: 'Semantic markup, accessible structure, and SEO-optimized pages.',
    tags: ['Semantics', 'Accessibility', 'SEO'],
  },
  {
    icon: <FaCss3Alt style={{ color: '#264de4' }} />,
    name: 'CSS',
    category: 'Frontend',
    level: 'Advanced',
    desc: 'Responsive layouts, animations, and modern styling techniques.',
    tags: ['Flexbox', 'Grid', 'Animations'],
  },
  {
    icon: <FaJs style={{ color: '#f7df1e' }} />,
    name: 'JavaScript',
    category: 'Frontend',
    level: 'Intermediate',
    desc: 'ES6+ features, async patterns, and DOM manipulation.',
    tags: ['ES6+', 'Async/Await', 'DOM'],
  },
  {
    icon: <SiExpress style={{ color: '#ffffff' }} />,
    name: 'Express.js',
    category: 'Backend',
    level: 'Intermediate',
    desc: 'Building RESTful APIs and server-side middleware.',
    tags: ['REST API', 'Middleware', 'Routing'],
  },
  {
    icon: <FaNodeJs style={{ color: '#339933' }} />,
    name: 'Node.js',
    category: 'Backend',
    level: 'Intermediate',
    desc: 'Server-side JavaScript runtime for scalable applications.',
    tags: ['NPM', 'Modules', 'File System'],
  },
  {
    icon: <SiVercel />,
    name: 'Vercel',
    category: 'Deployment',
    level: 'Intermediate',
    desc: 'Continuous deployment and hosting for modern frontends.',
    tags: ['Deploy', 'CI/CD', 'Domains'],
  },
  {
    icon: <SiSupabase style={{ color: '#3ECF8E' }} />,
    name: 'Supabase',
    category: 'Backend',
    level: 'Intermediate',
    desc: 'Open-source Firebase alternative for real-time backends.',
    tags: ['Auth', 'Database', 'Realtime'],
  },
  {
    icon: <SiPostgresql style={{ color: '#336791' }} />,
    name: 'PostgreSQL',
    category: 'Database',
    level: 'Intermediate',
    desc: 'Relational databases with structured queries and relations.',
    tags: ['Queries', 'Relations', 'Indexing'],
  },
]

const supportingSkills = [
  {
    icon: <SiLaravel style={{ color: '#ff2d20' }} />,
    name: 'Laravel',
    category: 'Backend',
    level: 'Intermediate',
    desc: 'MVC-based web apps with Eloquent ORM and authentication.',
    tags: ['CRUD', 'Auth', 'MVC'],
  },
  {
    icon: <SiMysql style={{ color: '#f29111' }} />,
    name: 'MySQL',
    category: 'Database',
    level: 'Intermediate',
    desc: 'Database design, queries, and data relationships.',
    tags: ['Design', 'Queries', 'Joins'],
  },
  {
    icon: <FaPhp style={{ color: '#8892be' }} />,
    name: 'PHP',
    category: 'Backend',
    level: 'Beginner',
    desc: 'Server-side scripting for dynamic web pages.',
    tags: ['OOP', 'PDO', 'Sessions'],
  },
]

const sizes = {
  featured: {
    padding: '1.75rem',
    iconBox: '3.25rem',
    iconFont: '1.5rem',
    titleFont: '1.05rem',
    descFont: '0.8rem',
    badgeFont: '0.6rem',
    tagFont: '0.6rem',
    radius: '24px',
    gap: '5',
  },
  core: {
    padding: '1.35rem',
    iconBox: '2.6rem',
    iconFont: '1.2rem',
    titleFont: '0.9rem',
    descFont: '0.75rem',
    badgeFont: '0.55rem',
    tagFont: '0.55rem',
    radius: '22px',
    gap: '4',
  },
  supporting: {
    padding: '1.1rem',
    iconBox: '2.2rem',
    iconFont: '1rem',
    titleFont: '0.85rem',
    descFont: '0.7rem',
    badgeFont: '0.5rem',
    tagFont: '0.5rem',
    radius: '20px',
    gap: '3',
  },
}

function SkillCard({ skill, index, variant }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const ls = levelStyles[skill.level]
  const sz = sizes[variant]

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 50, y: 50 }) }}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden cursor-default"
      style={{
        borderRadius: sz.radius,
        background: 'var(--bg-card)',
        border: `1px solid ${isHovered ? ls.borderColor : '#2a2a2a'}`,
        boxShadow: isHovered
          ? `0 0 ${variant === 'featured' ? '60' : '40'}px ${ls.glow}, var(--shadow-md)`
          : 'var(--shadow-sm)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        padding: sz.padding,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          background: `radial-gradient(${variant === 'featured' ? '700px' : '500px'} circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
          borderRadius: sz.radius,
        }}
      />

      <div className="flex items-start justify-between mb-3 relative z-10">
        <div
          style={{
            width: sz.iconBox,
            height: sz.iconBox,
            borderRadius: '14px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: sz.iconFont,
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s, box-shadow 0.3s',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isHovered && variant === 'featured' ? '0 0 20px rgba(255,255,255,0.05)' : 'none',
          }}
        >
          {skill.icon}
        </div>
        <span
          style={{
            fontSize: sz.badgeFont,
            fontWeight: 600,
            padding: '2px 10px',
            borderRadius: '99px',
            background: ls.badgeBg,
            color: ls.badgeText,
            letterSpacing: '0.04em',
            border: `1px solid ${isHovered ? ls.borderColor : 'transparent'}`,
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            boxShadow: isHovered && skill.level === 'Advanced' ? '0 0 12px rgba(255,255,255,0.08)' : 'none',
          }}
        >
          {skill.level}
        </span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-0.5">
          <h3
            style={{
              fontSize: sz.titleFont,
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {skill.name}
          </h3>
          <span
            style={{
              fontSize: '0.5rem',
              fontWeight: 500,
              padding: '1px 7px',
              borderRadius: '99px',
              background: 'var(--bg-elevated)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: '1.4',
            }}
          >
            {skill.category}
          </span>
        </div>
        <p
          style={{
            fontSize: sz.descFont,
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            margin: '6px 0 12px',
          }}
        >
          {skill.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 relative z-10">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: sz.tagFont,
              fontWeight: 500,
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'var(--bg-elevated)',
              color: 'var(--text-muted)',
              border: `1px solid ${ls.tagBorder}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLang()

  return (
    <SectionWrapper id="skills" className="py-8 md:py-10 overflow-hidden">
      <div className="px-6 md:px-8">
        <SectionLabel number="02" label={t.nav.skills} heading={t.whatIWorkWith} />

        {/* Core Stack header */}
        <div className="mb-8">
          <h2 className="text-lg font-bold font-display" style={{ color: 'var(--text-primary)' }}>
            Core Stack
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Technologies I use to build modern web applications.
          </p>
        </div>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {featuredSkills.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} variant="featured" />
          ))}
        </div>

        {/* Core */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Core</span>
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {coreSkills.map((s, i) => (
              <SkillCard key={s.name} skill={s} index={i} variant="core" />
            ))}
          </div>
        </div>

        {/* Supporting */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Supporting</span>
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {supportingSkills.map((s, i) => (
              <SkillCard key={s.name} skill={s} index={i} variant="supporting" />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

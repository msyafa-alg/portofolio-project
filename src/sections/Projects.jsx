import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX, FiCode } from 'react-icons/fi'
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaPhp, FaNodeJs, FaPython } from 'react-icons/fa'
import { SiTailwindcss, SiLaravel, SiMysql, SiVercel, SiExpress, SiSupabase, SiPostgresql, SiFirebase, SiVite, SiFramer, SiReactrouter } from 'react-icons/si'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import { useLang } from '../context/LangContext'

const projects = [
  {
    id: 0, featured: true,
    image: 'https://files.catbox.moe/2cq8vo.png',
    title: 'AsefAI',
    desc: 'Aplikasi AI Chat berbasis web dengan Groq API. Mendukung real-time streaming response (SSE), Firebase Authentication, persistent chat history, conversation memory, multi-model AI, serta UI yang responsif.',
    stack: ['React', 'Firebase', 'Groq API'],
    demo: 'https://asefai.syafapnl.biz.id',
    repo: 'https://github.com/msyafa-alg/AiChat-GroqApi',
    details: [
      { label: 'Real-time Streaming', desc: 'Server-Sent Events (SSE) untuk streaming response AI secara real-time tanpa delay.' },
      { label: 'Firebase Auth', desc: 'Autentikasi pengguna dengan Firebase — login aman dan cepat.' },
      { label: 'Chat History', desc: 'Riwayat percakapan persistent — pengguna bisa lanjut chat dari sesi sebelumnya.' },
      { label: 'Multi-Model AI', desc: 'Dukungan multiple AI model via Groq API dengan pemilihan model dinamis.' },
      { label: 'Conversation Memory', desc: 'Memori percakapan agar konteks chat terjaga sepanjang sesi.' },
    ],
  },
  {
    id: 1, featured: true,
    image: 'https://files.catbox.moe/juz07w.png',
    title: 'Anonymous Chat',
    desc: 'Anonymous messaging web app via unique link — no login required. Send messages to anyone anonymously.',
    stack: ['React', 'JavaScript', 'Vercel'],
    demo: 'https://anonymchat.syafapersonalweb.my.id/a',
    repo: 'https://github.com/msyafa-alg/anonymchat',
    details: [
      { label: 'Unique Link', desc: 'Setiap chat room punya link unik — bagikan ke siapa saja untuk mulai ngobrol.' },
      { label: 'No Login Required', desc: 'Langsung pakai tanpa registrasi atau login — privasi terjaga.' },
      { label: 'Anonymous Identity', desc: 'Pengirim pesan tetap anonim, tidak ada data pribadi yang dikumpulkan.' },
      { label: 'Real-time Chat', desc: 'Pesan terkirim dan diterima secara real-time tanpa perlu refresh.' },
    ],
  },
  {
    id: 2, featured: true,
    image: 'https://files.catbox.moe/cyoawr.png',
    title: 'Lumine Beauty',
    desc: 'Modern makeup catalog with an e-commerce concept and product API integration.',
    stack: ['React', 'API Integration', 'Vercel'],
    demo: 'https://luminebeauty-project.vercel.app/',
    repo: 'https://github.com/msyafa-alg/luminebeauty',
    details: [
      { label: 'Product Catalog', desc: 'Katalog produk makeup modern dengan tampilan grid dan detail produk.' },
      { label: 'API Integration', desc: 'Data produk diambil dari external API — real-time dan dinamis.' },
      { label: 'E-commerce UI', desc: 'Tampilan toko online dengan keranjang, kategori, dan pencarian produk.' },
      { label: 'Responsive Design', desc: 'Tampilan optimal di semua perangkat — mobile, tablet, dan desktop.' },
    ],
  },
  {
    id: 3, featured: false,
    image: 'https://files.catbox.moe/za6llg.png',
    title: 'Syafa Store',
    desc: 'Pterodactyl panel store with integrated Atlantic payment gateway.',
    stack: ['React', 'Payment Gateway', 'Vercel'],
    demo: 'https://syafastoreofficial.vercel.app/',
    repo: 'https://github.com/msyafa-alg/syafastoreofficial',
    details: [
      { label: 'Product Listings', desc: 'Daftar produk Pterodactyl panel dengan harga dan deskripsi lengkap.' },
      { label: 'Payment Gateway', desc: 'Integrasi Atlantic payment gateway untuk pembayaran otomatis.' },
      { label: 'Pterodactyl Integration', desc: 'Terintegrasi dengan Pterodactyl panel untuk otomatisasi pengiriman layanan.' },
      { label: 'Automated Delivery', desc: 'Produk dikirim otomatis setelah pembayaran berhasil — tanpa campur tangan manual.' },
    ],
  },
  {
    id: 4, featured: false,
    image: 'https://files.catbox.moe/vzcod7.png',
    title: 'NovaHealth',
    desc: 'Static health calculator — BMI, calories, ideal weight, and carbon footprint tracker.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://novahealth-project.vercel.app',
    repo: 'https://github.com/msyafa-alg/NovaHealt',
    details: [
      { label: 'BMI Calculator', desc: 'Hitung Body Mass Index berdasarkan berat dan tinggi badan dengan kategori kesehatan.' },
      { label: 'Calorie Tracker', desc: 'Kalkulator kebutuhan kalori harian berdasarkan aktivitas dan target.' },
      { label: 'Ideal Weight', desc: 'Perhitungan berat badan ideal berdasarkan tinggi dan usia.' },
      { label: 'Carbon Footprint', desc: 'Tracker jejak karbon untuk meningkatkan kesadaran lingkungan.' },
    ],
  },
  {
    id: 5, featured: false,
    image: null,
    title: 'TIX ID Clone',
    desc: 'Cinema ticket booking system clone built with Laravel — MVC architecture practice.',
    stack: ['Laravel', 'PHP', 'MySQL'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/tixid',
    details: [
      { label: 'Movie Listings', desc: 'Daftar film tayang dengan jadwal, genre, dan sinopsis lengkap.' },
      { label: 'Ticket Booking', desc: 'Sistem pemesanan tiket dengan pemilihan kursi dan jadwal tayang.' },
      { label: 'MVC Architecture', desc: 'Dibangun dengan pola MVC Laravel — model, view, controller terstruktur.' },
      { label: 'Database Management', desc: 'Manajemen data film, jadwal, dan pemesanan dengan MySQL.' },
    ],
  },
  {
    id: 6, featured: false,
    image: 'https://files.catbox.moe/pejgfw.png',
    title: 'Music Chart',
    desc: 'Dynamic music chart app with live data rendering — frontend practice project.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/musicchart',
    details: [
      { label: 'Dynamic Charts', desc: 'Data chart musik yang di-render secara dinamis dengan JavaScript.' },
      { label: 'Live Data', desc: 'Pembaruan data secara real-time tanpa perlu refresh halaman.' },
      { label: 'Interactive UI', desc: 'Antarmuka interaktif dengan hover, klik, dan animasi transisi.' },
      { label: 'Music Ranking', desc: 'Menampilkan peringkat musik dengan posisi dan pergerakan chart.' },
    ],
  },
  {
    id: 7, featured: true,
    image: 'https://files.catbox.moe/l7z112.png',
    title: 'Wikrama 2',
    desc: 'Website Resmi Rayon SMK Wikrama Bogor — pusat informasi bagi siswa, alumni, dan masyarakat. Direktori siswa per angkatan, profil siswa, arsip alumni, galeri, berita, pengumuman real-time, data prestasi, live chat, serta panel admin.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Firebase', 'React Router', 'React PDF', 'XLSX'],
    demo: 'https://wikrama-2.vercel.app',
    repo: null,
    details: [
      { label: 'Student Directory', desc: 'Direktori siswa per angkatan dengan profil lengkap dan pencarian.' },
      { label: 'Alumni Archive', desc: 'Arsip alumni lengkap dengan data tahun lulus dan kontak.' },
      { label: 'Real-time News', desc: 'Berita dan pengumuman real-time dengan sistem publikasi terintegrasi.' },
      { label: 'Gallery & Media', desc: 'Galeri foto dan video kegiatan rayon.' },
      { label: 'Achievement Data', desc: 'Data prestasi siswa yang bisa di-filter berdasarkan kategori dan tahun.' },
      { label: 'Live Chat', desc: 'Fitur chat real-time untuk komunikasi internal rayon.' },
      { label: 'Admin Panel', desc: 'Panel admin untuk mengelola konten, pengguna, dan data rayon.' },
    ],
  },
  {
    id: 8, featured: true,
    image: '/images/courtsync.png',
    title: 'CourtSync',
    desc: 'Sistem reservasi lapangan secara online — booking lapangan olahraga dengan autentikasi, jadwal real-time, dan manajemen pemesanan berbasis web.',
    stack: ['React', 'Express', 'MySQL'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/frontend-sportbook',
    details: [
      { label: 'Online Booking', desc: 'Reservasi lapangan secara online dengan pemilihan tanggal dan jam.' },
      { label: 'User Auth', desc: 'Autentikasi pengguna untuk manajemen pemesanan pribadi.' },
      { label: 'Real-time Schedule', desc: 'Jadwal lapangan real-time — booking yang terisi langsung terlihat.' },
      { label: 'Booking Management', desc: 'Manajemen pemesanan — riwayat, pembatalan, dan konfirmasi booking.' },
      { label: 'Admin Dashboard', desc: 'Dashboard admin untuk mengelola lapangan, jadwal, dan pemesanan.' },
    ],
  },
  {
    id: 9, featured: true,
    image: '/images/fraptools.png',
    title: 'FrapPentest Ultra',
    desc: 'Enterprise web security auditing tool untuk penetration tester dan bug hunter — automated, modular, dan report-ready dengan 6 modul inti.',
    stack: ['Python', 'Async', 'Playwright', 'Security'],
    demo: null,
    repo: 'https://github.com/msyafa-alg/Frap-Pentest-Ultra',
    details: [
      { label: 'Async Crawler', desc: 'Crawl sampai 500 halaman secara paralel dengan aiohttp dan browser SPA crawling via Playwright (Chromium headless).' },
      { label: 'Subdomain Discovery', desc: 'DNS brute-force dengan wordlist 80+ subdomain umum, DNS enumeration, dan Certificate Transparency logs lookup.' },
      { label: 'Tech Fingerprinting', desc: 'Deteksi framework, CMS, WAF, server, dan infrastruktur dari HTML, headers, dan JS files dengan confidence score.' },
      { label: 'Vuln Scanner', desc: 'Test SQLi, XSS, CSRF, exposed API docs, dan GraphQL introspection dengan multiple payload dan severity grading.' },
      { label: 'Security Analyzer', desc: 'Audit 9 security header kritis dengan grading A-F, cookie security check (Secure, HttpOnly, SameSite), dan TLS/SSL analyzer.' },
      { label: 'Multi-format Report', desc: 'Hasil scan dalam 4 format sekaligus: HTML visual dark-theme, JSON machine-readable, CSV findings, dan TXT summary.' },
    ],
  },
]

/* ── Tech icon map ── */
const techIcons = {
  React: <FaReact style={{ color: '#61dafb' }} />,
  Firebase: <SiFirebase style={{ color: '#ffca28' }} />,
  JavaScript: <FaJs style={{ color: '#f7df1e' }} />,
  Vercel: <SiVercel style={{ color: '#ffffff' }} />,
  HTML: <FaHtml5 style={{ color: '#e34f26' }} />,
  CSS: <FaCss3Alt style={{ color: '#264de4' }} />,
  Laravel: <SiLaravel style={{ color: '#ff2d20' }} />,
  PHP: <FaPhp style={{ color: '#8892be' }} />,
  MySQL: <SiMysql style={{ color: '#f29111' }} />,
  Vite: <SiVite style={{ color: '#646cff' }} />,
  'Tailwind CSS': <SiTailwindcss style={{ color: '#38bdf8' }} />,
  'Framer Motion': <SiFramer style={{ color: '#ffffff' }} />,
  Supabase: <SiSupabase style={{ color: '#3ECF8E' }} />,
  'React Router': <SiReactrouter style={{ color: '#f44250' }} />,
  Express: <SiExpress style={{ color: '#cccccc' }} />,
  'Node.js': <FaNodeJs style={{ color: '#339933' }} />,
  PostgreSQL: <SiPostgresql style={{ color: '#336791' }} />,
  Python: <FaPython style={{ color: '#3776AB' }} />,
}

function TechIcons({ stack }) {
  const visible = stack.slice(0, 5)
  const extra = stack.length - 5
  return (
    <div className="flex items-center gap-1.5">
      {visible.map(t => (
        <span key={t} className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
          {techIcons[t] || <FiCode size={11} style={{ color: 'var(--text-muted)' }} />}
        </span>
      ))}
      {extra > 0 && (
        <span className="text-[10px] font-medium px-1.5" style={{ color: 'var(--text-muted)' }}>
          +{extra}
        </span>
      )}
    </div>
  )
}

/* ── Floating detail ── */
function ProjectDetail({ p, onClose }) {
  const { t } = useLang()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
        }}>
        <button onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
          <FiX size={14} />
        </button>

        {p.image && (
          <div className="relative w-full h-28 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <img src={p.image} alt={p.title}
              className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 30%)' }} />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
            </div>
            <div className="flex-shrink-0">
              <TechIcons stack={p.stack} />
            </div>
          </div>

          {p.details && (
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {p.details.map((d, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{d.label}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{d.desc}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                <FiExternalLink size={12} /> {t.liveDemo}
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--border)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-elevated)'; }}>
                <FiGithub size={12} /> {t.source}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}



/* ── Project card ── */
function ProjectCard({ p, index, onSelect }) {
  const { t } = useLang()
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onClick={() => onSelect(p)}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden cursor-pointer card-lift"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hov ? 'var(--border-hover)' : 'var(--border)'}`,
        boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}>
      <div className="relative h-52 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        {p.image && (
          <img src={p.image} alt={p.title}
            className="w-full h-full object-cover object-top transition-transform duration-700"
            style={{ transform: hov ? 'scale(1.06)' : 'scale(1)' }} />
        )}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 50%)' }} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center gap-2.5"
          style={{ background: hov ? 'rgba(0,0,0,0.35)' : 'transparent' }}>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--bg)' }}>
              <FiExternalLink size={11} /> {t.view}
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold backdrop-blur-md"
              style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}>
              <FiGithub size={11} /> {t.github}
            </a>
          )}
        </motion.div>
      </div>
      <div className="p-6">
        <p className="text-base font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
        <TechIcons stack={p.stack} />
      </div>
    </motion.div>
  )
}



export default function Projects() {
  const { t } = useLang()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (selected) {
      const el = document.querySelector('.flex-1.min-w-0.h-full')
      if (el) el.scrollTop = 0
    }
  }, [selected])

  return (
    <>
      <SectionWrapper id="projects" className="py-8 md:py-10">
        <div className="px-6 md:px-8">
          <SectionLabel number="04" label={t.nav.projects} heading={t.thingsIBuilt} />

          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} onSelect={setSelected} />)}
          </div>
        </div>
      </SectionWrapper>

      <AnimatePresence>
        {selected && <ProjectDetail p={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}

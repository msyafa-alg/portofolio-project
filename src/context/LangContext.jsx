import { createContext, useContext, useState, useEffect } from 'react'

const LangContext = createContext()

export const translations = {
  en: {
    // Sidebar
    search: 'Search...',
    theme: 'Theme',
    darkMode: 'Dark Mode',
    apps: 'Apps',
    nav: {
      home: 'Home', about: 'About', skills: 'Skills',
      education: 'Education', projects: 'Projects', contact: 'Contact',
      playground: 'JS Playground',
    },

    // Hero
    openToWork: 'Open To Work',
    bio: (name) => `IT student at ${name} focused on building clean, efficient, and modern web experiences. Passionate about frontend development and server infrastructure.`,
    featuredProjects: 'Featured Projects',
    seeAll: 'See all',
    clientsTitle: 'Clients & Partners',
    letsWork: "Let's work together",
    letsWorkSub: 'Open to internships, collaborations, and learning opportunities.',
    contactMe: 'Contact Me',
    more: 'More',

    // About
    whoIAm: 'Who I Am',
    aboutBio: [
      (smk) => <>I'm an IT student at <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{smk}</strong> with a strong focus on <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>web development</strong> and <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>server infrastructure</strong>.</>,
      () => <>My journey started with curiosity about how websites work — from front-end interfaces to the servers that power them. I enjoy building things that are both functional and well-structured.</>,
      () => <>Currently deepening my skills in modern web technologies, Linux server management, and VPS hosting — while continuously growing as a developer.</>,
    ],
    quote: '"Code is not just logic — it\'s craft."',
    stats: { projects: 'Projects', technologies: 'Technologies', track: 'IT Track', curiosity: 'Curiosity' },

    // Skills
    whatIWorkWith: 'What I Work With',
    technicalSkills: 'Technical Skills',
    softSkills: 'Soft Skills',
    soft: [
      { label: 'Problem Solving',    desc: 'Breaking complex issues into manageable steps'  },
      { label: 'Fast Learner',       desc: 'Quickly adapting to new tools and frameworks'   },
      { label: 'Team Collaboration', desc: 'Working effectively in group projects'          },
    ],

    // Education
    academicBackground: 'Academic Background',
    current: 'Current',
    completed: 'Completed',
    edu: [
      { desc: 'Studying IT at SMK Wikrama with focus on web development, networking, and software engineering. Actively building projects and exploring server management.', tags: ['Web Dev', 'Networking', 'RPL'] },
      { desc: 'Completed junior high at Pesantren Fathan Mubina. Alongside Islamic studies, developed early interest in computers and technology.', tags: ['Islamic Studies', 'Boarding School'] },
      { desc: 'Completed elementary school at SDIT Almadinah Cibinong, an Islamic integrated school. Foundation of character and love for learning.', tags: ['SDIT', 'Cibinong', 'Bogor'] },
    ],

    // Projects
    thingsIBuilt: "Things I've Built",
    liveDemo: 'Live Demo',
    source: 'Source',

    // Contact
    getInTouch: 'Get In Touch',
    getInTouchSub: 'Have a project in mind or just want to connect? Feel free to reach out.',
    reachMe: 'Reach me directly',
    available: 'Available',
    availableSub: (country) => <>Based in <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{country}</strong>. Open to internships, collaborations, and learning opportunities.</>,
    name: 'Name', email: 'Email', message: 'Message',
    namePlaceholder: 'Your name', emailPlaceholder: 'your@email.com', messagePlaceholder: "What's on your mind?",
    send: 'Send Message', sending: 'Sending...', sent: "✓ Message sent! I'll get back to you soon.",
    failed: 'Failed to send. Please try again.',
  },

  id: {
    // Sidebar
    search: 'Cari...',
    theme: 'Tema',
    darkMode: 'Mode Gelap',
    apps: 'Aplikasi',
    nav: {
      home: 'Beranda', about: 'Tentang', skills: 'Keahlian',
      education: 'Pendidikan', projects: 'Proyek', contact: 'Kontak',
      playground: 'JS Playground',
    },

    // Hero
    openToWork: 'Buka Peluang Kerja',
    bio: (name) => `Siswa IT di ${name} yang fokus membangun pengalaman web yang bersih, efisien, dan modern. Passionate di frontend development dan infrastruktur server.`,
    featuredProjects: 'Proyek Unggulan',
    seeAll: 'Lihat semua',
    clientsTitle: 'Klien & Mitra',
    letsWork: 'Ayo bekerja sama',
    letsWorkSub: 'Terbuka untuk magang, kolaborasi, dan peluang belajar.',
    contactMe: 'Hubungi Saya',
    more: 'Selengkapnya',

    // About
    whoIAm: 'Siapa Saya',
    aboutBio: [
      (smk) => <>Saya siswa IT di <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{smk}</strong> dengan fokus kuat pada <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>pengembangan web</strong> dan <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>infrastruktur server</strong>.</>,
      () => <>Perjalanan saya dimulai dari rasa ingin tahu tentang cara kerja website — dari antarmuka front-end hingga server yang mendukungnya. Saya suka membangun sesuatu yang fungsional dan terstruktur.</>,
      () => <>Saat ini memperdalam keahlian di teknologi web modern, manajemen server Linux, dan VPS hosting — sambil terus berkembang sebagai developer.</>,
    ],
    quote: '"Kode bukan sekadar logika — ini adalah seni."',
    stats: { projects: 'Proyek', technologies: 'Teknologi', track: 'Jalur IT', curiosity: 'Rasa Ingin Tahu' },

    // Skills
    whatIWorkWith: 'Yang Saya Gunakan',
    technicalSkills: 'Keahlian Teknis',
    softSkills: 'Soft Skills',
    soft: [
      { label: 'Pemecahan Masalah',  desc: 'Memecah masalah kompleks menjadi langkah yang terkelola' },
      { label: 'Cepat Belajar',      desc: 'Cepat beradaptasi dengan tools dan framework baru'       },
      { label: 'Kerja Tim',          desc: 'Bekerja efektif dalam proyek kelompok'                   },
    ],

    // Education
    academicBackground: 'Latar Belakang Akademik',
    current: 'Aktif',
    completed: 'Selesai',
    edu: [
      { desc: 'Mendalami IT di SMK Wikrama dengan fokus web development, jaringan, dan software engineering. Aktif membangun proyek dan mengeksplorasi manajemen server.', tags: ['Web Dev', 'Jaringan', 'RPL'] },
      { desc: 'Menempuh MTs di Pesantren Fathan Mubina. Selain ilmu agama, mulai tertarik dengan komputer dan teknologi yang mendorong memilih jalur IT.', tags: ['Studi Islam', 'Pesantren'] },
      { desc: 'Menempuh SD di SDIT Almadinah Cibinong, sekolah Islam terpadu. Fondasi awal pembentukan karakter dan semangat belajar.', tags: ['SDIT', 'Cibinong', 'Bogor'] },
    ],

    // Projects
    thingsIBuilt: 'Yang Pernah Saya Buat',
    liveDemo: 'Demo Langsung',
    source: 'Kode',

    // Contact
    getInTouch: 'Hubungi Saya',
    getInTouchSub: 'Punya proyek atau ingin terhubung? Jangan ragu untuk menghubungi.',
    reachMe: 'Hubungi langsung',
    available: 'Tersedia',
    availableSub: (country) => <>Berbasis di <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{country}</strong>. Terbuka untuk magang, kolaborasi, dan peluang belajar.</>,
    name: 'Nama', email: 'Email', message: 'Pesan',
    namePlaceholder: 'Nama kamu', emailPlaceholder: 'email@kamu.com', messagePlaceholder: 'Ada yang ingin disampaikan?',
    send: 'Kirim Pesan', sending: 'Mengirim...', sent: '✓ Pesan terkirim! Saya akan segera membalas.',
    failed: 'Gagal mengirim. Coba lagi.',
  },
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => { localStorage.setItem('lang', lang) }, [lang])

  const toggle = () => setLang(l => l === 'en' ? 'id' : 'en')
  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar        from './components/Sidebar'
import CustomCursor   from './components/CustomCursor'
import ParticleField  from './components/ParticleField'
import ShootingStars  from './components/ShootingStars'
import ScrollProgress from './components/ScrollProgress'
import BackToTop      from './components/BackToTop'
import Hero           from './sections/Hero'
import About          from './sections/About'
import Skills         from './sections/Skills'
import Education      from './sections/Education'
import Projects       from './sections/Projects'
import Contact        from './sections/Contact'
import Footer         from './sections/Footer'

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.25, ease: 'easeIn' } },
}

const pages = (setActivePage) => ({
  home:      <Hero setActivePage={setActivePage} />,
  about:     <About />,
  skills:    <Skills />,
  education: <Education />,
  projects:  <Projects />,
  contact:   <><Contact /><Footer /></>,
})

export default function App() {
  const [activePage, setActivePage] = useState('home')

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <ShootingStars />
      <ParticleField />

      {/* Dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-96 -left-96 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)' }} />
        <div className="absolute top-1/2 -right-96 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 60%)' }} />
      </div>

      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main content area */}
      <div className="relative z-10 lg:ml-60 min-h-screen flex flex-col">
        {/* Mobile top padding */}
        <div className="lg:hidden h-14" />

        {/* Page content with transition */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {pages(setActivePage)[activePage]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <BackToTop />
    </>
  )
}

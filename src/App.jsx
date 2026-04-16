import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar        from './components/Sidebar'
import CustomCursor   from './components/CustomCursor'
import ParticleField  from './components/ParticleField'
import ShootingStars  from './components/ShootingStars'
import ScrollProgress from './components/ScrollProgress'
import BackToTop      from './components/BackToTop'
import LoadingScreen  from './components/LoadingScreen'
import Hero           from './sections/Hero'
import About          from './sections/About'
import Skills         from './sections/Skills'
import Education      from './sections/Education'
import Projects       from './sections/Projects'
import Contact        from './sections/Contact'
import Footer         from './sections/Footer'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.18, ease: 'easeIn' } },
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
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <ShootingStars />
      <ParticleField />

      {/* Dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Ambient blobs — subtle monochrome */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-96 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 65%)' }} />
      </div>

      {/* ── Centered layout: sidebar + content side by side ── */}
      <div className="relative z-10 min-h-screen flex justify-center">

        {/* Max-width wrapper — centers the whole thing */}
        <div className="w-full max-w-[1100px] flex relative">

          {/* Sidebar — sticky left column */}
          <div className="hidden lg:block flex-shrink-0" style={{ width: '220px' }}>
            <div className="sticky top-0 h-screen">
              <Sidebar activePage={activePage} setActivePage={setActivePage} />
            </div>
          </div>

          {/* Main content — right column */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Mobile top padding */}
            <div className="lg:hidden h-12" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1"
              >
                {pages(setActivePage)[activePage]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile sidebar — rendered outside the centered wrapper so it overlays full screen */}
      <div className="lg:hidden">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </div>

      <BackToTop />
    </>
  )
}

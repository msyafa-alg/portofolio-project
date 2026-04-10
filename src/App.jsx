import Navbar         from './components/Navbar'
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

const Divider = () => (
  <div className="max-w-5xl mx-auto px-6">
    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />
  </div>
)

export default function App() {
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
        <div className="absolute -bottom-72 left-1/3 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 60%)' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Skills />
          <Divider />
          <Education />
          <Divider />
          <Projects />
          <Divider />
          <Contact />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </>
  )
}

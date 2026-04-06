import Navbar       from './components/Navbar'
import CustomCursor  from './components/CustomCursor'
import ParticleField from './components/ParticleField'
import Hero          from './sections/Hero'
import About         from './sections/About'
import Skills        from './sections/Skills'
import Education     from './sections/Education'
import Projects      from './sections/Projects'
import Contact       from './sections/Contact'
import Footer        from './sections/Footer'

export default function App() {
  return (
    <>
      {/* Custom cursor — hidden on touch devices via CSS */}
      <CustomCursor />

      {/* Floating particle network */}
      <ParticleField />

      {/* Dot grid background */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient glow blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[140px]" />
        <div className="absolute top-1/3 -right-60 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-500/4 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Education />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

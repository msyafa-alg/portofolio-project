// Main App — assembles all sections
import Navbar    from './components/Navbar'
import Hero      from './sections/Hero'
import About     from './sections/About'
import Skills    from './sections/Skills'
import Education from './sections/Education'
import Projects  from './sections/Projects'
import Contact   from './sections/Contact'
import Footer    from './sections/Footer'

export default function App() {
  return (
    <>
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
    </>
  )
}

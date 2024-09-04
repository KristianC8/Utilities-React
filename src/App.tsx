import { useRef } from 'react'
import './App.css'
import { Header } from './components/Header'
import { useIntObserver } from './hooks/useIntObserver'
import { AsideMenu } from './components/MobileMenu'
import { MobileMenuProvider } from './context/MobileMenuContext'
import { ExpandCard } from './components/ExpandCard'

function App() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const { activeSection } = useIntObserver(sectionsRef)

  return (
    <>
      <MobileMenuProvider>
        <Header />
        <main>
          <AsideMenu activeSection={activeSection} />
          <section className='section-utilities'>
            <section
              className='section-utility'
              id='section1'
              ref={(el) => (sectionsRef.current[0] = el)}
            >
              <ExpandCard />
            </section>
            <section
              className='section-utility'
              id='section2'
              ref={(el) => (sectionsRef.current[1] = el)}
            >
              Dos
            </section>
            <section
              className='section-utility'
              id='section3'
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              Tres
            </section>
            <section
              className='section-utility'
              id='section4'
              ref={(el) => (sectionsRef.current[3] = el)}
            >
              Cuatro
            </section>
          </section>
        </main>
      </MobileMenuProvider>
      <footer></footer>
    </>
  )
}

export default App

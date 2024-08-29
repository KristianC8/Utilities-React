import { useRef } from 'react'
import './App.css'
import { SortBy } from './components/SortBy'
import { Header } from './components/header'
import { useIntObserver } from './hooks/useIntObserver'
import { AsideMenu } from './components/MobileMenu'
import { MobileMenuProvider } from './context/MobileMenuContext'

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
              <SortBy />
            </section>
            <section
              className='section-utility'
              id='section2'
              ref={(el) => (sectionsRef.current[1] = el)}
            >
              <SortBy />
            </section>
            <section
              className='section-utility'
              id='section3'
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              <SortBy />
            </section>
          </section>
        </main>
      </MobileMenuProvider>
      <footer></footer>
    </>
  )
}

export default App

import { useRef } from 'react'
import './App.css'
import { Header } from './components/Header'
import { useIntObserver } from './hooks/useIntObserver'
import { AsideMenu } from './components/MobileMenu'
import { MobileMenuProvider } from './context/MobileMenuContext'
import { ExpandCard } from './components/ExpandCard'
import images from './mocks/images.json'
import imagesSlider from './mocks/imagesSlider.json'
import { SliderImages } from './components/SliderImages'
import { HambMenu1 } from './components/HambMenu1'
import { HambMenu2 } from './components/HambMenu2'

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
              <ExpandCard images={images} />
            </section>
            <section
              className='section-utility'
              id='section2'
              ref={(el) => (sectionsRef.current[1] = el)}
            >
              <SliderImages images={imagesSlider} />
            </section>
            <section
              className='section-utility'
              id='section3'
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              <div className='section-utility-center'>
                <div className='section-utility-HambMenus'>
                  <HambMenu1 />
                  <HambMenu2 />
                </div>
              </div>
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

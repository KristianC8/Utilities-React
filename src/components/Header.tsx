import { ReactIcon } from './icons/ReactIcon'
import { MobileMenu } from './MobileMenu'
import './Header.css'
import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js'
import { useEffect, useRef } from 'react'
// import { useMobileMenuCtx } from '../hooks/useMobileMenuCtx'

declare global {
  interface Window {
    ScrollTimeline: any // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

export const Header = () => {
  // const { isOpen } = useMobileMenuCtx()
  const progressBar = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (progressBar.current) {
      progressBar.current.animate(
        { width: ['0%', '100%'] },
        {
          timeline: new window.ScrollTimeline({
            source: document.documentElement
          })
        }
      )
    }
  }, [])
  return (
    <>
      <header
        className='header-main'
        // style={{
        //   borderRadius: `${isOpen ? '0' : '0 0 0.5rem 0.5rem'}`
        // }}
      >
        <div className='header-main-title'>
          <h1>Componentes React</h1>
          <ReactIcon />
        </div>
        <MobileMenu />
        <div className='header-progress' ref={progressBar}></div>
      </header>
    </>
  )
}

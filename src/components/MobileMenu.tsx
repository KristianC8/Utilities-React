import { useEffect } from 'react'
import { useMobileMenuCtx } from '../hooks/useMobileMenuCtx'
import './MobileMenu.css'

export const MobileMenu = () => {
  const { isOpen, setIsOpen } = useMobileMenuCtx()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button onClick={toggleMenu} className='mobile-menu'>
        <div className='mobile-menu-icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M3 3h18M3 12h18M3 21h18'}
            />
          </svg>
        </div>
      </button>
    </>
  )
}

interface AsideMenuProps {
  activeSection: string | null
}

// eslint-disable-next-line react/prop-types
export const AsideMenu: React.FC<AsideMenuProps> = ({ activeSection }) => {
  const { isOpen, setIsOpen } = useMobileMenuCtx()
  const listMenu = [
    {
      id: 1,
      option: '1. Expand Card'
    },
    {
      id: 2,
      option: '2. Infinite Slider'
    },
    {
      id: 3,
      option: '3'
    },
    {
      id: 4,
      option: '4'
    }
  ]
  const handleClickLi = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    const breakpoint = window.matchMedia('(width <= 1000px)')

    const responsive = (event: MediaQueryListEvent) => {
      if (event.matches) {
        // setIsOpen(false)
      } else {
        setIsOpen(false)
      }
    }

    breakpoint.addEventListener('change', responsive)
    responsive(breakpoint as unknown as MediaQueryListEvent)
  }, [])
  return (
    <aside className={`aside-utilities ${isOpen ? 'isOpen' : ''}`}>
      <nav>
        <ul className='list-utilities'>
          {listMenu.map((option) => (
            <li
              key={option.id}
              onClick={handleClickLi}
              className={`opt-utilities ${activeSection === `section${option.id}` ? 'active' : ''}`}
            >
              <a href={`#section${option.id}`}>{option.option}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

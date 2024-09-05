import { ReactIcon } from './icons/ReactIcon'
import { MobileMenu } from './MobileMenu'
import './Header.css'
import { useMobileMenuCtx } from '../hooks/useMobileMenuCtx'

export const Header = () => {
  const { isOpen } = useMobileMenuCtx()
  return (
    <header
      className='header-main'
      style={{
        borderRadius: `${isOpen ? '0' : '0 0 0.5rem 0.5rem'}`
      }}
    >
      <div className='header-main-title'>
        <h1>Componentes React</h1>
        <ReactIcon />
      </div>
      <MobileMenu />
    </header>
  )
}

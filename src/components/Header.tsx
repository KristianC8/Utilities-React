import { ReactIcon } from './icons/ReactIcon'
import { MobileMenu } from './MobileMenu'
import './Header.css'

export const Header = () => {
  return (
    <header className='header-main'>
      <div className='header-main-title'>
        <h1>Utilities React</h1>
        <ReactIcon />
      </div>
      <MobileMenu />
    </header>
  )
}

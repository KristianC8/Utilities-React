import { useContext } from 'react'
import { MobileMenuContext } from '../context/MobileMenuContext'

export const useMobileMenuCtx = () => {
  const contextMobileMenu = useContext(MobileMenuContext)
  if (contextMobileMenu === undefined) {
    throw new Error('useMobileMenuCtx must be used within a MyProvider')
  }
  return contextMobileMenu
}

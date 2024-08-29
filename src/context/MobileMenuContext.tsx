import { createContext, ReactNode, useState } from 'react'

// Define el tipo para el estado del contexto
interface MyContextType {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MobileMenuContext = createContext<MyContextType | undefined>(
  undefined
)

interface MyProviderProps {
  children: ReactNode
}

// eslint-disable-next-line react/prop-types
export const MobileMenuProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const contextValue: MyContextType = {
    isOpen,
    setIsOpen
  }
  return (
    <MobileMenuContext.Provider value={contextValue}>
      {children}
    </MobileMenuContext.Provider>
  )
}

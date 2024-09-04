import { useState, useEffect } from 'react'

export const useResponsive = (mediaQuery: string) => {
  const [isFulfilled, setIsFulfilled] = useState<boolean | null>(null)

  useEffect(() => {
    const breakpoint = window.matchMedia(mediaQuery)

    const responsive = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsFulfilled(true)
      } else {
        setIsFulfilled(false)
      }
    }

    breakpoint.addEventListener('change', responsive)
    responsive(breakpoint as unknown as MediaQueryListEvent)
  }, [])

  return { isFulfilled }
}

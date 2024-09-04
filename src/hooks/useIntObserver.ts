import { useState, useEffect, RefObject } from 'react'

export const useIntObserver = (
  sectionsRef: RefObject<(HTMLElement | null)[]>
) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const fnCallBack = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(fnCallBack, {
      root: null,
      rootMargin: '0px',
      threshold: [0.35, 0.85]
    })

    if (sectionsRef.current)
      sectionsRef.current.forEach((section) => {
        if (section) observer.observe(section)
      })

    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) observer.unobserve(section)
        })
      }
    }
  }, [])

  return { activeSection }
}

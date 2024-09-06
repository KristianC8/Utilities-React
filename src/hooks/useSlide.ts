import { useState, useRef, useEffect } from 'react'

interface Images {
  id: number
  text: string
  url: string
}

export const useSlide = (images: Images[]) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const sliderBig = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const startXRef = useRef<number>(0)
  const currentXRef = useRef<number>(0)

  const clonedImages = [
    images[images.length - 1], // Última imagen clonada al inicio
    ...images,
    images[0] // Primera imagen clonada al final
  ]
  const totalImages = clonedImages.length

  //   const setSlideCurrent = (num: number) => {
  //     setCurrentSlide(num)
  //   }

  const handleStart = (clientX: number) => {
    startXRef.current = clientX
    isDraggingRef.current = true
  }

  const handleMove = (clientX: number) => {
    if (!isDraggingRef.current) return
    currentXRef.current = clientX
  }

  const handleEnd = () => {
    if (!isDraggingRef.current) return
    const deltaX = startXRef.current - currentXRef.current

    if (deltaX > 50 && currentXRef.current !== 0) {
      //tranlate - <--
      if (isTransitioning) return // No permitir clics durante la transición
      setIsTransitioning(true)
      setCurrentSlide((prev) => prev + 1)
      //   setCurrentSlide((prev) => (prev + 1) % totalImages)
    } else if (deltaX < -50) {
      if (isTransitioning) return // No permitir clics durante la transición
      setIsTransitioning(true)
      //   setCurrentSlide((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
      setCurrentSlide((prev) => prev - 1)
      //translate + -->
    }
    isDraggingRef.current = false
    startXRef.current = 0
    currentXRef.current = 0
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX)
  }

  const handleMouseUp = () => handleEnd()
  const handleTouchEnd = () => handleEnd()

  const handleTransitionEnd = () => {
    // Detectar si se está en la primera o última imagen clonada
    if (currentSlide === 0) {
      // Desactivar la transición para saltar a la última imagen real
      setIsTransitioning(false) // Evitar que se detecte la transición
      setCurrentSlide(images.length) // Salta a la última imagen real sin transición
    } else if (currentSlide === clonedImages.length - 1) {
      // Desactivar la transición para saltar a la primera imagen real
      setIsTransitioning(false) // Evitar que se detecte la transición
      setCurrentSlide(1) // Salta a la primera imagen real sin transición
    } else {
      setIsTransitioning(false) // Finaliza la transición normal
    }
  }

  const handleClickBtn = (id: number) => {
    setCurrentSlide(id)
  }

  //   useEffect(() => {
  //     const handleMouseUp = () => handleEnd()
  //     const handleTouchEnd = () => handleEnd()

  //     window.addEventListener('mouseup', handleMouseUp)
  //     window.addEventListener('touchend', handleTouchEnd)

  //     return () => {
  //       window.removeEventListener('mouseup', handleMouseUp)
  //       window.removeEventListener('touchend', handleTouchEnd)
  //     }
  //   }, [])

  useEffect(() => {
    if (sliderBig.current) {
      if (isTransitioning) {
        sliderBig.current.style.transition = 'transform 0.6s ease'
      } else {
        sliderBig.current.style.transition = 'all 0.3s ease-in-out'
        sliderBig.current.style.transitionProperty = 'opacity, background-color' // Desactiva la transición si no está activa
      }
    }
  }, [isTransitioning])

  useEffect(() => {
    if (sliderBig.current)
      sliderBig.current.style.transform = `translateX(calc(((100% / ${totalImages}) * ${currentSlide}) * -1))`
  }, [currentSlide])

  return {
    currentSlide,
    sliderBig,
    clonedImages,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleClickBtn,
    handleTransitionEnd
  }
}

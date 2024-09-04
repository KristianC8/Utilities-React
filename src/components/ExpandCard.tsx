import { useState, useRef, useEffect } from 'react'
import './ExpandCard.css'
import { useResponsive } from '../hooks/useResponsive'

export const ExpandCard = () => {
  interface MyObject {
    id: number
    text: string
    url: string
  }
  const [isActive, setIsActive] = useState<number>(0)
  const { isFulfilled } = useResponsive('(width <= 900px)')
  const expandBig = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const startXRef = useRef<number>(0)
  const currentXRef = useRef<number>(0)

  const images: MyObject[] = [
    {
      id: 0,
      text: 'Discover the world',
      url: '/img/Machu.jpg'
    },
    {
      id: 1,
      text: 'Forest',
      url: '/img/Forest.jpg'
    },
    {
      id: 2,
      text: 'Beach',
      url: '/img/Beach.jpg'
    },
    {
      id: 3,
      text: 'City',
      url: '/img/City.jpg'
    },
    {
      id: 4,
      text: 'Mountains - Clouds',
      url: '/img/Mountains.jpg'
    }
  ]

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
      setIsActive((prev) => (prev + 1) % images.length)
    } else if (deltaX < -50) {
      setIsActive((prev) => (prev === 0 ? images.length - 1 : prev - 1))
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

  useEffect(() => {
    const handleMouseUp = () => handleEnd()
    const handleTouchEnd = () => handleEnd()
    if (isFulfilled) {
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchend', handleTouchEnd)
    } else if (!isFulfilled) {
      return () => {
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isFulfilled])

  useEffect(() => {
    if (!isFulfilled) {
      if (expandBig.current) expandBig.current.style.transform = `translateX(0)`
    } else if (expandBig.current)
      expandBig.current.style.transform = `translateX(calc(((100% / ${images.length}) * ${isActive}) * -1))`
  }, [isFulfilled, isActive])

  const handleClickImg = (id: number) => {
    setIsActive(id)
  }

  const handleClickBtn = (id: number) => {
    setIsActive(id)
    if (expandBig.current) {
      expandBig.current.style.transform = `translateX(calc(((100% / ${images.length}) * ${id}) * -1))`
    }
  }

  return (
    <div className='expand-container'>
      <div
        className='expand-big'
        style={{
          width: `${isFulfilled ? `calc(100% * ${images.length})` : '100%'} `
        }}
        ref={expandBig}
      >
        {images.map((image) => (
          <div
            key={image.id}
            onClick={!isFulfilled ? () => handleClickImg(image.id) : undefined}
            onMouseDown={!isFulfilled ? undefined : handleMouseDown}
            onMouseMove={!isFulfilled ? undefined : handleMouseMove}
            onTouchStart={!isFulfilled ? undefined : handleTouchStart}
            onTouchMove={!isFulfilled ? undefined : handleTouchMove}
            className={`expand-panel ${isActive === image.id ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image.url})`,
              // width: `${isFulfilled ? `calc(100% / ${images.length} - 1em)` : ''}`
              width: `${isFulfilled ? `calc(100% / ${images.length})` : ''}`
            }}
          >
            <h3>{image.text}</h3>
          </div>
        ))}
      </div>
      {isFulfilled && (
        <div className='expand-buttons'>
          {images.map((image) => (
            <div
              key={image.id}
              className={`expand-btn ${isActive === image.id ? 'active' : ''}`}
              onClick={() => handleClickBtn(image.id)}
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}

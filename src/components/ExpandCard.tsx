import { useState, useRef, useEffect } from 'react'
import './ExpandCard.css'
import { useResponsive } from '../hooks/useResponsive'

export const ExpandCard = () => {
  interface MyObject {
    id: number
    text: string
    url: string
  }
  const [isActive, setIsActive] = useState<number | null>(0)
  const { isFulfilled } = useResponsive('(width <= 900px)')
  const expandBig = useRef<HTMLDivElement>(null)

  const images: MyObject[] = [
    {
      id: 0,
      text: 'Explore the world',
      url: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 1,
      text: 'Wild Forest',
      url: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      text: 'Sunny Beach',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80'
    },
    {
      id: 3,
      text: 'City on Winter',
      url: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'
    },
    {
      id: 4,
      text: 'Mountains - Clouds',
      url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    }
  ]

  useEffect(() => {
    if (!isFulfilled) {
      if (expandBig.current) expandBig.current.style.transform = `translateX(0)`
    } else if (expandBig.current)
      expandBig.current.style.transform = `translateX(calc(((100% / ${images.length}) * ${isActive}) * -1))`
  }, [isFulfilled])

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
            className={`expand-panel ${isActive === image.id ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image.url})`,
              width: `${isFulfilled ? `calc(100% / ${images.length} - 1em)` : ''}`
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

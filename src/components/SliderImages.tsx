/* eslint-disable react/prop-types */
import './SliderImages.css'
import { useSlide } from '../hooks/useSlide'

interface Images {
  id: number
  text: string
  url: string
}

interface ImagesListProps {
  images: Images[]
}

export const SliderImages: React.FC<ImagesListProps> = ({ images }) => {
  const {
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
  } = useSlide(images)
  const totalImages = clonedImages.length

  return (
    <div className='slider-container'>
      <div
        className='slider-big'
        style={{
          width: `calc(100% * ${totalImages})`
        }}
        ref={sliderBig}
        onTransitionEnd={handleTransitionEnd}
      >
        {clonedImages.map((image, ind) => (
          <div
            key={ind}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`slider-panel ${currentSlide === 0 ? '' : currentSlide === clonedImages.length ? '' : currentSlide === image.id ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image.url})`,
              width: `calc((100% / ${totalImages}) - 1rem)`
            }}
          >
            <h3>{image.text}</h3>
          </div>
        ))}
      </div>
      <div className='slider-buttons'>
        {images.map((image) => (
          <div
            key={image.id}
            className={`slider-btn ${currentSlide === image.id ? 'active' : ''}`}
            onClick={() => handleClickBtn(image.id)}
          ></div>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import './Carousel.css'

interface CarouselProps {
  images: string[]
  interval?: number
}

function Carousel({ images, interval = 6000 }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const hasMultiple = images.length > 1

  useEffect(() => {
    if (!hasMultiple || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length)
    }, interval)

    return () => clearTimeout(id)
  }, [index, paused, hasMultiple, images.length, interval])

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={`carousel-img ${i === index ? 'active' : ''}`}
        />
      ))}

      {hasMultiple && (
        <div className="carousel-dots">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`carousel-dot ${i === index ? 'active' : ''}`}
              aria-label={`Ir a imagen ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel

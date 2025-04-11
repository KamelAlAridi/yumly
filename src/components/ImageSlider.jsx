import React, { useEffect, useState } from "react";
import styles from "./imageSlider.module.css";

const ImageSlider = ({ slides, slideInterval = 3000, onSlideClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, slideInterval);
    return () => clearInterval(interval);
  }, [slides.length, slideInterval]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={styles.bigContainer}>
      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderWrapper}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              className={styles.slide}
              key={index}
              onClick={() => onSlideClick(index)}
            >
              <img
                src={slide.url}
                alt={slide.alt || `Slide ${index}`}
                className={styles.slideImage}
              />
              {slide.caption && (
                <div className={styles.slideCaption}>{slide.caption}</div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.dotsContainer}>
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              className={`${styles.dot} ${
                slideIndex === currentIndex ? styles.dotActive : ""
              }`}
              onClick={() => goToSlide(slideIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;

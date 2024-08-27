import { useCallback, useEffect, useRef, useState } from "react";
import ChevronLeft from "../svg/ChevronLeft";
import ChevronRight from "../svg/ChevronRight";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setDimensions({
          width: containerWidth,
          height: containerWidth, // Making it square
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const goToPrevious = useCallback(() => {
    if (images.length > 1 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [images.length, currentIndex]);

  const goToNext = useCallback(() => {
    if (images.length > 1 && currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [images.length, currentIndex]);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(translateX) > dimensions.width / 3) {
      if (translateX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    setTranslateX(0);
  };

  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500">No images to display</div>
    );
  }

  return (
    <div className="relative w-full mx-auto" ref={containerRef}>
      <div
        className="overflow-hidden rounded-lg"
        style={{
          width: "100%",
          height: dimensions.height,
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            width: `${images.length * 100}%`,
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="bg-light-grey flex justify-center items-center transition-transform duration-300 ease-in-out h-full w-full"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
              }}
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="max-w-full max-h-full object-contain"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                } shadow-md`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

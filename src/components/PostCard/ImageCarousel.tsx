import { useCallback, useEffect, useRef, useState } from "react";
import ChevronLeft from "@/components/svg/ChevronLeft";
import ChevronRight from "@/components/svg/ChevronRight";
import CloseIcon from "@/components/svg/CloseIcon";

type ImageCarouselProps = {
  images: string[];
  readonly?: boolean;
};

export default function ImageCarousel({
  images,
  readonly,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullScreen]);

  const goToPrevious = useCallback(() => {
    if (images.length > 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  }, [images.length]);

  const goToNext = useCallback(() => {
    if (images.length > 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [images.length]);

  const handleImageClick = () => {
    if (readonly) return;
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <>
      <div
        className="relative w-full mx-auto mb-4 max-h-[620px] min-h-[300px]"
        ref={containerRef}
      >
        <div className="overflow-hidden rounded-lg w-full h-full">
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              width: `${images.length * 100}%`,
            }}
          >
            {images.map((src, index) => (
              <div
                key={src + index}
                className="bg-grey flex justify-center items-center transition-transform duration-300 ease-in-out h-full w-full"
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}%))`,
                }}
              >
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className={`w-full h-full object-cover ${readonly ? "" : "cursor-pointer"}`}
                  draggable="false"
                  onClick={handleImageClick}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300  ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-gray-400"
                  } shadow-md`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
              aria-label="Close full screen"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
            <div
              className="w-full h-full flex items-center justify-center"
              onClick={closeFullScreen}
            >
              <img
                src={images[currentIndex]}
                alt={`Full screen image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 
                  rounded-full hover:bg-opacity-10 transition-all duration-300"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-white scale-125"
                          : "bg-gray-400"
                      } shadow-md`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

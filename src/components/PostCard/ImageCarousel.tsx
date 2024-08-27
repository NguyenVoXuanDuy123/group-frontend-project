import React, { useEffect, useState } from "react";
import ChevronLeft from "../svg/ChevronLeft";
import ChevronRight from "../svg/ChevronRight";
import CloseIcon from "../svg/CloseIcon";

type CarouselProps = {
  images: string[];
};

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  const handlePrevClick = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    // prevent scrolling when user clicks on the image to view it in full screen
    if (isFullScreen) {
      document.body.classList.add("hide-scrollbar");
    } else {
      document.body.classList.remove("hide-scrollbar");
    }

    // Cleanup when the modal is unmounted or when the modal is closed
    return () => {
      document.body.classList.remove("hide-scrollbar");
    };
  }, [isFullScreen]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {/* Images Display */}
        {images.length === 1 ? (
          <img
            onClick={handleImageClick}
            className="w-full h-full object-contain cursor-pointer"
            src={images[0]}
            alt={`Image 1`}
          />
        ) : (
          images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 cursor-pointer ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}>
              <img
                onClick={handleImageClick}
                className="w-full h-auto object-contain"
                src={src}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))
        )}
      </div>

      {/* Indicators */}
      {images.length > 1 && (
        <ol className="absolute bottom-4 left-1/2  transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <li
              key={index}
              className={`h-1 w-8 rounded-full cursor-pointer ${
                index === activeIndex ? "bg-white" : "bg-black/90"
              }`}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </ol>
      )}

      {/* Navigation Buttons */}
      {activeIndex > 0 && (
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
          onClick={handlePrevClick}
          aria-label="Previous Slide">
          <ChevronLeft />
        </button>
      )}

      {activeIndex < images.length - 1 && (
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1  "
          onClick={handleNextClick}
          aria-label="Next Slide">
          <ChevronRight />
        </button>
      )}

      {/* Full-Screen Modal */}
      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleCloseFullScreen}>
          <img
            src={images[activeIndex]}
            alt={`Slide ${activeIndex + 1} Full Screen`}
            className="w-auto h-full max-w-full max-h-full z-[1000]"
          />
          <button
            className="absolute top-4 right-4 bg-white bg-opacity-50 rounded-full p-2"
            onClick={handleCloseFullScreen}
            aria-label="Close Full Screen">
            <CloseIcon color="#000000aa" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

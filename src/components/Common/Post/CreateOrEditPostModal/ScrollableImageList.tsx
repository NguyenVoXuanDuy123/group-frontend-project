import React, { useCallback, useEffect, useRef, useState } from "react";
import CloseIcon from "../../../svg/CloseIcon";

type ScrollableImageListProps = {
  images: string[];
  deleteImage: (index: number) => void;
};

const ScrollableImageList = ({
  images,
  deleteImage,
}: ScrollableImageListProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  //   const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      setIsDragging(true);
      setStartX("touches" in e ? e.touches[0].pageX : e.pageX);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const currentX = "touches" in e ? e.touches[0].pageX : e.pageX;
      const diff = startX - currentX;
      containerRef.current.scrollLeft += diff;
      setStartX(currentX);
    },
    [isDragging, startX]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => handleDrag(e);
    const handleTouchMove = (e: TouchEvent) => handleDrag(e);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDrag, handleDragEnd]);

  const handleDelete = (indexToDelete: number) => {
    deleteImage(indexToDelete);
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="flex w-full pb-1 space-x-2 overflow-x-scroll hide-scrollbar cursor-grab active:cursor-grabbing mb-4"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {images.map((src, index) => (
          <div
            key={src + index}
            className="flex-shrink-0 relative rounded-lg overflow-hidden"
            onDragStart={(e) => e.preventDefault()}
          >
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-auto h-[200px] object-cover select-none"
            />
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}
            >
              <CloseIcon width={20} height={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// // CSS to hide scrollbar
// const style = document.createElement("style");
// style.textContent = `
//   .scrollbar-hide::-webkit-scrollbar {
//     display: none;
//   }
//   .scrollbar-hide {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
// `;
// document.head.appendChild(style);

export default ScrollableImageList;

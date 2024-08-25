import React, { useRef, useState } from "react";

interface ImageInputProps {
  onImageSelect: (file: File) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [scrolled, setScrolled] = useState<boolean>(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -1000,
        behavior: "smooth",
      });
      setScrolled(false);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 1000,
        behavior: "smooth",
      });
      setScrolled(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImage(reader.result as string);
        setImages([...images, reader.result as string]);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImage(reader.result as string);
        setImages([...images, reader.result as string]);

        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please drop an image file.");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click when the div is clicked
  };

  const handleClear = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (images[index] === currentImage) setCurrentImage(null);
  };

  return (
    <div className="relative mt-4 w-full mx-auto rounded-lg text-dark-grey text-center">
      <div className="flex mb-4">
        <div className="relative flex w-full items-center">
          {images.length > 0 && scrolled && (
            <button
              className="absolute left-0 z-10 bg-gray-500 text-white rounded-full p-2 ml-2 hover:bg-gray-600"
              onClick={scrollLeft}
            >
              &lt;
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden space-x-2 scrollbar-hide w-full"
            style={{ scrollBehavior: "smooth" }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 relative ">
                <img
                  src={image}
                  alt={`Selected ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  className="absolute top-2 right-2"
                  onClick={() => handleClear(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>

          {images.length > 4 && !scrolled && (
            <button
              className="absolute right-0 z-10 bg-gray-500 text-white rounded-full p-2 mr-2 hover:bg-gray-600"
              onClick={scrollRight}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
      <div
        className="flex flex-col cursor-pointer items-center justify-center h-40 bg-light-grey rounded-lg border-2 border-dashed border-gray-500"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center">
          + <p className="font-semibold">Add photos</p>
          <p className="text-sm text-gray-400">or drag and drop</p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageInput;

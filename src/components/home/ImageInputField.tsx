import React, { useState } from "react";

interface ImageInputProps {
  onImageSelect: (file: File) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

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
      alert("Please select an image or video file.");
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
      alert("Please drop an image or video file.");
    }
  };

  const handleClear = (index: number) => {
    if (images[index] === currentImage) setCurrentImage(null);

    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="relative w-full mt-4 rounded-lg text-dark-grey text-center">
      <div className="flex ">
        {images?.map((image, index) => (
          <div className="relative">
            <img
              src={image}
              className="h-32 max-w-24 object-cover"
              height={100}
            />
            {currentImage && (
              <button
                className="absolute top-2 right-2 text-gray-300 hover:text-white"
                onClick={() => handleClear(index)}
              >
                x
              </button>
            )}
          </div>
        ))}
      </div>

      <div
        className="flex flex-col items-center justify-center h-40 bg-light-grey rounded-lg border-2 border-dashed border-gray-500"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <p>+</p>
          <p className="font-semibold">Add photos/videos</p>
          <p className="text-sm text-gray-400">or drag and drop</p>
        </div>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageInput;

import React, { useState } from "react";

interface ImageInputProps {
  onImageSelect: (file: File) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.startsWith("image/"))) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
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
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please drop an image or video file.");
    }
  };

  const handleClear = () => {
    setImage(null);
  };

  return (
    <div className="relative w-full mt-4 rounded-lg text-dark-grey text-center">
      <div
        className="flex flex-col items-center justify-center h-40 bg-light-grey rounded-lg border-2 border-dashed border-gray-500"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {image ? (
          <img src={image} alt="Selected" className="w-full h-full object-contain rounded-lg" />
        ) : (
          <div className="flex flex-col items-center">
            {/* <FaPlus className="text-3xl mb-4" /> */}
            <p>+</p>
            <p className="font-semibold">Add photos/videos</p>
            <p className="text-sm text-gray-400">or drag and drop</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {image && (
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
          onClick={handleClear}
        >
          {/* <FaTimes className="text-xl" /> */}
          x
        </button>
      )}
    </div>
  );
};

export default ImageInput;

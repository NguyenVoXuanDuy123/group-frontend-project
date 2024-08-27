import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PlusIcon from "../svg/PlusIcon";
import ChevronLeft from "../svg/ChevronLeft";
import ChevronRight from "../svg/ChevronRight";
import { setToast } from "@/redux/slices/toastSlice";
import { uploadImage } from "@/helpers/uploadImage";
import CloseIcon from "../svg/CloseIcon";

interface ImageInputProps {
  images: string[];
  updateImages: (images: string[]) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  images,
  updateImages,
}: ImageInputProps) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (images.length == 5) {
      dispatch(
        setToast({
          type: "error",
          message: "You can only upload 5 images at a time",
        })
      );
      return;
    }
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("image", file);

      const { url } = await uploadImage(
        "/api/upload",
        "POST",
        dispatch,
        formData
      );
      updateImages([...images, url!]);
    } else {
      alert("Please select an image file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (images.length == 5) {
      dispatch(
        setToast({
          type: "error",
          message: "You can only upload 5 images at a time",
        })
      );
      return;
    }
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        updateImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please drop an image file.");
    }
  };

  const handleClick = () => {
    if (images.length == 5) {
      dispatch(
        setToast({
          type: "error",
          message: "You can only upload 5 images at a time",
        })
      );
      return;
    }
    fileInputRef.current?.click(); // Trigger the file input click when the div is clicked
  };

  const handleClear = (index: number) => {
    updateImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="w-[680px] relative mt-4 mx-auto rounded-lg text-dark-grey text-center">
      {images.length > 0 && (
        <div className="mb-4 relative flex items-center">
          <div
            ref={scrollContainerRef}
            className="flex flex-1 overflow-x-hidden space-x-2 scrollbar-hide "
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
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear(index);
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>

          {images.length > 0 && scrolled && (
            <button
              className="absolute left-2 z-10 bg-light-grey text-white rounded-full p-2 ml-2 hover:bg-grey"
              onClick={scrollLeft}
            >
              <ChevronLeft />
            </button>
          )}

          {images.length >= 4 && !scrolled && (
            <button
              className="absolute right-2 z-10 bg-light-grey text-white rounded-full p-2 ml-2 hover:bg-grey"
              onClick={scrollRight}
            >
              <ChevronRight />
            </button>
          )}
        </div>
      )}
      <div
        className="flex flex-col cursor-pointer items-center justify-center h-40 bg-light-grey rounded-lg border-2 border-dashed border-grey"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center">
          <PlusIcon />
          <span className="my-2 font-bold">Add photos</span>
          <span className="text-sm text-dark-grey">or drag and drop</span>
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

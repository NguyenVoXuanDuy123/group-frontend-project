import PlusIcon from "@/components/svg/PlusIcon";
import { uploadImage } from "@/helpers/uploadImage";
import { setToast } from "@/redux/slices/toastSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import ScrollableImageList from "@/components/Common/Post/CreateOrEditPostModal/ScrollableImageList";

type ImageInputProps = {
  images: string[];
  updateImages: (images: string[]) => void;
};

const ImageInput = React.memo(({ images, updateImages }: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("run");

    if (images.length == 10) {
      dispatch(
        setToast({
          type: "error",
          message: "You can only upload 10 images at a time",
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
      event.target.value = ""; // Reset the file input
    } else {
      alert("Please select an image file.");
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (images.length == 10) {
      dispatch(
        setToast({
          type: "error",
          message: "You can only upload 10 images at a time",
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
    if (images.length == 10) {
      dispatch(
        setToast({
          type: "error",
          message: "You can only upload 10 images at a time",
        })
      );
      return;
    }
    fileInputRef.current?.click(); // Trigger the file input click when the div is clicked
  };

  const deleteImage = (index: number) => {
    updateImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="w-[680px] relative mt-4 mx-auto rounded-lg text-dark-grey text-center">
      <ScrollableImageList images={images} deleteImage={deleteImage} />
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
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
});

export default ImageInput;

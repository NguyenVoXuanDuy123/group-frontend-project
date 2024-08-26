import React, { useState, useRef, ChangeEvent } from "react";
import Modal from "@/components/Modal";

type UploadAvatarModalProps = {
  open: boolean;
  onClose: () => void;
};

const UploadAvatarModal = ({ open, onClose }: UploadAvatarModalProps) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (canvasRef.current && image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.src = image as string;
        img.onload = () => {
          // Reset canvas size to image size
          canvas.width = img.width;
          canvas.height = img.height;

          // Clear previous canvas content
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Apply scale and rotation
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.scale(scale, scale);
          ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2);

          // Generate cropped image data URL
          const dataUrl = canvas.toDataURL();
          setCroppedImage(dataUrl);
        };
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center p-4 space-y-4">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <div className="relative">
            <canvas ref={canvasRef} className="border border-gray-300" />
          </div>
        )}
        <div className="flex items-center space-x-4">
          <label>
            Scale:
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="ml-2"
            />
          </label>
          <label>
            Rotation:
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="ml-2"
            />
          </label>
        </div>
        <button
          onClick={handleCrop}
          className="px-4 py-2 bg-blue-500 text-white rounded">
          Crop
        </button>
        {croppedImage && (
          <div className="mt-4">
            <img
              src={croppedImage as string}
              alt="Cropped Avatar"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UploadAvatarModal;

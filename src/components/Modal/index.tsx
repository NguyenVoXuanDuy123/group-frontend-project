import CloseButton from "@/components/svg/CloseButton";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, onClose, children }: Props) => {
  return (
    // Backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto bg-black/20" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!open}>
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-transform duration-300 ${open ? "scale-100" : "scale-95"}`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
          <CloseButton />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;

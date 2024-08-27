import CloseIcon from "@/components/svg/CloseIcon";
import React from "react";

type Props = {
  open: boolean;
  hideModal: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, hideModal, children }: Props) => {
  return (
    // Backdrop
    <div
      onClick={hideModal}
      className={`fixed z-[1000] inset-0 no-scrollbar overflow-y-auto no-scrollbar transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto bg-black/20" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!open}>
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-transform duration-300 w-fit mx-auto my-8 ${open ? "scale-100" : "scale-95"}`}>
        <button
          onClick={hideModal}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
          <CloseIcon />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;

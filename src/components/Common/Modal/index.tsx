import React, { useEffect } from "react"; // Import useEffect from React
import CloseIcon from "@/components/svg/CloseIcon";

type Props = {
  open: boolean;
  hideModal: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, hideModal, children }: Props) => {
  useEffect(() => {
    // Prevent scrolling when the modal is open
    if (open) {
      document.body.classList.add("hide-scrollbar");
    } else {
      document.body.classList.remove("hide-scrollbar");
    }

    // Cleanup when the modal is unmounted or when the modal is closed
    return () => {
      document.body.classList.remove("hide-scrollbar");
    };
  }, [open]);

  return (
    // Backdrop
    <div
      onClick={hideModal}
      className={`fixed z-[1000] inset-0 no-scrollbar overflow-y-auto transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto bg-black/20" : "opacity-0 pointer-events-none"}`}
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

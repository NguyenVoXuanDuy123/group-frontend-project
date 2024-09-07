import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import CloseIcon from "@/components/svg/CloseIcon";
import { closeModal, openModal } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";

type Props = {
  open: boolean;
  hideModal: () => void;
  children: React.ReactNode;
  isImageSlider?: boolean;
};

const Modal = ({ open, hideModal, children }: Props) => {
  const dispatch = useDispatch();
  const openModalsCount = useSelector(
    (state: RootState) => state.modal.openModalsCount
  );
  const initialRender = useRef(true); // Track initial render

  useEffect(() => {
    if (initialRender.current) {
      // Skip updating modal count on the initial render
      initialRender.current = false;
      return;
    }

    if (open) {
      dispatch(openModal());
    }

    // Cleanup
    return () => {
      if (open) {
        dispatch(closeModal());
      }
    };
  }, [open, dispatch]);

  useEffect(() => {
    // Only remove the scrollbar when all modals are closed
    if (openModalsCount === 0) {
      document.body.classList.remove("hide-scrollbar");
    } else {
      document.body.classList.add("hide-scrollbar");
    }
  }, [openModalsCount]);

  return ReactDOM.createPortal(
    <div
      onClick={(e) => {
        console.log("clicked");
        e.stopPropagation();
        hideModal();
      }}
      className={`fixed z-[1000] inset-0 no-scrollbar overflow-y-auto transition-opacity duration-300 ${
        open
          ? "opacity-100 pointer-events-auto bg-black/20"
          : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}>
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-transform duration-300 w-fit mx-auto my-8 ${
          open ? "scale-100" : "scale-95"
        }`}>
        <button
          onClick={hideModal}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
          <CloseIcon />
        </button>

        {children}
      </div>
    </div>,
    document.body // Render to the body to avoid stacking context issues
  );
};

export default Modal;

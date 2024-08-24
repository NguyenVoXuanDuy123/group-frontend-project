import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearMessage } from "@/redux/slices/errorModalSlice";

const MessageModal = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector(
    (state: RootState) => state.messageModal
  );
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
    }
  }, [message]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(clearMessage());
    }, 500); // Adjusted to match the longer exit transition
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  if (!message && !isVisible) return null;

  const modalStyle = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
      <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500 ease-in-out"></div>
      <div
        ref={modalRef}
        className={`relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 transform transition-transform duration-500 ease-in-out ${
          isVisible ? "scale-100" : "scale-95"
        }`}>
        <div
          className={`flex items-center justify-between p-4 border-b border-gray-300 ${modalStyle}`}>
          <h5 className="text-lg font-semibold text-white">
            {type === "success" ? "Success" : "Error"}
          </h5>
          <button
            type="button"
            className="text-white hover:text-gray-200"
            aria-label="Close"
            onClick={handleClose}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex justify-end p-4 border-t border-gray-300">
          <button
            type="button"
            className={`px-4 py-2 ${modalStyle} text-white rounded hover:opacity-90 focus:outline-none`}
            onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;

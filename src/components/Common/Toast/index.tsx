import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { clearToast } from "@/redux/slices/toastSlice";
import CloseIcon from "../../svg/CloseIcon";
import CheckIcon from "../../svg/CheckIcon";

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.toast.currentToast);
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      // Reset progress and visibility
      setProgress(100);
      setIsVisible(true);

      // Decrease the progress over time
      const interval = setInterval(() => {
        setProgress((prev) => (prev > 0 ? prev - 1 : 0));
      }, 30);

      // Clear the toast after 3 seconds
      const timeout = setTimeout(() => {
        setIsVisible(false); // Trigger sliding down animation
        setTimeout(() => {
          dispatch(clearToast());
        }, 300); // Wait for the animation to complete before clearing
      }, 3000);

      // Clean up interval and timeout
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div
      className={`fixed z-[2000] bottom-4 right-4 w-[360px] bg-white shadow-lg rounded-md overflow-hidden border border-grey  ${isVisible ? "animate-slideUp" : "animate-slideDown"}`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          {toast.type === "success" ? (
            <CheckIcon />
          ) : (
            <span className="text-red-500 text-lg mr-2">❗</span>
          )}
          <span className="flex-1 text-dark-grey text-sm ml-4 wrap">
            {toast.message}
          </span>
        </div>
        <button
          onClick={() => dispatch(clearToast())}
          className="text-dark-grey">
          <CloseIcon />
        </button>
      </div>
      <div
        className={`h-1 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Toast;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearToast } from "@/redux/slices/toastSlice";

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.toast.currentToast);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast) {
      // Reset progress when a new toast is shown
      setProgress(100);

      // Decrease the progress over time
      const interval = setInterval(() => {
        setProgress((prev) => (prev > 0 ? prev - 1 : 0));
      }, 30);

      // Clear the toast after 3 seconds
      const timeout = setTimeout(() => {
        dispatch(clearToast());
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
    <div className="fixed bottom-4 right-4 w-72 bg-white shadow-lg rounded-md overflow-hidden border border-gray-300">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          {toast.type === "success" ? (
            <span className="text-green-500 text-lg mr-2">✔️</span>
          ) : (
            <span className="text-red-500 text-lg mr-2">❗</span>
          )}
          <span className="text-gray-700">{toast.message}</span>
        </div>
        <button
          onClick={() => dispatch(clearToast())}
          className="text-gray-500"
        >
          ✖️
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

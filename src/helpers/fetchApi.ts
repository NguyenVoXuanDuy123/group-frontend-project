import EnvVars from "@/constants/EnvVars";
import RouteError from "@/error/RouteError";
import { setToast } from "@/redux/slices/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";

const handleError = (error: RouteError, dispatch: Dispatch): null => {
  // Errors that should not display a toast
  const notDisplayErrorToast = [6005, 8009];

  // Error messages for specific some error codes
  const errorMessages: { [key: number]: string } = {
    7007: "This group join request is no longer available, please refresh the page.",
    5003: "This friend request is no longer available, please refresh the page.",
    8005: "Cannot perform this action, the post you want to do this action on may have been deleted or not in your circle. Please refresh the page.",
    8004: "Cannot perform this action, the post you want to do this action on may have been deleted or not in your circle. Please refresh the page.",
  };

  if (error.errorCode in errorMessages) {
    dispatch(
      setToast({
        type: "error",
        message: errorMessages[error.errorCode],
      })
    );
  } else if (!notDisplayErrorToast.includes(error.errorCode)) {
    dispatch(
      setToast({
        type: "error",
        message: error.message,
      })
    );
  }

  return null;
};

export const fetchApi = async <
  T = {
    status: "success";
  },
>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  dispatch: Dispatch,
  body?: { [key: string]: unknown },
  signal?: AbortSignal
): Promise<T | null> => {
  try {
    const response = await fetch(`${EnvVars.API_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
      credentials: "include",
      signal,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new RouteError(
        error.errorCode,
        error.message || "API request failed"
      );
    }

    const { result } = await response.json();

    // Return the result if it exists, otherwise return a default success object
    return (result as T) || ({ status: "success" } as T);
  } catch (error) {
    if (error instanceof RouteError) {
      return handleError(error, dispatch);
    } else if ((error as Error).name === "AbortError") {
      console.log("Fetch request was aborted");
      // Handle the abort case specifically if needed
      return null;
    } else {
      dispatch(
        setToast({
          message: "An unexpected error occurred",
          type: "error",
        })
      );

      // If fetch request fails, return null
      return null;
    }
  }
};

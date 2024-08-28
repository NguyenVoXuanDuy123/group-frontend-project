import EnvVars from "@/constants/EnvVars";
import RouteError from "@/error/RouteError";
import { setToast } from "@/redux/slices/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";

// this array contains the error codes that should not display through the toast
const notDisplayErrorToast = [6005, 8009];

export const fetchApi = async <
  T = {
    status: "success";
  },
>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  dispatch: Dispatch,
  body?: { [key: string]: unknown }
): Promise<T | null> => {
  try {
    // Fetch the data from the API
    const response = await fetch(`${EnvVars.API_URL}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    // If the response is not successful, throw an error
    if (!response.ok) {
      const error = await response.json();
      throw new RouteError(
        error.errorCode,
        error.message || "API request failed"
      );
    }

    const data = await response.json();

    return (data.result as T) || ({ status: "success" } as T);
  } catch (error) {
    console.error("Error in fetchApi:", error);
    if (!(error instanceof RouteError)) {
      return null;
    }

    console.error("Error in fetchApi:", error.errorCode);

    // errorCode 5003 is for that group join request is not longer available
    // it can be because the group request has been accepted, rejected or canceled
    if (error.errorCode === 7007) {
      dispatch(
        setToast({
          type: "error",
          message:
            "This group join request is not longer available, please refresh the page.",
        })
      );
      return null;
    }

    // errorCode 5003 is for that friend request is not longer available
    // it can be because the friend request has been accepted, rejected or canceled
    if (error.errorCode === 5003) {
      dispatch(
        setToast({
          type: "error",
          message:
            "This friend request is not longer available, please refresh the page.",
        })
      );
      return null;
    }

    // errorCode 8005 is for that post is not visible to the user
    // it can be because the post is deleted, the post is not in the circle that the user is in
    if (error.errorCode === 8005) {
      dispatch(
        setToast({
          type: "error",
          message:
            "This post is not longer available for you, please refresh the page.",
        })
      );
      return null;
    }

    // Display error toast only if the error code is not in the notDisplayErrorToast array
    if (!notDisplayErrorToast.includes(error.errorCode)) {
      //dispatch the error message, global toast will show the error message
      dispatch(
        setToast({
          message: error.message || "Network error occurred",
          type: "error",
        })
      );
      return null;
    }

    // Return null if there is an error, meaning the API request failed

    return null;
  }
};

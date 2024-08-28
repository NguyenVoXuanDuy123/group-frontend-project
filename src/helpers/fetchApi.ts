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

import EnvVars from "@/constants/EnvVars";
import { setModalMessage } from "@/redux/slices/errorModalSlice";
import { ErrorType } from "@/types/api.types";
import { Dispatch } from "@reduxjs/toolkit";

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
      throw new Error(error.message || "API request failed");
    }

    const data = await response.json();

    return (data.result as T) || ({ status: "success" } as T);
  } catch (error) {
    console.error("Error in fetchApi:", error);
    //dispatch the error message, global modal will show the error message

    dispatch(
      setModalMessage({
        message: (error as ErrorType).message || "Network error occurred",
        type: "error",
      })
    );

    // Return null if there is an error, meaning the API request failed
    return null;
  }
};

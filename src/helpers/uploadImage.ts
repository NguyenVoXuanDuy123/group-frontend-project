import EnvVars from "@/constants/EnvVars";
import RouteError from "@/error/RouteError";
import { setToast } from "@/redux/slices/toastSlice";
import { ImageResponse } from "@/types/image.types";
import { Dispatch } from "@reduxjs/toolkit";

export const uploadImage = async (
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  dispatch: Dispatch,
  body: FormData
): Promise<ImageResponse> => {
  try {
    // Fetch the data from the API
    const response = await fetch(`${EnvVars.API_URL}${url}`, {
      method: method,

      body: body,
      credentials: "include",
    });

    // If the response is not successful, throw an error
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API request failed");
    }

    const data = await response.json();
    return data.result as ImageResponse;
  } catch (error) {
    console.error("Error in fetchApi:", error);
    //dispatch the error message, global toast will show the error message
    dispatch(
      setToast({
        message: (error as RouteError).message || "Network error occurred",
        type: "error",
      })
    );

    // Return null if there is an error, meaning the API request failed
    return {
      url: "",
      mimetype: "",
      size: "",
    };
  }
};

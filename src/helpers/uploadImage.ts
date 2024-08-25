import EnvVars from "@/constants/EnvVars";
import { setModalMessage } from "@/redux/slices/errorModalSlice";
import { ErrorType } from "@/types/api.types";
import { ImageReponse } from "@/types/image.types";
import { Dispatch } from "@reduxjs/toolkit";

export const uploadImage = async (
  url: string,
  method:  "POST" | "PUT" | "PATCH" | "DELETE",
  dispatch: Dispatch,
  body: FormData
): Promise<ImageReponse> => {
  try {
    // Fetch the data from the API
    console.log("body", body.get("image"));
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
    return  data.result as ImageReponse;
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
    return {
        url: "",
         minetype: "",
         size: "",
    };
  }
};

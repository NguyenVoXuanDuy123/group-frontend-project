import EnvVars from "@/constants/EnvVars";
import RouteError from "@/error/RouteError";
import { setToast } from "@/redux/slices/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";

const handleError = (error: RouteError, dispatch: Dispatch) => {
  // Errors that should not display a toast
  const notDisplayErrorToast = [6005, 8009];

  // Error messages for specific some error codes
  const errorMessages: { [key: number]: string } = {
    7007: "This group join request is no longer available, please refresh the page.",
    5003: "This friend request is no longer available, please refresh the page.",
    8005: "Cannot perform this action, the post you want to do this action on may have been deleted or not in your circle. Please refresh the page.",
    8004: "Cannot perform this action, the post you want to do this action on may have been deleted or not in your circle. Please refresh the page.",
    9001: "This comment is no longer available, please refresh the page.",
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
};

type FetchApiResponseType<T> =
  | FetchApiSuccessResponseType<T>
  | FetchApiErrorResponseType;

type FetchApiSuccessResponseType<T> = {
  status: "success";
  result: T;
};

type FetchApiErrorResponseType = {
  status: "error";
  errorCode: number | "UNKNOWN_ERROR" | "ERR_CONNECTION_REFUSED";
};

export const fetchApi = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  dispatch: Dispatch,
  body?: { [key: string]: unknown }
): Promise<FetchApiResponseType<T>> => {
  try {
    const response = await fetch(`${EnvVars.API_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
      credentials: "include",
    });

    // if response is not ok, throw an error
    if (!response.ok) {
      const error = await response.json();
      throw new RouteError(error.errorCode, error.message);
    }

    const { result } = await response.json();

    return { status: "success", result } as FetchApiSuccessResponseType<T>;
  } catch (error) {
    if (error instanceof RouteError) {
      handleError(error, dispatch);
      return { status: "error", errorCode: error.errorCode };
    } else if (error instanceof TypeError) {
      // If the error is a TypeError, it means the server is not running or internet connection is lost
      return { status: "error", errorCode: "ERR_CONNECTION_REFUSED" };
    } else {
      return { status: "error", errorCode: "UNKNOWN_ERROR" };
    }
  }
};

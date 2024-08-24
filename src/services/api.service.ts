import EnvVars from "@/constants/EnvVars";
import { setMessage } from "@/redux/slices/errorModalSlice";
import { ErrorType } from "@/types/api.types";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchApi = async <T>(
    url: string, 
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", 
    dispatch: Dispatch, 
    body?: { [key: string]: unknown }
): Promise<T | null> => {
    try {
        const response = await fetch(`${EnvVars.API_URL}${url}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
        });

        if (!response.ok) {
            const error = await response.json();
            dispatch(
                setMessage({
                    message: error.message || 'An error occurred',
                    type: "error"
                })
            );
            throw new Error(error.message || 'API request failed');
        }

        const data = await response.json();
        return data.result as T;
    } catch (error) {
        console.error('Error in fetchApi:', error);
        dispatch(
            setMessage({
                message: (error as ErrorType).message || 'Network error occurred',
                type: "error"
            })
        );
        return null
    }
};

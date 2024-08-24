import EnvVars from "@/constants/EnvVars";
import { UserRole, UserStatus } from "@/enums/user.enum";
import { RootState } from "@/redux/store";
import { ErrorType } from "@/types/api.types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type UserAuth = {
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  username: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: UserAuth | null;
  status: "idle" | "loading";
  error: ErrorType | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: "loading",
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    const response = await fetch(EnvVars.API_URL + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();

      return thunkAPI.rejectWithValue(error);
    }

    return await response.json();
  }
);

export const introspectUser = createAsyncThunk(
  "auth/introspectUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(EnvVars.API_URL + "/api/auth/introspect", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }

      const data = await response.json();
      console.log(data);
      if (!data.result.isAuthenticated) {
        throw new Error("User not authenticated");
      }

      return data.result.user as UserAuth;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "idle";
        state.isAuthenticated = true;
        state.user = action.payload.result;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "idle";

        state.error = action.payload as ErrorType;
      })
      .addCase(introspectUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(introspectUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(introspectUser.rejected, (state, action) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as ErrorType;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

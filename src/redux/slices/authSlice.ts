import { UserRole, UserStatus } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";

import { RootState } from "@/redux/store";

import {
  createSlice,
  createAsyncThunk,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";

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
  status: "firstLoading" | "idle" | "loading";
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: "firstLoading",
};

export const introspectUser = createAsyncThunk(
  "auth/introspectUser",
  async (
    payload: {
      dispatch: Dispatch;
    },
    { rejectWithValue }
  ) => {
    const userAuth = await fetchApi<{
      isAuthenticated: boolean;
      user: UserAuth;
    }>("/api/auth/introspect", "GET", payload.dispatch);

    console.log(userAuth);
    if (userAuth?.isAuthenticated) {
      return userAuth.user;
    }

    return rejectWithValue("Failed to introspect user");
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (
    payload: {
      dispatch: Dispatch;
    },
    { rejectWithValue }
  ) => {
    const response = await fetchApi(
      "/api/auth/logout",
      "POST",
      payload.dispatch
    );

    if (response?.status === "success") {
      return true;
    }

    return rejectWithValue("Failed to logout");
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
    updateUser: (state, action: PayloadAction<Partial<UserAuth>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(logOut.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(introspectUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(introspectUser.rejected, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout, updateUser } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

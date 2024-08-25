import { UserRole, UserStatus } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";

import { RootState } from "@/redux/store";

import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";

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

    if (userAuth?.isAuthenticated) {
      return userAuth.user;
    }

    return rejectWithValue("Failed to introspect user");
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

export const { logout } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

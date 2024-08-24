// src/hooks/useAuth.ts
import { introspectUser } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, status, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(introspectUser());
    }
  }, [dispatch, isAuthenticated]);

  return { user, isAuthenticated, status, error };
};

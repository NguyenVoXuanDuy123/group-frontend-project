import { UserStatus } from "@/enums/user.enums";
import { useAuth } from "@/hooks/useAuth";
import AuthPage from "@/pages/AuthPage";
import BannedPage from "@/pages/BannedPage";
import { fetchUnreadNotificationCount } from "@/redux/slices/notificationSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { status, isAuthenticated, user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // fetch unread notification count if user is authenticated and not banned
    if (user && user.status !== UserStatus.BANNED) {
      dispatch(fetchUnreadNotificationCount({ dispatch }));
    }
  }, [dispatch, user]);

  if (status === "firstLoading") {
    return;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }
  if (user?.status === UserStatus.BANNED) {
    return <BannedPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

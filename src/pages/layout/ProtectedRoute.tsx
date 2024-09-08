import { UserStatus } from "@/enums/user.enums";
import syncOfflineReactions from "@/helpers/syncReaction";
import { useAuth } from "@/hooks/useAuth";
import AuthPage from "@/pages/AuthPage";
import BannedPage from "@/pages/BannedPage";
import { fetchUnreadNotificationCount } from "@/redux/slices/notificationSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { status, isAuthenticated, user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch unread notification count
  useEffect(() => {
    // fetch unread notification count if user is authenticated and not banned
    if (user && user.status !== UserStatus.BANNED) {
      dispatch(fetchUnreadNotificationCount({ dispatch }));
    }
  }, [dispatch, user]);

  // Sync offline reactions
  useEffect(() => {
    let delay = 2500; // Initial delay of 2.5 seconds x2 (5 seconds)
    const maxDelay = 30000; // Maximum delay of 30 seconds

    const sync = async () => {
      const success = await syncOfflineReactions();

      if (success) {
        delay = 5000; // Reset delay to 5 seconds
      } else {
        delay = Math.min(delay * 2, maxDelay); // Increase delay, maxing out at 30 seconds
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(sync, delay);
    };

    if (user && user.status !== UserStatus.BANNED) {
      sync(); // Run sync immediately
    }
    // Cleanup interval on unmountp
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [user]);

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

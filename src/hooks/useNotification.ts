import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchUnreadNotificationCount,
  fetchUnreadNotifications,
} from "@/redux/slices/notificationSlice";

export const NOTIFICATION_FETCH_INTERVAL = 1000; // in milliseconds

// Custom hook useNotification
export const useNotification = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { notifications, loading, error, hasMore, unreadCount } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchUnreadNotifications({ dispatch }));
    }, NOTIFICATION_FETCH_INTERVAL);
    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUnreadNotificationCount({ dispatch }));
  }, [dispatch]);

  // Return the current state and any needed actions
  return {
    notifications,
    loading,
    error,
    unreadCount,
    hasMore,
  };
};

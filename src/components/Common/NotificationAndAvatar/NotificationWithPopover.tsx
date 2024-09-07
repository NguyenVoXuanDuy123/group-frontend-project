import InfiniteScroll from "@/components/Common/InfiniteScroll";
import NotificationDetail from "@/components/Common/NotificationAndAvatar/NotificationDetail";
import Popover from "@/components/Common/Popover";
import NotificationIcon from "@/components/svg/side-bar-icons/NotificationIcon";
import { useNotification } from "@/hooks/useNotification";
import {
  fetchNotifications,
  resetUnreadNotificationCount,
} from "@/redux/slices/notificationSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const NotificationWithPopover = () => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const { notifications, hasMore, loading, unreadCount } = useNotification();
  const dispatch = useDispatch<AppDispatch>();

  const loadMoreNotifications = () => {
    if (!hasMore || loading) return;
    dispatch(fetchNotifications({ dispatch }));
  };

  useEffect(() => {
    // Reset unread notification count when popover is closed
    if (popoverOpen) return;
    dispatch(resetUnreadNotificationCount());
  }, [dispatch, popoverOpen]);

  console.log("notifications", unreadCount);

  return (
    <Popover
      displayComponent={
        <div className="mr-3 flex relative  items-center justify-center w-12 h-12 bg-light-grey rounded-full cursor-pointer">
          <NotificationIcon />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-primary rounded-full h-4 w-4 flex items-center justify-center text-xs text-white">
              {unreadCount}
            </div>
          )}
        </div>
      }
      popoverOpen={popoverOpen}
      setPopoverOpen={setPopoverOpen}>
      <div className="h-[600px] w-[400px] p-4 bg-white shadow-2xl rounded-md overflow-y-auto z-[1000]">
        <div className="text-lg font-bold">Notifications</div>
        <InfiniteScroll
          items={notifications}
          loadMore={loadMoreNotifications}
          renderItem={(notification) => (
            <NotificationDetail
              key={notification._id}
              notification={notification}
            />
          )}
        />
      </div>
    </Popover>
  );
};

export default NotificationWithPopover;

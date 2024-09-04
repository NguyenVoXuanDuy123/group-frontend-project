import AvatarWithPopover from "@/components/Common/NotificationAndAvatar/AvatarWithPopover";
import NotificationWithPopover from "@/components/Common/NotificationAndAvatar/NotificationWithPopover";
import { useAuth } from "@/hooks/useAuth";

const NotificationAndAvatar = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex w-fit ">
      <NotificationWithPopover />

      <AvatarWithPopover avatar={user.avatar} username={user.username} />
    </div>
  );
};

export default NotificationAndAvatar;

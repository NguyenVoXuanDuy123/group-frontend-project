import AvatarWithPopover from "@/components/Common/NotificationAndAvatar/AvatarWithPopover";
import NotificationWithPopover from "@/components/Common/NotificationAndAvatar/NotificationWithPopover";
import { UserRole } from "@/enums/user.enums";
import { useAuth } from "@/hooks/useAuth";

const NotificationAndAvatar = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex w-fit ">
      {user.role !== UserRole.ADMIN && <NotificationWithPopover />}

      <AvatarWithPopover
        role={user.role}
        avatar={user.avatar}
        username={user.username}
      />
    </div>
  );
};

export default NotificationAndAvatar;

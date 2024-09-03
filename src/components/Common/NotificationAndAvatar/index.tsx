import AvatarWithPopover from "@/components/Common/NotificationAndAvatar/AvatarWithPopover";
import NotificationIcon from "@/components/svg/side-bar-icons/NotificationIcon";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const NotificationAndAvatar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) return null;

  return (
    <div className="flex w-fit ">
      <div className="mr-3 flex  items-center justify-center w-12 h-12 bg-light-grey rounded-full">
        <NotificationIcon />
      </div>
      <AvatarWithPopover avatar={user.avatar} username={user.username} />
    </div>
  );
};

export default NotificationAndAvatar;

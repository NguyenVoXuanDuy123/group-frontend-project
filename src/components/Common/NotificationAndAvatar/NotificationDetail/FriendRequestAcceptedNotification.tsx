import Avatar from "@/components/Common/User/Avatar";
import FriendIcon from "@/components/svg/side-bar-icons/FriendIcon";
import getFullName from "@/helpers/getFullName";
import { timeAgo } from "@/helpers/timeAgo";
import { UserInformation } from "@/types/user.types";
import { Link } from "react-router-dom";

type FriendRequestAcceptNotificationProps = {
  senderDetail: UserInformation;
  createdAt: string;
  isRead: boolean;
};

const FriendRequestAcceptedNotification = ({
  senderDetail,
  createdAt,
  isRead,
}: FriendRequestAcceptNotificationProps) => {
  return (
    <Link to={`/${senderDetail.username}`}>
      <div className="bg-white w-full rounded-md hover:bg-dark-grey/20 p-1 cursor-pointer text-sm">
        <div className="flex items-center">
          <div className="relative">
            <Avatar
              key={senderDetail._id}
              photoURL={senderDetail.avatar}
              size={64}
            />
            <div className="absolute bottom-0 right-1">
              <div className="rounded-full h-[24px] w-[24px] justify-center items-center flex bg-primary">
                <FriendIcon color="white" size={20} />
              </div>
            </div>
          </div>

          <div className="flex-1 py-1 px-2">
            <span className="font-bold">{getFullName(senderDetail)} </span>
            <span> accepted your friend request.</span>
            <div className="flex">
              <span className="text-xs text-grey">{timeAgo(createdAt)}</span>
            </div>
          </div>
          {!isRead && (
            <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FriendRequestAcceptedNotification;

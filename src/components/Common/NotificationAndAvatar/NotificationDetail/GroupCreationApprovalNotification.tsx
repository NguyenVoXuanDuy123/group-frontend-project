import GroupIcon from "@/components/svg/side-bar-icons/GroupIcon";
import { timeAgo } from "@/helpers/timeAgo";
import { GroupResponseNotification } from "@/types/notification.type";
import { Link } from "react-router-dom";

type GroupJoinRequestAcceptedNotificationProps = {
  group: GroupResponseNotification;
  createdAt: string;
  isRead: boolean;
};

const GroupCreationApprovalNotification = ({
  group,
  createdAt,
  isRead,
}: GroupJoinRequestAcceptedNotificationProps) => {
  return (
    <Link to={`/groups/${group._id}`}>
      <div className="bg-white w-full rounded-md hover:bg-dark-grey/20 p-1 cursor-pointer text-sm">
        <div className="flex items-center">
          <div className="relative rounded-full bg-primary w-[64px] h-[64px] flex justify-center items-center">
            <GroupIcon color="white" size={46} />
          </div>

          <div className="flex-1 py-1 px-2">
            <span>Your request to create the group </span>
            <span className="font-bold">{group.name} </span>
            <span className="font-semibold text-dark-grey">
              has been approved.
            </span>
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

export default GroupCreationApprovalNotification;

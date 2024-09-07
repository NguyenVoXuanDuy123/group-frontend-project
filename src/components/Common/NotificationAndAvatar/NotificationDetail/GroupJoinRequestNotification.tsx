import AcceptFriendRequestIcon from "@/components/svg/profile-actions/AcceptFriendRequestIcon";
import RemoveFriendIcon from "@/components/svg/profile-actions/RemoveFriendIcon";
import Avatar from "@/components/Common/User/Avatar";
import { fetchApi } from "@/helpers/fetchApi";
import { timeAgo } from "@/helpers/timeAgo";
import { setToast } from "@/redux/slices/toastSlice";
import { UserInformation } from "@/types/user.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import getFullName from "@/helpers/getFullName";
import FriendIcon from "@/components/svg/side-bar-icons/FriendIcon";
import { GroupJoinRequestStatus } from "@/enums/group.enums";
import { GroupResponseNotification } from "@/types/notification.type";
import { changeJoinGroupRequestStatus } from "@/redux/slices/notificationSlice";
import { Link } from "react-router-dom";

type GroupJoinRequestNotificationProps = {
  senderDetail: UserInformation;
  group: GroupResponseNotification;
  createdAt: string;
  groupRequestId: string;
  groupJoinRequestStatus: GroupJoinRequestStatus;
  isRead: boolean;
};

const GroupJoinRequestNotification = ({
  createdAt,
  senderDetail,
  group,
  groupRequestId,
  groupJoinRequestStatus,
  isRead,
}: GroupJoinRequestNotificationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const fullName = getFullName(senderDetail);
  const handleAcceptRequest = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetchApi(
      `/api/groups/requests/${groupRequestId}`,
      "PATCH",
      dispatch,
      {
        status: GroupJoinRequestStatus.ACCEPTED,
      }
    );

    if (response.status === "success") {
      dispatch(
        changeJoinGroupRequestStatus({
          groupJoinRequestId: groupRequestId,
          status: GroupJoinRequestStatus.ACCEPTED,
        })
      );

      dispatch(
        setToast({
          message: "Group join request of " + fullName + " is accepted",
          type: "success",
        })
      );
    }
    setIsLoading(false);
  };

  const handleDeclineRequest = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetchApi(
      `/api/groups/requests/${groupRequestId}`,
      "PATCH",
      dispatch,
      {
        status: GroupJoinRequestStatus.REJECTED,
      }
    );
    if (response.status === "success") {
      dispatch(
        changeJoinGroupRequestStatus({
          groupJoinRequestId: groupRequestId,
          status: GroupJoinRequestStatus.REJECTED,
        })
      );
      dispatch(
        setToast({
          message: "Group join request of " + fullName + " is declined",
          type: "success",
        })
      );
    }
    setIsLoading(false);
  };

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
            <span> sent you a group join request for </span>
            <span className="font-bold">{group.name}</span>
            {groupJoinRequestStatus === GroupJoinRequestStatus.ACCEPTED && (
              <div className=" text-[12px] text-green-700 font-semibold rounded-md  mt-1 w-fit ">
                Group join request has been accepted
              </div>
            )}
            {groupJoinRequestStatus === GroupJoinRequestStatus.REJECTED && (
              <div className="text-[12px] text-red-600 font-semibold rounded-md  mt-1 w-fit">
                Group join request has been declined
              </div>
            )}

            {groupJoinRequestStatus === GroupJoinRequestStatus.PENDING && (
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={handleAcceptRequest}
                  disabled={isLoading}
                  className="bg-primary text-white text-sm font-semibold py-1 px-2 rounded flex items-center h-8">
                  <AcceptFriendRequestIcon className="mr-1 mb-px" />
                  Accept
                </button>
                <button
                  onClick={handleDeclineRequest}
                  disabled={isLoading}
                  className="bg-gray-200 text-black text-sm font-semibold py-1 px-2 rounded flex items-center h-8 hover:bg-gray-300">
                  <RemoveFriendIcon color="black" className="mr-1 mt-px" />
                  Decline
                </button>
              </div>
            )}
            <div className="flex mt-1">
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

export default GroupJoinRequestNotification;

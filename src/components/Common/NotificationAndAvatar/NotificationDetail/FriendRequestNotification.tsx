import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import AcceptFriendRequestIcon from "@/components/svg/profile-actions/AcceptFriendRequestIcon";
import RemoveFriendIcon from "@/components/svg/profile-actions/RemoveFriendIcon";
import Avatar from "@/components/Common/User/Avatar";
import FriendIcon from "@/components/svg/side-bar-icons/FriendIcon";
import { FriendRequestStatus } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { timeAgo } from "@/helpers/timeAgo";
import { setToast } from "@/redux/slices/toastSlice";
import { changeFriendRequestStatus } from "@/redux/slices/notificationSlice";
import { UserInformation } from "@/types/user.types";
import getFullName from "@/helpers/getFullName";

type FriendRequestNotificationProps = {
  senderDetail: UserInformation;
  createdAt: string;
  friendRequestId: string;
  friendRequestStatus: FriendRequestStatus;
  isRead: boolean;
};

const FriendRequestNotification = ({
  createdAt,
  senderDetail,
  friendRequestId,
  friendRequestStatus,
  isRead,
}: FriendRequestNotificationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const fullName = getFullName(senderDetail);

  const handleAcceptRequest = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetchApi(
      `/api/users/me/friends/requests/${friendRequestId}`,
      "PATCH",
      dispatch,
      {
        status: FriendRequestStatus.ACCEPTED,
      }
    );

    if (response.status === "success") {
      dispatch(
        changeFriendRequestStatus({
          friendRequestId: friendRequestId,
          status: FriendRequestStatus.ACCEPTED,
        })
      );
      dispatch(
        setToast({
          message: "You and " + fullName + " are now friends",
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
      `/api/users/me/friends/requests/${friendRequestId}`,
      "PATCH",
      dispatch,
      {
        status: FriendRequestStatus.REJECTED,
      }
    );
    if (response.status === "success") {
      dispatch(
        changeFriendRequestStatus({
          friendRequestId: friendRequestId,
          status: FriendRequestStatus.REJECTED,
        })
      );
      dispatch(
        setToast({
          message: "Friend request of " + fullName + " is declined",
          type: "success",
        })
      );
    }
    setIsLoading(false);
  };

  return (
    <Link to={`/${senderDetail.username}`}>
      <div className="bg-white p-1 w-full rounded-md hover:bg-dark-grey/20 cursor-pointer text-sm">
        <div className="flex items-center">
          <div className="relative">
            <Avatar
              key={senderDetail._id}
              photoURL={senderDetail.avatar}
              size={64}
            />
            <div className="absolute bottom-0 right-1">
              <div className="rounded-full h-6 w-6 flex justify-center items-center bg-primary">
                <FriendIcon color="white" size={20} />
              </div>
            </div>
          </div>

          <div className="flex-1 m-2">
            <p className="font-bold">
              {fullName}{" "}
              <span className="font-normal">sent you a friend request.</span>
            </p>
            <p className="text-xs text-gray-600">
              {senderDetail.mutualFriendCount} mutual friends
            </p>

            {friendRequestStatus === FriendRequestStatus.ACCEPTED && (
              <p className="text-xs text-green-700 font-semibold mt-1">
                Friend request has been accepted
              </p>
            )}
            {friendRequestStatus === FriendRequestStatus.REJECTED && (
              <p className="text-xs text-red-600 font-semibold mt-1">
                Friend request has been declined
              </p>
            )}

            {friendRequestStatus === FriendRequestStatus.PENDING && (
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

            <p className="text-xs text-gray-500 mt-2">{timeAgo(createdAt)}</p>
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

export default FriendRequestNotification;

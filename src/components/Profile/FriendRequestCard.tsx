import AcceptFriendRequestIcon from "@/components/svg/profile-actions/AcceptFriendRequestIcon";
import RemoveFriendIcon from "@/components/svg/profile-actions/RemoveFriendIcon";
import Avatar from "@/components/User/Avatar";
import { FriendRequestStatus } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { timeAgo } from "@/helpers/timeAgo";
import { setToast } from "@/redux/slices/toastSlice";
import {
  FriendRequest,
  FriendRequestCardType,
  UserProfile,
} from "@/types/user.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

type FriendCardProps = {
  username?: string;
  fullName: string;
  mutualFriendCount?: number;
  avatar: string;
  friendRequest: FriendRequest;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  user: UserProfile;
  setFriendRequests: React.Dispatch<
    React.SetStateAction<FriendRequestCardType[]>
  >;
};

const FriendRequestCard = ({
  username,
  fullName,
  mutualFriendCount,
  avatar,
  friendRequest,
  setUser,
  user,
  setFriendRequests,
}: FriendCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleAcceptRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/users/me/friends/requests/${friendRequest.id}`,
      "PATCH",
      dispatch,
      {
        status: FriendRequestStatus.ACCEPTED,
      }
    );

    if (response?.status === "success") {
      const updatedUser: UserProfile = {
        ...user,
        friendCount: user.friendCount + 1,
      };
      setUser(updatedUser);
      setFriendRequests((prev) =>
        prev.filter((req) => req.id !== friendRequest.id)
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

  const handleDeclineRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/users/me/friends/requests/${friendRequest.id}`,
      "PATCH",
      dispatch,
      {
        status: FriendRequestStatus.REJECTED,
      }
    );
    if (response?.status === "success") {
      setFriendRequests((prev) =>
        prev.filter((req) => req.id !== friendRequest.id)
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
    <div className="items-center w-full rounded-lg flex mb-3 border p-2 h-[132px]">
      <Link to={`/${username}`}>
        <Avatar size={80} photoURL={avatar} key={avatar} />
      </Link>

      <div className="flex flex-col flex-1 ml-4 mt-1">
        <div className="flex justify-between items-center w-full  ">
          <Link to={`/${username}`} className="text-black no-underline ">
            <span className="cursor-pointer   font-semibold hover:underline">
              {fullName}
            </span>
          </Link>
          <span className="text-xs text-dark-grey">
            {timeAgo(friendRequest.createdAt)}
          </span>
        </div>

        <Link
          to={`/${username}/friends`}
          className="text-black no-underline m-0 -mt-2 ">
          <span className="  cursor-pointer text-xs text-dark-grey hover:underline">
            {mutualFriendCount && mutualFriendCount + " mutual friends"}
          </span>
        </Link>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleAcceptRequest}
            disabled={isLoading}
            className="bg-primary  text-white font-semibold py-2 px-4 rounded flex h-10 justify-center items-center">
            <div className="mb-[2px] mr-1">
              <AcceptFriendRequestIcon />
            </div>
            Accept
          </button>
          <button
            onClick={handleDeclineRequest}
            disabled={isLoading}
            className="bg-grey/50 hover:bg-grey/80 text-black font-semibold py-2 px-4 h-10 rounded flex">
            <div className="mt-[1px] mr-1">
              <RemoveFriendIcon color="black" />
            </div>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;

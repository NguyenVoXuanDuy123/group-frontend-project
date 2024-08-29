import AcceptFriendRequestIcon from "@/components/svg/profile-actions/AcceptFriendRequestIcon";
import RemoveFriendIcon from "@/components/svg/profile-actions/RemoveFriendIcon";
import Avatar from "@/components/User/Avatar";
import { GroupJoinRequestStatus } from "@/enums/group.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { timeAgo } from "@/helpers/timeAgo";
import { Group, GroupJoinRequestCardType } from "@/types/group.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

type GroupJoinRequestCardProps = {
  username: string;
  fullName: string;
  avatar: string;
  groupJoinRequest: GroupJoinRequestCardType;
  setGroup: React.Dispatch<React.SetStateAction<Group | null>>;
  group: Group;
  setGroupRequests: React.Dispatch<
    React.SetStateAction<GroupJoinRequestCardType[]>
  >;
};

const GroupJoinRequestCard = ({
  username,
  fullName,
  avatar,
  groupJoinRequest,
  setGroup,
  group,
  setGroupRequests,
}: GroupJoinRequestCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleAcceptRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/groups/requests/${groupJoinRequest.id}`,
      "PATCH",
      dispatch,
      {
        status: GroupJoinRequestStatus.ACCEPTED,
      }
    );

    if (response?.status === "success") {
      const updatedGroup: Group = {
        ...group,
        memberCount: group.memberCount + 1,
      };
      setGroup(updatedGroup);
      setGroupRequests((prev) =>
        prev.filter((req) => req.id !== groupJoinRequest.id)
      );
    }
    setIsLoading(false);
  };

  const handleDeclineRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/groups/requests/${groupJoinRequest.id}`,
      "PATCH",
      dispatch,
      {
        status: GroupJoinRequestStatus.REJECTED,
      }
    );
    if (response?.status === "success") {
      setGroupRequests((prev) =>
        prev.filter((req) => req.id !== groupJoinRequest.id)
      );
    }
    setIsLoading(false);
  };
  return (
    <div className="items-center w-full rounded-lg flex mb-3 border p-2 h-[132px]">
      <Link to={`/${username}`}>
        <Avatar size={80} photoURL={avatar} />
      </Link>

      <div className="flex flex-col flex-1 ml-4 mt-1">
        <div className="flex justify-between items-center w-full  ">
          <Link to={`/${username}`} className="text-black no-underline ">
            <span className="cursor-pointer   font-semibold hover:underline">
              {fullName}
            </span>
          </Link>
          <span className="text-xs text-dark-grey">
            {timeAgo(groupJoinRequest.createdAt)}
          </span>
        </div>

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

export default GroupJoinRequestCard;

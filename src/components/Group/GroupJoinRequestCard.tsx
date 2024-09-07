import AcceptFriendRequestIcon from "@/components/svg/profile-actions/AcceptFriendRequestIcon";
import RemoveFriendIcon from "@/components/svg/profile-actions/RemoveFriendIcon";
import Avatar from "@/components/Common/User/Avatar";
import { GroupJoinRequestStatus } from "@/enums/group.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { timeAgo } from "@/helpers/timeAgo";
import { Group, GroupJoinRequestCardType } from "@/types/group.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserInformation } from "@/types/user.types";
import getFullName from "@/helpers/getFullName";

type GroupJoinRequestCardProps = {
  senderDetail: UserInformation;
  groupJoinRequest: GroupJoinRequestCardType;
  setGroup: React.Dispatch<React.SetStateAction<Group | null>>;
  group: Group;
  createdAt: string;
};

const GroupJoinRequestCard = ({
  senderDetail,
  groupJoinRequest,
  setGroup,
  group,
  createdAt,
}: GroupJoinRequestCardProps) => {
  const fullName = getFullName(senderDetail);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groupJoinRequestStatus, setGroupJoinRequestStatus] =
    useState<GroupJoinRequestStatus>(GroupJoinRequestStatus.PENDING);
  const dispatch = useDispatch();
  const handleAcceptRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/groups/requests/${groupJoinRequest._id}`,
      "PATCH",
      dispatch,
      {
        status: GroupJoinRequestStatus.ACCEPTED,
      }
    );

    if (response.status === "success") {
      const updatedGroup: Group = {
        ...group,
        memberCount: group.memberCount + 1,
      };
      setGroup(updatedGroup);
      setGroupJoinRequestStatus(GroupJoinRequestStatus.ACCEPTED);
    }
    setIsLoading(false);
  };

  const handleDeclineRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/groups/requests/${groupJoinRequest._id}`,
      "PATCH",
      dispatch,
      {
        status: GroupJoinRequestStatus.REJECTED,
      }
    );
    if (response.status === "success") {
      setGroupJoinRequestStatus(GroupJoinRequestStatus.REJECTED);
    }
    setIsLoading(false);
  };
  return (
    <div className="items-center w-full rounded-lg flex mb-3 border p-2 h-[132px]">
      <Link to={`/${senderDetail.username}`}>
        <Avatar
          size={80}
          photoURL={senderDetail.avatar}
          key={senderDetail.avatar}
        />
      </Link>

      <div className="flex flex-col flex-1 ml-4 mt-1">
        <div className="flex justify-between items-center w-full  ">
          <Link
            to={`/${senderDetail.username}`}
            className="text-black no-underline ">
            <span className="cursor-pointer   font-semibold hover:underline">
              {fullName}
            </span>
          </Link>
          <span className="text-xs text-dark-grey">{timeAgo(createdAt)}</span>
        </div>

        <Link
          to={`/${senderDetail.username}/friends`}
          className="text-black no-underline m-0 -mt-2 ">
          <span className="  cursor-pointer text-xs text-dark-grey hover:underline">
            {senderDetail.mutualFriendCount &&
              senderDetail.mutualFriendCount + " mutual friends"}
          </span>
        </Link>
        {groupJoinRequestStatus === GroupJoinRequestStatus.ACCEPTED && (
          <span className="bg-green-100 text-[12px] text-green-700 font-semibold rounded-md px-4 py-2 mt-4 w-fit shadow-sm">
            Group join request accepted
          </span>
        )}
        {groupJoinRequestStatus === GroupJoinRequestStatus.REJECTED && (
          <span className="bg-red-100 text-[12px] text-red-600 font-medium rounded-lg  px-4 py-2 mt-4 w-fit shadow-sm">
            Group join request rejected
          </span>
        )}

        {groupJoinRequestStatus === GroupJoinRequestStatus.PENDING && (
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
        )}
      </div>
    </div>
  );
};

export default GroupJoinRequestCard;

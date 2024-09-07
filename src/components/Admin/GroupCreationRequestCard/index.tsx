import RejectGroupCreationModal from "@/components/Admin/GroupCreationRequestCard/RejectGroupCreationModal";
import GroupModal from "@/components/Common/Group/GroupModal";
import Avatar from "@/components/Common/User/Avatar";
import { GroupStatus, GroupVisibilityLevel } from "@/enums/group.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { fetchApi } from "@/helpers/fetchApi";
import { truncateText } from "@/helpers/truncateText";
import { GroupCard } from "@/types/group.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

type GroupCreationRequestProps = {
  groupCreationRequest: GroupCard;
};

const GroupCreationRequestCard = ({
  groupCreationRequest,
}: GroupCreationRequestProps) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [groupJoinRequestStatus, setGroupJoinRequestStatus] =
    useState<GroupStatus>(GroupStatus.PENDING);
  const [rejectedReason, setRejectedReason] = useState("");
  const dispatch = useDispatch();
  const handleApprove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const response = await fetchApi(
      `/api/groups/${groupCreationRequest._id}/status`,
      "PATCH",
      dispatch,
      {
        status: GroupStatus.APPROVED,
      }
    );
    if (response.status === "success") {
      setGroupJoinRequestStatus(GroupStatus.APPROVED);
    }
  };

  const openGroupModal = () => {
    setIsGroupModalOpen(true);
  };

  const openRejectModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsRejectModalOpen(true);
  };

  const handleReject = async () => {
    if (!rejectedReason) {
      return;
    }

    const response = await fetchApi(
      `/api/groups/${groupCreationRequest._id}/status`,
      "PATCH",
      dispatch,
      {
        status: GroupStatus.REJECTED,
        rejectedReason,
      }
    );
    if (response.status === "success") {
      setGroupJoinRequestStatus(GroupStatus.REJECTED);
      setIsRejectModalOpen(false);
    }
  };
  return (
    <>
      <div
        onClick={openGroupModal}
        className="bg-white border rounded-xl p-6 hover:bg-grey/60 cursor-pointer w-full h-[200px]">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">
              {truncateText(groupCreationRequest.name, 30)}
            </h3>

            <p className="text-gray-600 mt-1">
              {truncateText(groupCreationRequest.description, 80)}
            </p>
            <div className="mt-2 flex items-center space-x-4">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  groupCreationRequest.visibilityLevel ===
                  GroupVisibilityLevel.PUBLIC
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                {capitalizeFirstLetter(groupCreationRequest.visibilityLevel)}
              </span>
            </div>
          </div>
          {groupCreationRequest.admin && (
            <Link to={`/${groupCreationRequest.admin.username}`}>
              <div className="flex items-center rounded-xl pointer-events-none">
                <Avatar
                  photoURL={groupCreationRequest.admin.avatar}
                  size={48}
                />
                <div className="ml-2">
                  <p className="font-medium">{`${groupCreationRequest.admin.firstName} ${groupCreationRequest.admin.lastName}`}</p>
                  <p className="text-sm text-gray-500">
                    @{groupCreationRequest.admin.username}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="mt-4 flex justify-end z-30 relative">
          {groupJoinRequestStatus === GroupStatus.PENDING && (
            <div className="z-30 space-x-2 relative">
              <button
                onClick={openRejectModal}
                className="px-4 py-2 text-sm bg-dark-grey text-white rounded-md font-medium">
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 text-sm bg-primary text-white rounded-md font-medium">
                Approve
              </button>
            </div>
          )}
          {groupJoinRequestStatus === GroupStatus.APPROVED && (
            <span className="text-green-700 font-semibold rounded-md px-4 py-2 w-fit">
              Group creation request accepted
            </span>
          )}
          {groupJoinRequestStatus === GroupStatus.REJECTED && (
            <span className="text-red-600 font-medium rounded-md px-4 py-2 w-fit">
              Group creation request rejected
            </span>
          )}
        </div>
      </div>
      <GroupModal
        group={groupCreationRequest}
        open={isGroupModalOpen}
        hideModal={() => setIsGroupModalOpen(false)}
      />
      <RejectGroupCreationModal
        open={isRejectModalOpen}
        hideModal={() => setIsRejectModalOpen(false)}
        rejectedReason={rejectedReason}
        setRejectedReason={setRejectedReason}
        handleReject={handleReject}
      />
    </>
  );
};

export default GroupCreationRequestCard;

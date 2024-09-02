import WarningModal from "@/components/Common/Modal/WarningUnfriendModal";
import CreateOrUpdateGroupModal from "@/components/Group/CreateNewGroupModal";
import AddFriendIcon from "@/components/svg/profile-actions/AddFriendIcon";
import CancelFriendRequestIcon from "@/components/svg/profile-actions/CancelFriendRequestIcon";
import EditProfileIcon from "@/components/svg/profile-actions/EditProfileIcon";
import RemoveFriendIcon from "@/components/svg/profile-actions/RemoveFriendIcon";
import { GroupJoinRequestStatus, UserGroupRelation } from "@/enums/group.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { Group, GroupJoinRequest } from "@/types/group.types";
import { useState } from "react";
import { useDispatch } from "react-redux";

type ProfileActionsProps = {
  group: Group;
  setGroup: React.Dispatch<React.SetStateAction<Group | null>>;
};

const GroupActions = ({ group, setGroup }: ProfileActionsProps) => {
  const dispatch = useDispatch();
  const [editGroupModalOpen, setEditGroupModalOpen] = useState<boolean>(false);
  const [warningUnfriendModalOpen, setWarningUnfriendModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLeaveGroup = async () => {
    setIsLoading(true);
    setWarningUnfriendModalOpen(false);
    const response = await fetchApi(
      `/api/users/me/groups/${group.id}`,
      "DELETE",
      dispatch
    );

    if (response?.status === "success") {
      const updatedgroup: Group = {
        ...group,
        memberCount: group.memberCount - 1,
        userGroupRelation: UserGroupRelation.NOT_MEMBER,
      };
      setGroup(updatedgroup);
    }
    setIsLoading(false);
  };

  const handleSendGroupJoinRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi<GroupJoinRequest>(
      `/api/groups/${group.id}/requests`,
      "POST",
      dispatch
    );

    if (response) {
      const updatedGroup: Group = {
        ...group,
        userGroupRelation: UserGroupRelation.OUTGOING_REQUEST,
        groupJoinRequest: response,
      };
      setGroup(updatedGroup);
    }
    setIsLoading(false);
  };

  const handleCancelRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/groups/requests/${group.groupJoinRequest?.id}`,
      "PATCH",
      dispatch,
      {
        status: GroupJoinRequestStatus.CANCELLED,
      }
    );

    if (response?.status === "success") {
      const updatedGroup: Group = {
        ...group,
        userGroupRelation: UserGroupRelation.NOT_MEMBER,
        groupJoinRequest: null,
      };
      setGroup(updatedGroup);
    }
    setIsLoading(false);
  };

  const hideEditGroupModal = () => {
    setEditGroupModalOpen(false);
  };

  const showEditGroupModal = () => {
    setEditGroupModalOpen(true);
  };

  /**  If the user is the owner of the group, show an "Edit Group" button. */
  if (group.userGroupRelation === UserGroupRelation.ADMIN) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <CreateOrUpdateGroupModal
          hideModal={hideEditGroupModal}
          open={editGroupModalOpen}
          group={group}
          setGroup={setGroup}
        />
        <button
          onClick={showEditGroupModal}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold  h-10
          py-2 px-4 rounded flex justify-center items-center">
          <div className="mb-1   mr-1">
            <EditProfileIcon />
          </div>
          Edit Group
        </button>
      </div>
    );
  }

  /**  If user is the member of the group, show a "Leave Group" button. */
  if (group.userGroupRelation === UserGroupRelation.MEMBER) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <WarningModal
          warningContent={`Are you sure you want to leave ${group.name}? This action cannot be undone.`}
          open={warningUnfriendModalOpen}
          onClose={() => setWarningUnfriendModalOpen(false)}
          onConfirm={handleLeaveGroup}
        />
        <button></button>
        <button
          disabled={isLoading}
          onClick={() => setWarningUnfriendModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold h-10
          py-2 px-4 rounded flex justify-center items-center">
          <div className="mb-[2px] mr-1">
            <RemoveFriendIcon color="white" />
          </div>
          Leave Group
        </button>
      </div>
    );
  }

  /**  If the user is not a member of the group, show a "Join Group" button. */
  if (group.userGroupRelation === UserGroupRelation.NOT_MEMBER) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <button
          disabled={isLoading}
          onClick={handleSendGroupJoinRequest}
          className="bg-primary text-white font-semibold py-2 px-4 rounded flex h-10 items-center justify-center">
          <div className="mb-[2px] mr-1">
            <AddFriendIcon />
          </div>
          Join Group
        </button>
      </div>
    );
  }

  /**  If the user sent a group join request, show a "Cancel Request" button. */
  if (group.userGroupRelation === UserGroupRelation.OUTGOING_REQUEST) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <button
          disabled={isLoading}
          onClick={handleCancelRequest}
          className="flex flex-row bg-grey/50 hover:bg-grey/80 text-black font-semibold h-10 py-2 px-4 rounded">
          <div className="mr-1 mt-[1px]">
            <CancelFriendRequestIcon />
          </div>
          Cancel Request
        </button>
      </div>
    );
  }
};

export default GroupActions;

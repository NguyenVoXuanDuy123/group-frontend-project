/* eslint-disable @typescript-eslint/no-unused-vars */
import InfiniteScroll from "@/components/Common/InfiniteScroll";
import CreateOrEditGroupModal from "@/components/Group/CreateOrEditGroupModal";
import ProfileGroupCard from "@/components/Profile/ProfileGroupCard";
import PlusIcon from "@/components/svg/PlusIcon";
import { GroupRole, GroupStatus } from "@/enums/group.enums";
import { UserRole } from "@/enums/user.enums";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { GroupCard } from "@/types/group.types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const ProfileMyGroups = () => {
  const { user } = useOutletContext<ProfileLayoutContextType>();
  const { user: authenticatedUser } = useAuth();
  const { username, role } = authenticatedUser || {
    username: "",
    role: UserRole.USER,
  };
  const [groupStatus, setGroupStatus] = useState<GroupStatus>(
    GroupStatus.APPROVED
  );
  const [CreateNewGroupModalOpen, setCreateNewGroupModalOpen] =
    useState<boolean>(false);

  // Only allow fetching if the user is viewing their own profile
  const isAllowFetch = user.username === username;

  const [approvedGroups, setApprovedGroups, loadMoreApprovedGroups] =
    useInfiniteScroll<GroupCard>({
      endpoint: `/api/users/me/groups`,
      limit: 10,
      queryParams: {
        status: GroupStatus.APPROVED,
        groupRole: GroupRole.ADMIN,
      },
      isAllowFetch: isAllowFetch,
    });

  const [pendingGroups, setPendingGroups, loadMorePendingGroups] =
    useInfiniteScroll<GroupCard>({
      endpoint: `/api/users/me/groups`,
      limit: 10,
      queryParams: {
        status: GroupStatus.PENDING,
        groupRole: GroupRole.ADMIN,
      },
      isAllowFetch: isAllowFetch,
    });

  const [rejectedGroups, _, loadMoreRejectedGroups] =
    useInfiniteScroll<GroupCard>({
      endpoint: `/api/users/me/groups`,
      limit: 10,
      queryParams: {
        status: GroupStatus.REJECTED,
        groupRole: GroupRole.ADMIN,
      },
      isAllowFetch: isAllowFetch,
    });

  console.log(approvedGroups);
  // only show groups if the user is viewing their own profile
  if (!isAllowFetch)
    return (
      <div className="py-10 bg-white rounded-xl mt-4">
        <p className="text-gray-500 text-center   ">
          You can not view groups of other users
        </p>
      </div>
    );

  const hideCreateNewGroupModal = () => {
    setCreateNewGroupModalOpen(false);
  };

  const showCreateNewGroupModal = () => {
    setCreateNewGroupModalOpen(true);
  };

  const loadMoreGroups = () => {
    if (groupStatus === GroupStatus.APPROVED) {
      loadMoreApprovedGroups();
    } else if (groupStatus === GroupStatus.PENDING) {
      loadMorePendingGroups();
    } else {
      loadMoreRejectedGroups();
    }
  };

  const setGroupCards = (
    callback: (prevGroups: GroupCard[]) => GroupCard[]
  ) => {
    if (role === UserRole.ADMIN) {
      setApprovedGroups(callback);
    } else setPendingGroups(callback);
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">My Groups</h2>
      <CreateOrEditGroupModal
        open={CreateNewGroupModalOpen}
        hideModal={hideCreateNewGroupModal}
        setGroupCards={setGroupCards}
      />
      <div className="flex justify-between items-center mt-1 ml-1">
        <div className="space-x-4 ">
          <button
            onClick={() => setGroupStatus(GroupStatus.APPROVED)}
            className={`${
              groupStatus === GroupStatus.APPROVED
                ? "bg-primary text-white scale-105 "
                : "text-light-grey bg-dark-grey"
            } px-4 py-2 rounded-md transition-transform duration-300 ease-in-out transform focus:outline-none hover:scale-105 `}>
            Approved
          </button>
          <button
            onClick={() => setGroupStatus(GroupStatus.PENDING)}
            className={`${
              groupStatus === GroupStatus.PENDING
                ? "bg-primary text-white scale-105 "
                : "text-light-grey bg-dark-grey"
            } px-4 py-2 rounded-md transition-transform duration-300 ease-in-out transform focus:outline-none hover:scale-105 `}>
            Pending
          </button>
          <button
            onClick={() => setGroupStatus(GroupStatus.REJECTED)}
            className={`${
              groupStatus === GroupStatus.REJECTED
                ? "bg-primary text-white scale-105 "
                : "text-light-grey bg-dark-grey"
            } px-4 py-2 rounded-md transition-transform duration-300 ease-in-out transform focus:outline-none hover:scale-105 `}>
            Rejected
          </button>
        </div>
        <div className="cursor-pointer" onClick={showCreateNewGroupModal}>
          <PlusIcon size={40} color="fill-primary" />
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-1">
        <InfiniteScroll
          items={
            groupStatus === GroupStatus.APPROVED
              ? approvedGroups
              : groupStatus === GroupStatus.PENDING
                ? pendingGroups
                : rejectedGroups
          }
          loadMore={loadMoreGroups}
          renderItem={(group) => (
            <div
              key={`group-${group._id}`}
              className="flex justify-center sm:justify-start">
              <ProfileGroupCard
                group={group}
                setGroupCards={setPendingGroups}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ProfileMyGroups;

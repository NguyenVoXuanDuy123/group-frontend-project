import CreateOrUpdateGroupModal from "@/components/Group/CreateOrUpdateGroupModal";
import ProfileGroupCard from "@/components/Profile/ProfileGroupCard";
import PlusIcon from "@/components/svg/PlusIcon";
import { GroupRole, GroupStatus } from "@/enums/group.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { RootState } from "@/redux/store";
import { GroupCard } from "@/types/group.types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const ProfileMyGroups = () => {
  const [groups, setGroups] = useState<GroupCard[]>([]);
  const [groupStatus, setGroupStatus] = useState<GroupStatus>(
    GroupStatus.APPROVED
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useOutletContext<ProfileLayoutContextType>();
  const { username } = useSelector(
    (state: RootState) => state.auth.user || { username: "" }
  );
  const [CreateNewGroupModalOpen, setCreateNewGroupModalOpen] =
    useState<boolean>(false);
  useEffect(() => {
    // only fetch groups if the user is viewing their own profile, not someone else's
    if (user.username !== username) {
      return;
    }
    // fetch groups of the profile owner
    const queryParams = new URLSearchParams({
      limit: "50",
      status: groupStatus,
      groupRole: GroupRole.ADMIN,
    }).toString();
    const fetchGroups = async () => {
      const groups = await fetchApi<GroupCard[]>(
        `/api/users/${user._id}/groups?${queryParams}`,
        "GET",
        dispatch
      );
      if (groups) {
        setGroups(groups);
      }
      setIsLoading(false);
    };
    fetchGroups();
  }, [dispatch, groupStatus, user._id, user.username, username]);

  // only show groups if the user is viewing their own profile
  if (user.username !== username)
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

  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">My Groups</h2>
      <CreateOrUpdateGroupModal
        open={CreateNewGroupModalOpen}
        hideModal={hideCreateNewGroupModal}
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
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-4">
        {groups.map((group) => {
          return (
            <div
              key={group._id}
              className="flex justify-center sm:justify-start">
              <ProfileGroupCard
                _id={group._id}
                memberCount={group.memberCount}
                name={group.name}
                visibilityLevel={group.visibilityLevel}
              />
            </div>
          );
        })}
      </div>
      {groups.length === 0 && !isLoading && (
        <p className="text-gray-500 text-center mt-4">No groups to show</p>
      )}
    </div>
  );
};

export default ProfileMyGroups;

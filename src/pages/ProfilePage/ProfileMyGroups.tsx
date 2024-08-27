import ProfileGroupCard from "@/components/Profile/ProfileGroupCard";
import { GroupRole, GroupStatus } from "@/enums/group.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { RootState } from "@/redux/store";
import { GroupCard } from "@/types/group.types";
import { UserProfile } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const ProfileMyGroups = () => {
  const [groups, setGroups] = useState<GroupCard[]>([]);
  const [groupStatus, setGroupStatus] = useState<GroupStatus>(
    GroupStatus.APPROVED
  );
  const dispatch = useDispatch();
  const user = useOutletContext<UserProfile>();
  const { username } = useSelector(
    (state: RootState) => state.auth.user || { username: "" }
  );
  useEffect(() => {
    // only fetch groups if the user is viewing their own profile, not someone else's
    if (user.username !== username) {
      dispatch(
        setToast({
          message: "You can only view your own groups",
          type: "error",
        })
      );
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
        `/api/users/${user.id}/groups?${queryParams}`,
        "GET",
        dispatch
      );
      if (groups) {
        setGroups(groups);
      }
    };
    fetchGroups();
  }, [dispatch, groupStatus, user.id, user.username, username]);

  // only show groups if the user is viewing their own profile
  if (user.username !== username) return <h1>Forbidden</h1>;
  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Groups</h2>
      <div className="flex space-x-4 mt-1">
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
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-4">
        {groups.map((group) => {
          return (
            <div
              key={group.id}
              className="flex justify-center sm:justify-start">
              <ProfileGroupCard
                id={group.id}
                memberCount={group.memberCount}
                name={group.name}
                visibilityLevel={group.visibilityLevel}
              />
            </div>
          );
        })}
      </div>
      {groups.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No groups to show</p>
      )}
    </div>
  );
};

export default ProfileMyGroups;

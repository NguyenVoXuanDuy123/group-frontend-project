import ProfileGroupCard from "@/components/Profile/ProfileGroupCard";
import { fetchApi } from "@/helpers/fetchApi";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { GroupCard } from "@/types/group.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const ProfileGroups = () => {
  // list of groups of the profile owner
  const [groups, setGroups] = useState<GroupCard[]>([]);
  const dispatch = useDispatch();
  const { user } = useOutletContext<ProfileLayoutContextType>();
  useEffect(() => {
    // fetch groups of the profile owner
    const fetchGroups = async () => {
      const groups = await fetchApi<GroupCard[]>(
        `/api/users/${user.id}/groups?limit=50`,
        "GET",
        dispatch
      );
      if (groups) {
        setGroups(groups);
      }
    };
    fetchGroups();
  }, [dispatch, user.id]);

  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Groups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-1  ">
        {groups.map((group) => {
          return (
            <div className="flex justify-center sm:justify-start">
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

export default ProfileGroups;

import ProfileFriendCard from "@/components/Profile/ProfileFriendCard";
import { UserGroupRelation } from "@/enums/group.enums";
import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { GroupLayoutContextType } from "@/pages/layout/GroupLayout";
import { UserInformation } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const GroupMembers = () => {
  const [members, setMembers] = useState<UserInformation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { group } = useOutletContext<GroupLayoutContextType>();
  const { admin } = group;
  useEffect(() => {
    // fetch members of the group
    const fetchGroups = async () => {
      const members = await fetchApi<UserInformation[]>(
        `/api/groups/${group.id}/members?limit=50`,
        "GET",
        dispatch
      );
      if (members) {
        setMembers(members);
      }
      setIsLoading(false);
    };
    fetchGroups();
  }, [dispatch, group.id]);
  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Admin</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  mt-1">
        <ProfileFriendCard
          fullName={getFullName(admin)}
          avatar={admin.avatar}
          mutualFriendCount={admin.mutualFriendCount}
          username={admin.username}
        />
      </div>
      <h2 className="text-lg font-bold text-gray-900">Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  mt-1">
        {members.map((friend) => {
          return (
            <div
              className="flex justify-center sm:justify-start"
              key={`group-member-${friend.id}`}>
              <ProfileFriendCard
                fullName={getFullName(friend)}
                mutualFriendCount={friend.mutualFriendCount}
                username={friend.username}
                avatar={friend.avatar}
              />
            </div>
          );
        })}
      </div>
      {members.length === 0 && !isLoading && (
        <p className="text-gray-500 text-center mt-4">
          {group.userGroupRelation === UserGroupRelation.NOT_MEMBER
            ? "Join the group to see members"
            : "No members to show"}
        </p>
      )}
    </div>
  );
};

export default GroupMembers;

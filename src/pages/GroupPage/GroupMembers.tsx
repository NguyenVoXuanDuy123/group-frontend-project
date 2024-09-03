import InfiniteScroll from "@/components/Common/InfiniteScroll";
import UserCard from "@/components/Common/UserCard";
import { UserGroupRelation } from "@/enums/group.enums";
import getFullName from "@/helpers/getFullName";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import GroupAdminActions from "@/pages/GroupPage/GroupAdminActions";
import { GroupLayoutContextType } from "@/pages/layout/GroupLayout";
import { UserInformation } from "@/types/user.types";
import { useOutletContext } from "react-router-dom";

const GroupMembers = () => {
  const { group, setGroup } = useOutletContext<GroupLayoutContextType>();
  const { admin, userGroupRelation } = group;
  const [members, setMembers, loadMoreMembers] =
    useInfiniteScroll<UserInformation>({
      endpoint: `/api/groups/${group._id}/members`,
      limit: 10,
      idBased: true,
    });
  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Admin</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  mt-1">
        <UserCard
          fullName={getFullName(admin)}
          avatar={admin.avatar}
          mutualFriendCount={admin.mutualFriendCount}
          username={admin.username}
        />
      </div>
      <h2 className="text-lg font-bold text-gray-900">Members</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  mt-1">
        <InfiniteScroll
          items={members}
          loadMore={loadMoreMembers}
          renderItem={(member) => (
            <div
              className="flex justify-center sm:justify-start relative"
              key={`group-member-${member._id}`}>
              <UserCard
                fullName={getFullName(member)}
                mutualFriendCount={member.mutualFriendCount}
                username={member.username}
                avatar={member.avatar}
              />
              {userGroupRelation === UserGroupRelation.ADMIN && (
                <div className="absolute right-6 bottom-[40%] z-50 ">
                  <GroupAdminActions
                    group={group}
                    setMembers={setMembers}
                    userId={member._id}
                    setGroup={setGroup}
                  />
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default GroupMembers;

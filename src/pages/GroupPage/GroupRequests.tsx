import InfiniteScroll from "@/components/Common/InfiniteScroll";
import GroupJoinRequestCard from "@/components/Group/GroupJoinRequestCard";
import { UserGroupRelation } from "@/enums/group.enums";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GroupLayoutContextType } from "@/pages/layout/GroupLayout";
import { GroupJoinRequestCardType } from "@/types/group.types";
import { useOutletContext } from "react-router-dom";

const GroupRequests = () => {
  const { group, setGroup } = useOutletContext<GroupLayoutContextType>();

  const [
    groupJoinRequests,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setGroupJoinRequests,
    loadMoreGroupJoinRequests,
    isLoading,
  ] = useInfiniteScroll<GroupJoinRequestCardType>({
    endpoint: `/api/groups/${group._id}/pending-requests`,
    limit: 10,

    // Only allow fetching if the user is the admin of the group
    isAllowFetch: group.userGroupRelation === UserGroupRelation.ADMIN,
  });

  if (group.userGroupRelation !== UserGroupRelation.ADMIN)
    return (
      <div className="py-10 bg-white rounded-xl mt-4">
        <p className="text-gray-500 text-center   ">
          Just the admin group can view join requests
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Group Join Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  mt-1">
        <InfiniteScroll
          items={groupJoinRequests}
          loadMore={loadMoreGroupJoinRequests}
          renderItem={(groupJoinRequests) => (
            <div
              key={`group-join-request-${groupJoinRequests._id}`}
              className="flex justify-center sm:justify-start">
              <GroupJoinRequestCard
                senderDetail={groupJoinRequests.senderDetail}
                createdAt={groupJoinRequests.createdAt}
                group={group}
                groupJoinRequest={groupJoinRequests}
                setGroup={setGroup}
              />
            </div>
          )}
        />
      </div>
      {groupJoinRequests.length === 0 && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-4">
          <p className="text-gray-500 text-center   ">
            No group join requests to show
          </p>
        </div>
      )}
    </div>
  );
};

export default GroupRequests;

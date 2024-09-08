import GroupCreationRequestCard from "@/components/Admin/GroupCreationRequestCard";
import InfiniteScroll from "@/components/Common/InfiniteScroll";
import { UserRole } from "@/enums/user.enums";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import NoPage from "@/pages/NoPage";
import { GroupCard } from "@/types/group.types";

const GroupCreationRequests = () => {
  const { user } = useAuth();
  const { role } = user || {
    role: UserRole.USER,
  };

  const [groups, , loadMoreGroups, isLoading] = useInfiniteScroll<GroupCard>({
    endpoint: `/api/groups/admin/creation-requests`,
    limit: 10,
    // Only allow fetching if the user is an admin
    isAllowFetch: role === UserRole.ADMIN,
  });

  if (role !== UserRole.ADMIN) {
    return <NoPage />;
  }

  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-2xl font-bold mb-4">Group Creation Requests</h2>

      <div className="space-y-2">
        <InfiniteScroll
          loadMore={loadMoreGroups}
          items={groups}
          renderItem={(group) => (
            <div
              key={`group-${group._id}`}
              className="flex justify-center sm:justify-start ">
              <GroupCreationRequestCard groupCreationRequest={group} />
            </div>
          )}
        />
      </div>

      {groups.length === 0 && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-4">
          <p className="text-gray-500 text-center">
            No groups creation requests to show
          </p>
        </div>
      )}
    </div>
  );
};

export default GroupCreationRequests;

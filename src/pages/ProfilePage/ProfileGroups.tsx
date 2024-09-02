import InfiniteScroll from "@/components/Common/InfiniteScroll";
import ProfileGroupCard from "@/components/Profile/ProfileGroupCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { GroupCard } from "@/types/group.types";
import { useOutletContext } from "react-router-dom";

const ProfileGroups = () => {
  // list of groups of the profile owner

  const { user } = useOutletContext<ProfileLayoutContextType>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groups, _, loadMoreGroups, isLoading] = useInfiniteScroll<GroupCard>({
    endpoint: `/api/users/${user.id}/groups`,
    limit: 10,
    idBased: true,
  });

  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Groups </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-1">
        <InfiniteScroll
          loadMore={loadMoreGroups}
          items={groups}
          renderItem={(group) => (
            <div
              key={`group-${group.id}`}
              className="flex justify-center sm:justify-start">
              <ProfileGroupCard
                id={group.id}
                name={group.name}
                memberCount={group.memberCount}
                visibilityLevel={group.visibilityLevel}
              />
            </div>
          )}
        />
      </div>
      {groups.length === 0 && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-4">
          <p className="text-gray-500 text-center">No groups to show</p>
        </div>
      )}
    </div>
  );
};

export default ProfileGroups;

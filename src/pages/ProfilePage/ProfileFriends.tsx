import InfiniteScroll from "@/components/Common/InfiniteScroll";
import UserCard from "@/components/Common/UserCard";
import getFullName from "@/helpers/getFullName";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { UserProfile } from "@/types/user.types";
import { useOutletContext } from "react-router-dom";

const ProfileFriends = () => {
  const { user } = useOutletContext<ProfileLayoutContextType>();

  const [friends, , loadMoreFriends, isLoading] =
    useInfiniteScroll<UserProfile>({
      endpoint: `/api/users/${user._id}/friends`,
      limit: 20,
      idBased: true,
      dataPerRender: 10,
    });

  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">
        Friends{" "}
        <span className="text-dark-grey font-semibold">
          ({user.friendCount})
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-1">
        <InfiniteScroll
          loadMore={loadMoreFriends}
          items={friends}
          renderItem={(friend) => (
            <div
              key={`friend-${friend._id}`}
              className="flex justify-center sm:justify-start">
              <UserCard
                fullName={getFullName(friend)}
                mutualFriendCount={friend.mutualFriendCount}
                username={friend.username}
                avatar={friend.avatar}
              />
            </div>
          )}
        />
      </div>
      {friends.length === 0 && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-4">
          <p className="text-gray-500 text-center">No friends to show</p>
        </div>
      )}
    </div>
  );
};

export default ProfileFriends;

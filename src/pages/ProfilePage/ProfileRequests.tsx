import InfiniteScroll from "@/components/Common/InfiniteScroll";
import FriendRequestCard from "@/components/Profile/FriendRequestCard";
import getFullName from "@/helpers/getFullName";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { RootState } from "@/redux/store";
import { FriendRequestCardType } from "@/types/user.types";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const ProfileRequests = () => {
  const [friendRequests, setFriendRequests, fetchMoreRequests, isLoading] =
    useInfiniteScroll<FriendRequestCardType>({
      endpoint: "/api/users/me/friends/pending-requests",
      limit: 10,
    });
  const { user, setUser } = useOutletContext<ProfileLayoutContextType>();
  const { username } = useSelector(
    (state: RootState) => state.auth.user || { username: "" }
  );

  if (user.username !== username)
    return (
      <div className="py-10 bg-white rounded-xl mt-4">
        <p className="text-gray-500 text-center   ">
          You can not view friend requests of other users
        </p>
      </div>
    );
  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Friend Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  mt-1">
        <InfiniteScroll
          renderItem={(friendRequest) => (
            <div
              className="flex justify-center sm:justify-start"
              key={`friend-request-${friendRequest.id}`}>
              <FriendRequestCard
                user={user}
                fullName={getFullName(friendRequest.senderDetail)}
                mutualFriendCount={friendRequest.senderDetail.mutualFriendCount}
                username={friendRequest.senderDetail.username}
                avatar={friendRequest.senderDetail.avatar}
                setUser={setUser}
                friendRequest={friendRequest}
                setFriendRequests={setFriendRequests}
              />
            </div>
          )}
          items={friendRequests}
          loadMore={fetchMoreRequests}
        />
      </div>
      {friendRequests.length === 0 && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-4">
          <p className="text-gray-500 text-center   ">
            No friend requests to show
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileRequests;

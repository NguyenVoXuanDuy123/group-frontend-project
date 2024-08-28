import UserCard from "@/components/Common/UserCard/ProfileFriendCard";
import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { UserInformation } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const ProfileFriends = () => {
  // list of friends of profile owner
  const [friends, setFriends] = useState<UserInformation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { user } = useOutletContext<ProfileLayoutContextType>();

  useEffect(() => {
    // fetch friends of the profile owner
    const fetchFriends = async () => {
      const friends = await fetchApi<UserInformation[]>(
        `/api/users/${user.id}/friends?limit=50`,
        "GET",
        dispatch
      );
      if (friends) {
        setFriends(friends);
      }
      setIsLoading(false);
    };
    fetchFriends();
  }, [dispatch, user.id]);

  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  mt-1">
        {friends.map((friend) => {
          return (
            <div
              key={`friend-${friend.id}`}
              className="flex justify-center sm:justify-start">
              <UserCard
                fullName={getFullName(friend)}
                mutualFriendCount={friend.mutualFriendCount}
                username={friend.username}
                avatar={friend.avatar}
              />
            </div>
          );
        })}
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

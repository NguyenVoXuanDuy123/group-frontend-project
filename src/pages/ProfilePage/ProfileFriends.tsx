import ProfileFriendCard from "@/components/Profile/ProfileFriendCard";
import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { FriendType, UserProfile } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const ProfileFriends = () => {
  // list of friends of profile owner
  const [friends, setFriends] = useState<FriendType[]>([]);

  const dispatch = useDispatch();
  const user = useOutletContext<UserProfile>();

  useEffect(() => {
    // fetch friends of the profile owner
    const fetchFriends = async () => {
      const response = await fetchApi<FriendType[]>(
        `/api/users/${user.id}/friends?limit=50`,
        "GET",
        dispatch
      );
      if (response) {
        setFriends(response);
      }
    };
    fetchFriends();
  }, [dispatch, user.id]);

  return (
    <div className="bg-white rounded-xl p-4">
      <h2 className="text-lg font-bold text-gray-900">Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  ">
        {friends.map((friend) => {
          return (
            <div className="flex justify-center sm:justify-start">
              <ProfileFriendCard
                name={getFullName(friend)}
                mutualFriendCount={friend.mutualFriendCount}
                username={friend.username}
                avatar={friend.avatar}
              />
            </div>
          );
        })}
      </div>
      {friends.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No friends to show</p>
      )}
    </div>
  );
};

export default ProfileFriends;

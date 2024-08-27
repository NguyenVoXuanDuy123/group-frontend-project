import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import FriendCard from "@/pages/ProfilePage/ProfileFriends/FriendCard";
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
        `/api/users/${user.id}/friends`,
        "GET",
        dispatch
      );
      if (response) {
        setFriends(response);
      }
    };
    fetchFriends();
  }, [dispatch, user.id]);

  console.log(friends);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 bg-white p-4 rounded-xl ">
      {friends.map((friend) => (
        <div key={friend.id} className="flex justify-center sm:justify-start">
          <FriendCard
            name={getFullName(friend)}
            mutualFriendCount={friend.mutualFriendCount}
            username={friend.username}
            avatar={friend.avatar}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileFriends;

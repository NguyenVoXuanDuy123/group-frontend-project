import FriendCard from "@/components/SideBarRight/FriendCard";
import { fetchApi } from "@/helpers/fetchApi";
import { RootState } from "@/redux/store";
import { UserInformation } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SideBarRight = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [friends, setFriends] = useState<UserInformation[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const numberOfFriends = 9;
      const response = await fetchApi<UserInformation[]>(
        `/api/users/me/friends?limit=${numberOfFriends}`,
        "GET",
        dispatch
      );
      if (response.status === "success") {
        setFriends(response.result);
      }
    };
    fetchFriends();
  }, [dispatch]);

  if (!user) return null;

  return (
    <div className="w-80 h-screen p-4 sticky top-0 bg-white">
      <div className="my-4">
        <h2 className="text-lg font-bold mb-1">Friends</h2>
        {friends.map((friend) => {
          return (
            <FriendCard
              key={friend._id}
              username={friend.username}
              name={friend.firstName + " " + friend.lastName}
              avatar={friend.avatar}
              mutualFriendCount={friend.mutualFriendCount}
            />
          );
        })}
        {friends.length === 0 && (
          <div className="text-center text-dark-grey font-bold mt-4">
            Let's make some friends
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarRight;

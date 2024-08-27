import NotificationIcon from "@/components/svg/side-bar-icons/NotificationIcon";
import SideBarRightFriendCard from "@/components/SideBarRight/SideBarRightFriendCard";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FriendType } from "@/types/user.types";
import { fetchApi } from "@/helpers/fetchApi";
import AvatarWithPopover from "@/components/SideBarRight/AvatarWithPopover";

const SideBarRight = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [friends, setFriends] = useState<FriendType[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const numberOfFriends = 9;
      const response = await fetchApi<FriendType[]>(
        `/api/users/me/friends?limit=${numberOfFriends}`,
        "GET",
        dispatch
      );
      if (response) {
        setFriends(response);
      }
    };
    fetchFriends();
  }, [dispatch]);

  if (!user) return null;

  return (
    <div className="w-80 h-screen p-4 sticky top-0 bg-white">
      <div className="flex justify-end">
        <div className="mr-3 flex items-center justify-center w-12 h-12 bg-light-grey rounded-full">
          <NotificationIcon />
        </div>
        <AvatarWithPopover avatar={user.avatar} username={user.username} />
      </div>
      <div className="my-4">
        <h2 className="text-lg font-bold mb-1">Friends</h2>
        {friends.map((friend) => {
          return (
            <SideBarRightFriendCard
              key={friend.id}
              username={friend.username}
              name={friend.firstName + " " + friend.lastName}
              avatar={friend.avatar}
              mutualFriendCount={friend.mutualFriendCount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SideBarRight;

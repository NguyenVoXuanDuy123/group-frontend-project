import FriendRequestCard from "@/components/Profile/FriendRequestCard";
import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { setToast } from "@/redux/slices/toastSlice";
import { RootState } from "@/redux/store";
import { FriendRequestCardType } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const ProfileRequests = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequestCardType[]>(
    []
  );
  const dispatch = useDispatch();
  const { user, setUser } = useOutletContext<ProfileLayoutContextType>();
  const { username } = useSelector(
    (state: RootState) => state.auth.user || { username: "" }
  );
  useEffect(() => {
    // only fetch friend requests if the user is viewing their own profile, not someone else's
    if (user.username !== username) {
      dispatch(
        setToast({
          message: "You can not view friend requests of other users",
          type: "error",
        })
      );
      return;
    }
    // fetch friend requests of the profile owner
    const fetchFriendRequests = async () => {
      const friendRequests = await fetchApi<FriendRequestCardType[]>(
        `/api/users/me/friends/pending-requests`,
        "GET",
        dispatch
      );
      if (friendRequests) {
        setFriendRequests(friendRequests);
      }
    };
    fetchFriendRequests();
  }, [dispatch, user.id, user.username, username]);
  if (user.username !== username)
    return (
      <p className="text-gray-500 text-center mt-4">
        You can not view friend requests of other users
      </p>
    );
  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Friend Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  mt-1">
        {friendRequests.map((friendRequest) => {
          const sender = friendRequest.senderDetail;
          return (
            <div className="flex justify-center sm:justify-start">
              <FriendRequestCard
                user={user}
                fullName={getFullName(sender)}
                mutualFriendCount={sender.mutualFriendCount}
                username={sender.username}
                avatar={sender.avatar}
                setUser={setUser}
                friendRequest={friendRequest}
                setFriendRequests={setFriendRequests}
              />
            </div>
          );
        })}
      </div>
      {friendRequests.length === 0 && (
        <p className="text-gray-500 text-center mt-4">
          No friend requests to show
        </p>
      )}
    </div>
  );
};

export default ProfileRequests;

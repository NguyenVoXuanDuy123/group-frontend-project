import { EditProfileModal } from "@/components/Profile/ProfileHeader/EditProfileModal";
import WarningModal from "@/components/Common/Modal/WarningUnfriendModal";

import AcceptFriendRequestIcon from "@/components/svg/profile-actions/AcceptFriendRequestIcon";
import AddFriendIcon from "@/components/svg/profile-actions/AddFriendIcon";
import CancelFriendRequestIcon from "@/components/svg/profile-actions/CancelFriendRequestIcon";
import EditProfileIcon from "@/components/svg/profile-actions/EditProfileIcon";
import RemoveFriendIcon from "@/components/svg/profile-actions/RemoveFriendIcon";
import { FriendRequestStatus, UserFriendRelation } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { FriendRequest, UserProfile } from "@/types/user.types";
import { useState } from "react";
import { useDispatch } from "react-redux";

type ProfileActionsProps = {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
};

const ProfileActions = ({ user, setUser }: ProfileActionsProps) => {
  const dispatch = useDispatch();
  const [editProfileModalOpen, setEditProfileModalOpen] =
    useState<boolean>(false);
  const [warningUnfriendModalOpen, setWarningUnfriendModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRemoveFriend = async () => {
    setIsLoading(true);
    setWarningUnfriendModalOpen(false);
    const response = await fetchApi(
      `/api/users/me/friends/${user.id}`,
      "DELETE",
      dispatch
    );

    if (response?.status === "success") {
      const updatedUser: UserProfile = {
        ...user,
        friendCount: user.friendCount - 1,
        userFriendRelation: UserFriendRelation.NOT_FRIEND,
      };
      setUser(updatedUser);
    }
    setIsLoading(false);
  };

  const handleAddFriend = async () => {
    setIsLoading(true);
    const response = await fetchApi<FriendRequest>(
      `/api/users/me/friends/${user.id}/requests`,
      "POST",
      dispatch
    );

    if (response) {
      const updatedUser: UserProfile = {
        ...user,
        userFriendRelation: UserFriendRelation.OUTGOING_REQUEST,
        friendRequest: response,
      };
      setUser(updatedUser);
    }
    setIsLoading(false);
  };

  const handleCancelRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/users/me/friends/requests/${user.friendRequest?.id}`,
      "PATCH",
      dispatch,
      {
        status: FriendRequestStatus.CANCELLED,
      }
    );

    if (response?.status === "success") {
      const updatedUser: UserProfile = {
        ...user,
        userFriendRelation: UserFriendRelation.NOT_FRIEND,
        friendRequest: null,
      };
      setUser(updatedUser);
    }
    setIsLoading(false);
  };

  const handleAcceptRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/users/me/friends/requests/${user.friendRequest?.id}`,
      "PATCH",
      dispatch,
      {
        status: FriendRequestStatus.ACCEPTED,
      }
    );

    if (response?.status === "success") {
      const updatedUser: UserProfile = {
        ...user,
        friendCount: user.friendCount + 1,
        userFriendRelation: UserFriendRelation.FRIEND,
        friendRequest: null,
      };
      setUser(updatedUser);
    }
    setIsLoading(false);
  };

  const handleDeclineRequest = async () => {
    setIsLoading(true);
    const response = await fetchApi(
      `/api/users/me/friends/requests/${user.friendRequest?.id}`,
      "PATCH",
      dispatch,
      {
        status: FriendRequestStatus.REJECTED,
      }
    );

    if (response?.status === "success") {
      const updatedUser: UserProfile = {
        ...user,
        userFriendRelation: UserFriendRelation.NOT_FRIEND,
        friendRequest: null,
      };
      setUser(updatedUser);
    }
    setIsLoading(false);
  };

  /**  If the user is viewing their own profile, show an "Edit Profile" button.  */
  if (user.userFriendRelation === UserFriendRelation.SELF) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <EditProfileModal
          open={editProfileModalOpen}
          onClose={() => setEditProfileModalOpen(false)}
          user={user}
          setUser={setUser}
        />
        <button
          onClick={() => setEditProfileModalOpen(true)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold  h-10
          py-2 px-4 rounded flex justify-center items-center">
          <div className="mb-1   mr-1">
            <EditProfileIcon />
          </div>
          Edit Profile
        </button>
      </div>
    );
  }

  /**  If the user is friends with the profile owner, show an "Unfriend" button. */
  if (user.userFriendRelation === UserFriendRelation.FRIEND) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <WarningModal
          warningContent={`Are you sure you want to remove ${getFullName(user)} as a friend? This action cannot be undone.`}
          open={warningUnfriendModalOpen}
          onClose={() => setWarningUnfriendModalOpen(false)}
          onConfirm={handleRemoveFriend}
        />
        <button></button>
        <button
          disabled={isLoading}
          onClick={() => setWarningUnfriendModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold h-10
          py-2 px-4 rounded flex justify-center items-center">
          <div className="mb-[2px] mr-1">
            <RemoveFriendIcon color="white" />
          </div>
          Remove Friend
        </button>
      </div>
    );
  }

  /**  If the user is not friends with the profile owner, show an "Add Friend" button. */
  if (user.userFriendRelation === UserFriendRelation.NOT_FRIEND) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <button
          disabled={isLoading}
          onClick={handleAddFriend}
          className="bg-primary text-white font-semibold py-2 px-4 rounded flex h-10 items-center justify-center">
          <div className="mb-[2px] mr-1">
            <AddFriendIcon />
          </div>
          Add Friend
        </button>
      </div>
    );
  }

  /**  If the user has sent a friend request to the profile owner, show a "Cancel Request" button. */
  if (user.userFriendRelation === UserFriendRelation.OUTGOING_REQUEST) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <button
          disabled={isLoading}
          onClick={handleCancelRequest}
          className="flex flex-row bg-grey/50 hover:bg-grey/80 text-black font-semibold h-10 py-2 px-4 rounded">
          <div className="mr-1 mt-[1px]">
            <CancelFriendRequestIcon />
          </div>
          Cancel Request
        </button>
      </div>
    );
  }

  /**  If the profile owner has sent a friend request to the user, show an "Accept" and "Decline" button. */
  if (user.userFriendRelation === UserFriendRelation.INCOMING_REQUEST) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <button
          onClick={handleAcceptRequest}
          disabled={isLoading}
          className="bg-primary  text-white font-semibold py-2 px-4 rounded flex h-10 justify-center items-center">
          <div className="mb-[2px] mr-1">
            <AcceptFriendRequestIcon />
          </div>
          Accept
        </button>
        <button
          onClick={handleDeclineRequest}
          disabled={isLoading}
          className="bg-grey/50 hover:bg-grey/80 text-black font-semibold py-2 px-4 h-10 rounded flex">
          <div className="mt-[1px] mr-1">
            <RemoveFriendIcon color="black" />
          </div>
          Decline
        </button>
      </div>
    );
  }
};

export default ProfileActions;

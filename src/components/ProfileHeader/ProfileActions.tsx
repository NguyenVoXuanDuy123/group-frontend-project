import { EditProfileModal } from "@/components/Modal/EditProfileModal";
import WarningUnfriendModal from "@/components/Modal/WarningUnfriendModal";
import { UserFriendRelation } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
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

  const handleUnfriend = async () => {
    setWarningUnfriendModalOpen(false);
    const response = await fetchApi(
      `/api/users/me/friends/${user.id}`,
      "DELETE",
      dispatch
    );

    if (response?.status === "success") {
      const updatedUser = {
        ...user,
        userFriendRelation: UserFriendRelation.NOT_FRIEND,
      };
      setUser(updatedUser);
    }
  };

  const handleAddFriend = async () => {
    const response = await fetchApi<FriendRequest>(
      `/api/users/me/friends/${user.id}/requests`,
      "POST",
      dispatch
    );

    if (response) {
      const updatedUser = {
        ...user,
        userFriendRelation: UserFriendRelation.OUTGOING_REQUEST,
      };
      setUser(updatedUser);
    }
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
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded">
          Edit Profile
        </button>
      </div>
    );
  }

  /**  If the user is friends with the profile owner, show an "Unfriend" button. */
  if (user.userFriendRelation === UserFriendRelation.FRIEND) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <WarningUnfriendModal
          open={warningUnfriendModalOpen}
          onClose={() => setWarningUnfriendModalOpen(false)}
          onConfirm={handleUnfriend}
        />
        <button
          onClick={() => setWarningUnfriendModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
          Unfriend
        </button>
      </div>
    );
  }

  /**  If the user is not friends with the profile owner, show an "Add Friend" button. */
  if (user.userFriendRelation === UserFriendRelation.NOT_FRIEND) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <button
          onClick={handleAddFriend}
          className="bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-4 rounded">
          Add Friend
        </button>
      </div>
    );
  }

  /**  If the user has sent a friend request to the profile owner, show a "Cancel Request" button. */
  if (user.userFriendRelation === UserFriendRelation.OUTGOING_REQUEST) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <button className="bg-primary text-white font-semibold py-2 px-4 rounded">
          Cancel Request
        </button>
      </div>
    );
  }

  /**  If the profile owner has sent a friend request to the user, show an "Accept" and "Decline" button. */
  if (user.userFriendRelation === UserFriendRelation.INCOMING_REQUEST) {
    return (
      <div className="mt-6 flex space-x-4 absolute right-0 bottom-0">
        <button className="bg-primary  text-white font-semibold py-2 px-4 rounded">
          Accept
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
          Decline
        </button>
      </div>
    );
  }
};

export default ProfileActions;

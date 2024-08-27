import ProfileActions from "@/components/ProfileHeader/ProfileActions";
// import UploadAvatarModal from "@/components/Modal/UploadAvatarModal";
import TabItem from "@/components/ProfileHeader/TabItem";
import Avatar from "@/components/user/Avatar";
import { UserFriendRelation } from "@/enums/user.enums";
import getFullName from "@/helpers/getFullName";
import { UserProfile } from "@/types/user.types";

import { useLocation, useNavigate } from "react-router-dom";

type ProfileHeaderProps = {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
};

const ProfileHeader = ({ user, setUser }: ProfileHeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-white pt-6 ">
      {/* Profile image and details */}
      <div className="flex items-center  relative ">
        {/* Avatar Upload Modal */}
        {/* <UploadAvatarModal open={open} onClose={() => setOpen(false)} /> */}

        {/* Profile Image */}
        <Avatar
          photoURL={user.avatar}
          size={168}
          //add key to Avatar component to force re-render (to update the image)
          key={user.avatar}
        />

        {/* Profile Details */}
        <div className="ml-6">
          <h1 className="text-3xl font-bold">{getFullName(user)}</h1>
          <span
            className="text-dark-grey font-semibold cursor-pointer hover:underline"
            onClick={() => {
              navigate(`/${user.username}/friends`);
            }}>
            {user.friendCount + " friends "}•{" "}
            {user.userFriendRelation !== UserFriendRelation.SELF &&
              user.mutualFriendCount + " mutual"}
          </span>
          {/* Bio */}
          <p className="mt-2 text-dark-grey m-0 w-[390px] break-words">
            {user.bio}
          </p>
        </div>

        {/* Edit Profile Action */}

        <ProfileActions user={user} setUser={setUser} />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-row border-t  mt-4  border-dark-grey/55  ">
        <TabItem
          title="Posts"
          url={`/${user.username}`}
          isActive={location.pathname === `/${user.username}`}
        />
        <TabItem
          title="Friends"
          url={`/${user.username}/friends`}
          isActive={location.pathname === `/${user.username}/friends`}
        />
        <TabItem
          title="Groups"
          url={`/${user.username}/groups`}
          isActive={location.pathname === `/${user.username}/groups`}
        />

        {/* If the user is viewing their own profile, show additional tabs */}
        {user.userFriendRelation === UserFriendRelation.SELF && (
          <>
            <TabItem
              title="My Groups"
              url={`/${user.username}/my-groups`}
              isActive={location.pathname === `/${user.username}/my-groups`}
            />
            <TabItem
              title="Friend requests"
              url={`/${user.username}/friend-requests`}
              isActive={
                location.pathname === `/${user.username}/friend-requests`
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;

import Avatar from "@/components/user/Avatar";
import { useNavigate } from "react-router-dom";

type FriendCardProps = {
  username?: string;
  name: string;
  mutualFriendCount: number;
};

const FriendCard = ({ username, name, mutualFriendCount }: FriendCardProps) => {
  const navigate = useNavigate();
  const onAvatarAndNameClick = () => {
    // if username is provided, navigate to the user's profile
    if (username) {
      navigate(`/${username}`);
    }
  };

  const onMutualFriendsClick = () => {
    // navigate to mutual friends page
    if (username) {
      navigate(`/${username}/friends`);
    }
  };

  return (
    <div className="items-center w-full rounded-lg flex mb-3 border p-2">
      <Avatar size={80} onClick={onAvatarAndNameClick} />

      <div className="flex flex-col">
        <span
          className="cursor-pointer ml-4 font-semibold hover:underline"
          onClick={onAvatarAndNameClick}>
          {name}
        </span>
        <span
          className="ml-4 cursor-pointer text-xs text-dark-grey hover:underline"
          onClick={onMutualFriendsClick}>
          {mutualFriendCount + " mutual friends"}
        </span>
      </div>
    </div>
  );
};

export default FriendCard;

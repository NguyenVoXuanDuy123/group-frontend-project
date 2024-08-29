import Avatar from "@/components/Common/User/Avatar";
import { Link } from "react-router-dom";

interface FriendCardProps {
  name: string;
  avatar: string;
  username: string;
  mutualFriendCount?: number;
}

const SideBarRightFriendCard = ({
  name,
  username,
  avatar,
  mutualFriendCount,
}: FriendCardProps) => {
  return (
    <div className=" items-center w-full rounded-lg flex mb-3">
      <Link to={`/${username}`}>
        <Avatar photoURL={avatar} />
      </Link>
      <div className="flex flex-col">
        <Link to={`/${username}`} className="h-5">
          <span className="ml-4 font-medium hover:underline">{name}</span>
        </Link>
        <Link to={`/${username}/friends`}>
          {mutualFriendCount && (
            <span className="ml-4 text-xs text-gray-500 hover:underline">
              {mutualFriendCount} mutual friends
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default SideBarRightFriendCard;

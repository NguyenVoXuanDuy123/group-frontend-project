import Avatar from "@/components/Common/User/Avatar";
import { truncateText } from "@/helpers/truncateText";
import { Link } from "react-router-dom";

type FriendCardProps = {
  name: string;
  avatar: string;
  username: string;
  mutualFriendCount?: number;
};

const FriendCard = ({
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
          <span className="ml-4 font-medium hover:underline">
            {truncateText(name, 25)}
          </span>
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

export default FriendCard;

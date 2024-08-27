import Avatar from "@/components/user/Avatar";
import { Link } from "react-router-dom";

type FriendCardProps = {
  username?: string;
  name: string;
  mutualFriendCount: number;
  avatar: string;
};

const FriendCard = ({
  username,
  name,
  mutualFriendCount,
  avatar,
}: FriendCardProps) => {
  return (
    <div className="items-center w-full rounded-lg flex mb-3 border p-2">
      <Link to={`/${username}`}>
        <Avatar size={80} photoURL={avatar} />
      </Link>

      <div className="flex flex-col">
        <Link to={`/${username}`} className="text-black no-underline h-[16px] ">
          <span className="cursor-pointer  ml-4 font-semibold hover:underline">
            {name}
          </span>
        </Link>

        <Link
          to={`/${username}/friends`}
          className="text-black no-underline h-[16px] ">
          <span className="ml-4   cursor-pointer text-xs text-dark-grey hover:underline">
            {mutualFriendCount + " mutual friends"}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

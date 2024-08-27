import Avatar from "@/components/user/Avatar";
import { Link } from "react-router-dom";

interface FriendCardProps {
  name: string;
  avatar: string;
  username: string;
}

const SideBarRightFriendCard = ({
  name,
  username,
  avatar,
}: FriendCardProps) => {
  return (
    <div className=" items-center w-full rounded-lg flex mb-3">
      <Link to={`/${username}`}>
        <Avatar photoURL={avatar} />
      </Link>
      <Link to={`/${username}`}>
        <span className="ml-4 font-medium hover:underline">{name}</span>
      </Link>
    </div>
  );
};

export default SideBarRightFriendCard;

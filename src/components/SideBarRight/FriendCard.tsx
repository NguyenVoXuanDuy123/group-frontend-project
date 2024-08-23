import Avatar from "../user/Avatar";

interface FriendCard {
  name: string;
  onclick: () => void;
}

const FriendCard = ({ name, onclick }: FriendCard) => {
  return (
    <div
      onClick={onclick}
      className="flex items-center w-full rounded-lg flex mb-3"
    >
      <Avatar />
      <span className="ml-4 font-medium">{name}</span>
    </div>
  );
};

export default FriendCard;

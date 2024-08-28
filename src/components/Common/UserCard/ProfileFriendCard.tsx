import Avatar from "@/components/user/Avatar";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type FriendCardProps = {
  username?: string;
  fullName: string;
  mutualFriendCount?: number;
  avatar: string;
};

const UserCard = ({
  username,
  fullName,
  mutualFriendCount,
  avatar,
}: FriendCardProps) => {
  const { username: authUserUsername } = useSelector(
    (state: RootState) => state.auth.user || { username: "" }
  );

  return (
    <div className="items-center w-full rounded-lg flex mb-3 border p-2">
      <Link to={`/${username}`}>
        <Avatar size={80} photoURL={avatar} />
      </Link>

      <div className="flex flex-col">
        <Link to={`/${username}`} className="text-black no-underline h-[16px] ">
          <span className="cursor-pointer ml-4 font-semibold hover:underline">
            {fullName}
          </span>
        </Link>

        {/*
         * If the user displayed is not the authenticated user, display the mutual friend count.
         * If the user displayed is the authenticated user, display "You" instead of the mutual friend
         */}
        {authUserUsername !== username ? (
          mutualFriendCount && (
            <Link
              to={`/${username}/friends`}
              className="text-black no-underline h-[16px] ">
              <span className="ml-4 cursor-pointer text-xs text-dark-grey hover:underline">
                {mutualFriendCount + " mutual friends"}
              </span>
            </Link>
          )
        ) : (
          <>
            <div className="h-1"></div>
            <span className="ml-4 text-xs text-dark-grey  flex">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 mr-[2px] text-dark-grey">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A8.963 8.963 0 0112 15c2.404 0 4.594.946 6.121 2.804M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5z"
                />
              </svg>
              This is you
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;

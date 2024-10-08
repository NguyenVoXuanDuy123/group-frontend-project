import Popover from "@/components/Common/Popover";
import Avatar from "@/components/Common/User/Avatar";
import { UserRole } from "@/enums/user.enums";
import { logOut } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

type AvatarWithPopoverProps = {
  avatar: string;
  username: string;
  role: UserRole;
};
const AvatarWithPopover = ({
  role,
  avatar,
  username,
}: AvatarWithPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logOut({ dispatch }));
  };
  return (
    <Popover
      popoverOpen={popoverOpen}
      setPopoverOpen={setPopoverOpen}
      displayComponent={<Avatar photoURL={avatar} />}>
      <div className="p-2 w-[150px] bg-white shadow-md rounded-md">
        {role !== UserRole.ADMIN && (
          <Link to={`/${username}`}>
            <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              View Profile
            </span>
          </Link>
        )}
        {role === UserRole.ADMIN && (
          <Link to="/admin-dashboard">
            <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Dashboard
            </span>
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">
          Logout
        </button>
      </div>
    </Popover>
  );
};

export default AvatarWithPopover;

import Avatar from "@/components/user/Avatar";
import { logOut } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

type AvatarWithPopoverProps = {
  avatar: string;
  username: string;
};
const AvatarWithPopover = ({ avatar, username }: AvatarWithPopoverProps) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    // Close popover if clicked outside
    if (
      popoverRef.current &&
      !(popoverRef.current as Node).contains(event.target as Node) &&
      avatarRef.current &&
      !(avatarRef.current as Node).contains(event.target as Node)
    ) {
      setPopoverOpen(false);
    }
  };

  const togglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  const handleLogout = () => {
    dispatch(logOut({ dispatch }));
  };
  return (
    <div className="relative inline-block text-left">
      <div onClick={togglePopover} ref={avatarRef}>
        <Avatar photoURL={avatar} />
      </div>
      {isPopoverOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
          <div className="p-2">
            <Link to={`/${username}`}>
              <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                View Profile
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarWithPopover;

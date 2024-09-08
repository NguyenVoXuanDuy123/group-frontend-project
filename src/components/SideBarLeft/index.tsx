import TabItem from "@/components/SideBarLeft/TabItem";
import FriendIcon from "@/components/svg/side-bar-icons/FriendIcon";
import GroupIcon from "@/components/svg/side-bar-icons/GroupIcon";
import LogOutIcon from "@/components/svg/side-bar-icons/LogOutIcon";
import NewsFeedIcon from "@/components/svg/side-bar-icons/NewsFeedIcon";
import { UserRole } from "@/enums/user.enums";
import { logOut } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminIcon from "../svg/AdminIcon";

const SideBarLeft = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return null;
  const { username, role } = user;
  const handleLogOut = () => {
    dispatch(logOut({ dispatch }));
  };

  return (
    <div className="sticky h-[calc(100vh-80px)] top-20 w-80 p-4 flex flex-col justify-between bg-white">
      <div className="flex flex-1 flex-col justify-between">
        <div className="">
          <Link to={`/`} className="text-black no-underline">
            <TabItem title="News Feed" icon={<NewsFeedIcon />} />
          </Link>
          <Link to={`/${username}/friends`} className="text-black no-underline">
            <TabItem title="Friends" icon={<FriendIcon />} />
          </Link>
          <Link to={`/${username}/groups`} className="text-black no-underline">
            <TabItem title="Groups" icon={<GroupIcon />} />
          </Link>
          {role === UserRole.ADMIN && (
            <Link to={`/admin-dashboard`} className="text-black no-underline">
              <TabItem title="Admin Dashboard" icon={<AdminIcon />} />
            </Link>
          )}
        </div>
        <div onClick={handleLogOut}>
          <TabItem title="Log Out" icon={<LogOutIcon />} />
        </div>
      </div>
    </div>
  );
};

export default SideBarLeft;

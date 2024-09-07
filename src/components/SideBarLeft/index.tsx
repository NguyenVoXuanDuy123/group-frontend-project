import TabItem from "@/components/SideBarLeft/TabItem";
import NewsFeedIcon from "@/components/svg/side-bar-icons/NewsFeedIcon";
import FriendIcon from "@/components/svg/side-bar-icons/FriendIcon";
import GroupIcon from "@/components/svg/side-bar-icons/GroupIcon";
import LogOutIcon from "@/components/svg/side-bar-icons/LogOutIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logOut } from "@/redux/slices/authSlice";
import { Link } from "react-router-dom";
import LogoWithName from "@/components/Common/LogoWithName";
import { UserRole } from "@/enums/user.enums";

const SideBarLeft = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return null;
  const { username, role } = user;
  const handleLogOut = () => {
    dispatch(logOut({ dispatch }));
  };

  return (
    <div className="w-80 h-screen p-4 flex flex-col justify-between sticky top-0 bg-white">
      <div className="h-[120px]">
        <LogoWithName />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
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
            <Link
              to={`/group-creation-requests`}
              className="text-black no-underline">
              <TabItem title="Group Creation Requests" icon={<GroupIcon />} />
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

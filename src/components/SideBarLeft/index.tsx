import { appName } from "@/constants";
import Logo from "@/components/svg/Logo";
import TabItem from "@/components/SideBarLeft/TabItem";
import NewsFeedIcon from "@/components/svg/side-bar-icons/NewsFeedIcon";
import FriendIcon from "@/components/svg/side-bar-icons/FriendIcon";
import GroupIcon from "@/components/svg/side-bar-icons/GroupIcon";
import LogOutIcon from "@/components/svg/side-bar-icons/LogOutIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logOut } from "@/redux/slices/authSlice";
import { Link } from "react-router-dom";

const SideBarLeft = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return null;
  const { username } = user;

  return (
    <div className="w-80 h-screen p-4 flex flex-col justify-between sticky top-0 bg-white">
      <div className="flex items-center mb-10 cursor-pointer ml-9">
        <Logo width={70} height={70} />
        <h1 className="text-[30px] font-bold ml-3 text-primary">{appName}</h1>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link to={`/`} className="text-black no-underline">
            <TabItem
              title="News Feed"
              icon={<NewsFeedIcon />}
              onclick={() => {}}
            />
          </Link>
          <Link to={`/${username}/friends`} className="text-black no-underline">
            <TabItem title="Friends" icon={<FriendIcon />} onclick={() => {}} />
          </Link>
          <Link to={`/${username}/groups`} className="text-black no-underline">
            <TabItem title="Groups" icon={<GroupIcon />} onclick={() => {}} />
          </Link>
        </div>
        <TabItem
          title="Log Out"
          icon={<LogOutIcon />}
          onclick={() => {
            dispatch(logOut({ dispatch }));
          }}
        />
      </div>
    </div>
  );
};

export default SideBarLeft;

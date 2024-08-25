import { appName } from "@/constants";
import Logo from "../svg/Logo";
import TabItem from "./TabItem";
import NewsFeedIcon from "../svg/side_bar_icons/NewsFeedIcon";
import FriendIcon from "../svg/side_bar_icons/FriendIcon";
import GroupIcon from "../svg/side_bar_icons/GroupIcon";
import LogOutIcon from "../svg/side_bar_icons/LogOutIcon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logOut } from "@/redux/slices/authSlice";

const SideBarLeft = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="w-80 h-screen p-4 flex flex-col justify-between sticky top-0 bg-white">
      <div className="flex items-center justify-center w-full mb-10">
        <Logo width={48} height={48} />
        <h1 className="text-2xl font-bold ml-5 text-primary">{appName}</h1>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <TabItem
            title="News Feed"
            icon={<NewsFeedIcon />}
            onclick={() => {}}
          />
          <TabItem title="Friends" icon={<FriendIcon />} onclick={() => {}} />
          <TabItem title="Groups" icon={<GroupIcon />} onclick={() => {}} />
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

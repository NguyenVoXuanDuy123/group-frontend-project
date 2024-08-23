import { appName } from "@/constants";
import Logo from "../svg/Logo";
import TabItem from "./TabItem";
import NewsFeedIcon from "../svg/side_bar_icons/NewsFeedIcon";
import FriendIcon from "../svg/side_bar_icons/FriendIcon";
import GroupIcon from "../svg/side_bar_icons/GroupIcon";
import LogOutIcon from "../svg/side_bar_icons/LogOutIcon";

const SideBarLeft = () => {
  return (
    <div className="w-80 h-screen p-4 flex flex-col justify-between sticky top-0">
      <div className="flex flex-col items-center">
        <Logo width={64} height={64} />
        <h1 className="text-2xl font-bold mt-2 mb-8">{appName}</h1>
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
        <TabItem title="Log Out" icon={<LogOutIcon />} onclick={() => {}} />
      </div>
    </div>
  );
};

export default SideBarLeft;

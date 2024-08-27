import NotificationIcon from "@/components/svg/side-bar-icons/NotificationIcon";
import Avatar from "@/components/user/Avatar";
import FriendCard from "@/components/SideBarRight/FriendCard";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const SideBarRight = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return null;
  const { avatar } = user;
  return (
    <div className="w-80 h-screen p-4 sticky top-0 bg-white">
      <div className="flex justify-end">
        <div className="mr-3 flex items-center justify-center w-12 h-12 bg-light-grey rounded-full">
          <NotificationIcon />
        </div>
        <Avatar photoURL={avatar} />
      </div>
      <div className="my-4">
        <h2 className="text-lg font-bold">Friends</h2>
        <FriendCard name="Huong Dat Huy" onclick={() => {}} />
        <FriendCard name="Nguyen Vo Xuan Duy" onclick={() => {}} />
        <FriendCard name="Le Nguyen Viet Cuong" onclick={() => {}} />
        <FriendCard name="Dong Dong" onclick={() => {}} />
      </div>
      <div className="">
        <h2 className="text-lg font-bold">Groups</h2>
        <FriendCard name="J2Team Community" onclick={() => {}} />
        <FriendCard name="RMIT Students" onclick={() => {}} />
        <FriendCard name="Nhóm Học Tập UEH" onclick={() => {}} />
      </div>
    </div>
  );
};

export default SideBarRight;

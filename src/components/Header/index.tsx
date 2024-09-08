import LogoWithName from "@/components/Common/LogoWithName";
import NotificationAndAvatar from "@/components/Common/NotificationAndAvatar";
import SearchBar from "@/components/Home/SearchBar";

const Header = () => {
  return (
    <div className="fixed z-10 top-0 w-full border-b border-light-grey px-4 h-20 bg-white flex justify-between items-center">
      <div className="w-80 flex justify-start items-center">
        <LogoWithName />
      </div>
      <SearchBar />
      <div className="w-80 flex justify-end items-center">
        <NotificationAndAvatar />
      </div>
    </div>
  );
};

export default Header;

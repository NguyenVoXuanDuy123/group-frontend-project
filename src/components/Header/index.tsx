import LogoWithName from "../Common/LogoWithName";
import NotificationAndAvatar from "../Common/NotificationAndAvatar";
import SearchBar from "../Home/SearchBar";

const Header = () => {
  return (
    <div className="sticky top-0 w-full border-b border-light-grey px-4 h-20 bg-white flex justify-between items-center">
      <LogoWithName />
      <SearchBar />
      <NotificationAndAvatar />
    </div>
  );
};

export default Header;

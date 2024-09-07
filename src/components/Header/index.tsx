import { APP_NAME } from "@/constants";
import Logo from "../svg/Logo";

const Header = () => {
  return (
    <div className="w-full px-4 h-16 bg-white flex justify-between items-center">
      <div className="flex">
        <Logo className="w-10 h-10" />
        <h1 className="">{APP_NAME}</h1>
      </div>
    </div>
  );
};

export default Header;

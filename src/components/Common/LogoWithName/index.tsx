import Logo from "@/components/svg/Logo";
import { APP_NAME } from "@/constants";
import { Link } from "react-router-dom";

const LogoWithName = () => {
  return (
    <Link to={`/`}>
      <div className="flex items-center justify-center cursor-pointer">
        <Logo width={48} height={48} />
        <h1 className="text-[30px] font-bold ml-3 text-primary">{APP_NAME}</h1>
      </div>
    </Link>
  );
};

export default LogoWithName;

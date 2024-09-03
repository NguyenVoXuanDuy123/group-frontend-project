import Logo from "@/components/svg/Logo";
import { APP_NAME } from "@/constants";
import { Link } from "react-router-dom";

const LogoWithName = () => {
  return (
    <Link to={`/`}>
      <div className="flex items-center justify-center absolute left-10 top-7 mb-10 cursor-pointer">
        <Logo width={70} height={70} />
        <h1 className="text-[30px] font-bold ml-3 text-primary">{APP_NAME}</h1>
      </div>
    </Link>
  );
};

export default LogoWithName;

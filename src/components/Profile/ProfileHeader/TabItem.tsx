import { Link } from "react-router-dom";

type TabItemProps = {
  title: string;
  url: string;
  isActive: boolean;
};

const TabItem = ({ title, url, isActive }: TabItemProps) => {
  return (
    <Link
      to={url}
      className={`h-12 mt-1  ${isActive ? "text-primary" : "text-dark-grey"} font-semibold flex flex-col 
      justify-between items-center no-underline `}>
      <div
        className="pl-6 pr-6 hover:bg-dark-grey/15 rounded-lg 
      flex justify-center items-center flex-1">
        <span className="">{title}</span>
      </div>
      {isActive && (
        <div className="w-full h-[4px] bg-primary rounded-t-[2px]"></div>
      )}
    </Link>
  );
};

export default TabItem;

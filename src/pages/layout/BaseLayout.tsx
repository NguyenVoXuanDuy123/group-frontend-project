import SideBarLeft from "@/components/SideBarLeft";
import SideBarRight from "@/components/SideBarRight";

import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="relative mx-auto flex justify-between w-full h-full bg-light-grey">
      <SideBarLeft />
      <div className=" flex-1 pt-10 px-8 max-w-[744px]">
        <Outlet />
      </div>
      <SideBarRight />
    </div>
  );
};

export default BaseLayout;

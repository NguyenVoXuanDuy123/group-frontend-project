import SideBarLeft from "@/components/SideBarLeft";
import SideBarRight from "@/components/SideBarRight";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="h-screen">
      <div className="mx-auto flex w-full h-full max-w-[1280px]">
        <SideBarLeft />
        <div className="flex-1 pt-10 px-8">
          <Outlet />
        </div>
        <SideBarRight />
      </div>
    </div>
  );
};

export default BaseLayout;

import Header from "@/components/Header";
import SideBarLeft from "@/components/SideBarLeft";
import SideBarRight from "@/components/SideBarRight";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header at the top */}
      <Header />

      <div className="flex flex-1 pt-20">
        <SideBarLeft />

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>

        <SideBarRight />
      </div>
    </div>
  );
};

export default BaseLayout;

import LogoWithName from "@/components/Common/LogoWithName";
import NotificationAndAvatar from "@/components/Common/NotificationAndAvatar";

import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="w-full px-8 bg-white flex justify-between items-center py-4 ">
        <LogoWithName />

        <NotificationAndAvatar />
      </div>

      <main className="flex-grow">
        <div className=" mx-auto py-6 px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

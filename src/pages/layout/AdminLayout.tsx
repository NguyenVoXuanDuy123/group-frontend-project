import LogoWithName from "@/components/Common/LogoWithName";
import { logOut } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logOut({ dispatch }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="w-full px-8 bg-white flex justify-between items-center py-4 ">
        <LogoWithName />

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 hover:bg-light-grey rounded-md"
        >
          Exit Admin
        </button>
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

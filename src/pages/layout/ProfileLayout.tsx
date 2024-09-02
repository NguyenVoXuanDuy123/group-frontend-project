import ProfileHeader from "@/components/Profile/ProfileHeader";
import Logo from "@/components/svg/Logo";
import { appName } from "@/constants";
import { UserStatus } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { UserProfile } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";

export type ProfileLayoutContextType = {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
};

const ProfileLayout = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!username) return;
    const fetchData = async () => {
      const user = await fetchApi<UserProfile>(
        `/api/users/profile/${username}`,
        "GET",
        dispatch
      );
      setUser(user);
    };
    fetchData();
  }, [username, dispatch, setUser]);

  if (!username) return null;
  if (!user) return null;
  return (
    <div>
      <div className="bg-white relative">
        <Link to={`/`}>
          <div className="flex items-center justify-center absolute left-10 top-7 mb-10 cursor-pointer">
            <Logo width={70} height={70} />
            <h1 className="text-[30px] font-bold ml-3 text-primary">
              {appName}
            </h1>
          </div>
        </Link>
        <div className="max-w-[880px] mx-auto px-6">
          <ProfileHeader user={user} setUser={setUser} />
        </div>
      </div>
      <div className="max-w-[880px] mx-auto px-6 rounded-lg ">
        <Outlet
          context={{
            user,
            setUser,
          }}
          key={user.id}
        />
      </div>
      {user.status === UserStatus.BANNED && (
        <div className="fixed bottom-0 left-0 w-full bg-red-100 text-red-800 shadow-md">
          <div className="container mx-auto px-4 py-3 flex items-center justify-center space-x-2 sm:space-x-4">
            <p className="text-sm sm:text-base font-medium">
              This user has been banned due to violation of community guidelines
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLayout;

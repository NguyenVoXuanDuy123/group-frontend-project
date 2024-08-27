import ProfileHeader from "@/components/ProfileHeader";
import Logo from "@/components/svg/Logo";
import { appName } from "@/constants";
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
    <div className="">
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
    </div>
  );
};

export default ProfileLayout;

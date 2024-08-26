import ProfileHeader from "@/components/ProfileHeader";
import { fetchApi } from "@/helpers/fetchApi";
import { UserProfile } from "@/types/user.types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

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
      <div className="bg-white">
        <div className="max-w-[876px] mx-auto ">
          <ProfileHeader user={user} setUser={setUser} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;

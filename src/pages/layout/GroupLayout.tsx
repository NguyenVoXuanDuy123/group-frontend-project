import GroupHeader from "@/components/Group/GroupHeader";
import Logo from "@/components/svg/Logo";
import { appName } from "@/constants";
import { fetchApi } from "@/helpers/fetchApi";
import { Group } from "@/types/group.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
export type GroupLayoutContextType = {
  group: Group;
  setGroup: React.Dispatch<React.SetStateAction<Group | null>>;
};

const GroupLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const group = await fetchApi<Group>(`/api/groups/${id}`, "GET", dispatch);
      if (group) {
        setGroup(group);
      }
    };
    fetchData();
  }, [id, dispatch, setGroup]);

  if (!group) return null;

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
          <GroupHeader group={group} setGroup={setGroup} />
        </div>
      </div>
      <div className="max-w-[880px] mx-auto px-6 rounded-lg ">
        <Outlet
          context={{
            group,
            setGroup,
          }}
          key={group.id}
        />
      </div>
    </div>
  );
};

export default GroupLayout;

import GroupHeader from "@/components/Group/GroupHeader";
import { fetchApi } from "@/helpers/fetchApi";
import { Group } from "@/types/group.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
export type GroupLayoutContextType = {
  group: Group;
  setGroup: React.Dispatch<React.SetStateAction<Group | null>>;
};

const GroupLayout = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (!groupId) return;
    const fetchData = async () => {
      const group = await fetchApi<Group>(
        `/api/groups/${groupId}`,
        "GET",
        dispatch
      );
      if (group) {
        setGroup(group);
      }
    };
    fetchData();
  }, [groupId, dispatch, setGroup]);

  if (!group) return null;

  return (
    <div>
      <div className="bg-white">
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
          key={group._id}
        />
      </div>
    </div>
  );
};

export default GroupLayout;

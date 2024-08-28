import GroupJoinRequestCard from "@/components/Group/GroupJoinRequestCard";
import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { GroupLayoutContextType } from "@/pages/layout/GroupLayout";
import { setToast } from "@/redux/slices/toastSlice";
import { RootState } from "@/redux/store";
import { GroupJoinRequestCardType } from "@/types/group.types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const GroupRequests = () => {
  const [groupJoinRequests, setGroupJoinRequests] = useState<
    GroupJoinRequestCardType[]
  >([]);
  const dispatch = useDispatch();
  const { group, setGroup } = useOutletContext<GroupLayoutContextType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useSelector(
    (state: RootState) => state.auth.user || { id: "" }
  );
  useEffect(() => {
    // only fetch group join requests if the user is the admin of the group
    if (group.admin.id !== id) {
      dispatch(
        setToast({
          message: "Just the admin group can view join requests",
          type: "error",
        })
      );
      return;
    }
    // fetch group join requests of the group
    const fetchGroupJoinRequests = async () => {
      const groupJoinRequests = await fetchApi<GroupJoinRequestCardType[]>(
        `/api/groups/${group.id}/pending-requests`,
        "GET",
        dispatch
      );
      if (groupJoinRequests) {
        setGroupJoinRequests(groupJoinRequests);
      }
      setIsLoading(false);
    };
    fetchGroupJoinRequests();
  }, [dispatch, group.admin.id, group.id, id]);

  if (group.admin.id !== id)
    return (
      <div className="py-10 bg-white rounded-xl mt-4">
        <p className="text-gray-500 text-center   ">
          Just the admin group can view join requests
        </p>
      </div>
    );
  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900">Group Join Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2  mt-1">
        {groupJoinRequests.map((groupJoinRequests) => {
          const sender = groupJoinRequests.senderDetail;
          return (
            <div className="flex justify-center sm:justify-start">
              <GroupJoinRequestCard
                avatar={sender.avatar}
                fullName={getFullName(sender)}
                username={sender.username}
                group={group}
                groupJoinRequest={groupJoinRequests}
                setGroup={setGroup}
                setGroupRequests={setGroupJoinRequests}
              />
            </div>
          );
        })}
      </div>
      {groupJoinRequests.length === 0 && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-4">
          <p className="text-gray-500 text-center   ">
            No group join requests to show
          </p>
        </div>
      )}
    </div>
  );
};

export default GroupRequests;

import Popover from "@/components/Common/Popover";
import ThreeDotsIcon from "@/components/svg/ThreeDotsIcon";
import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { Group } from "@/types/group.types";
import { UserInformation } from "@/types/user.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
type GroupAdminActionsProps = {
  userId: string;
  group: Group;
  setMembers: React.Dispatch<React.SetStateAction<UserInformation[]>>;
  setGroup: React.Dispatch<React.SetStateAction<Group | null>>;
};

const GroupAdminActions = ({
  group,
  userId,
  setMembers,
  setGroup,
}: GroupAdminActionsProps) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleRemoveMember = async () => {
    // Remove the member from the group
    const response = await fetchApi(
      `/api/groups/${group.id}/members/${userId}`,
      "DELETE",
      dispatch
    );
    // If the member is removed successfully
    if (response) {
      // Remove the member from the list
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== userId)
      );

      const updatedGroup: Group = {
        ...group,
        memberCount: group.memberCount - 1,
      };
      setGroup(updatedGroup);
      dispatch(
        setToast({ message: "Removed member successfully", type: "success" })
      );
    }
    setPopoverOpen(false);
  };

  return (
    <Popover
      popoverOpen={popoverOpen}
      setPopoverOpen={setPopoverOpen}
      displayComponent={<ThreeDotsIcon height={20} width={20} />}>
      <div className=" w-[200px] bg-white shadow-md rounded-md">
        <button
          onClick={handleRemoveMember}
          className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">
          Remove member
        </button>
      </div>
    </Popover>
  );
};

export default GroupAdminActions;

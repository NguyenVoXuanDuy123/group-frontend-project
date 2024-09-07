import GroupModal from "@/components/Common/Group/GroupModal";
import CreateOrEditGroupModal from "@/components/Group/CreateOrEditGroupModal";
import EditIcon from "@/components/svg/EditIcon";
import { GroupStatus, GroupVisibilityLevel } from "@/enums/group.enums";
import { abbreviateNumber } from "@/helpers/abbreviateNumber";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { truncateText } from "@/helpers/truncateText";
import { GroupCard } from "@/types/group.types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ProfileGroupCardProps = {
  group: GroupCard;
  setGroupCards?: React.Dispatch<React.SetStateAction<GroupCard[]>>;
};

const ProfileGroupCard = ({ group, setGroupCards }: ProfileGroupCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    if (group.status !== GroupStatus.APPROVED) {
      e.preventDefault(); // Prevents navigation
      setIsModalOpen(true);
      return;
    }
    navigate(`/groups/${group._id}`);
  };

  return (
    <div className="w-full h-[130px] rounded-lg flex flex-col mb-4 border p-4 ">
      <div className="flex flex-col">
        <div className="text-black no-underline" onClick={handleClick}>
          <span className="cursor-pointer font-semibold text-lg hover:underline">
            {group.name}
            {group.status === GroupStatus.PENDING && (
              <EditIcon className="h-4 w-4 inline-block ml-1" />
            )}
          </span>
        </div>
        <span className="text-xs text-gray-600">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              group.visibilityLevel === GroupVisibilityLevel.PUBLIC
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}>
            {capitalizeFirstLetter(group.visibilityLevel)}
          </span>{" "}
          • {abbreviateNumber(group.memberCount)} members
        </span>

        <p className="mt-2 text-sm text-dark-grey line-clamp-2 break-words">
          {truncateText(group.description, 80)}
        </p>
      </div>
      {group.status === GroupStatus.PENDING && (
        <CreateOrEditGroupModal
          open={isModalOpen}
          hideModal={() => setIsModalOpen(false)}
          group={group}
          setGroupCards={setGroupCards}
        />
      )}

      {group.status === GroupStatus.REJECTED && (
        <GroupModal
          group={group}
          open={isModalOpen}
          hideModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileGroupCard;

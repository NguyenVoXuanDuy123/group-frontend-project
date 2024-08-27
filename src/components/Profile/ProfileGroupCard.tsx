import { GroupVisibilityLevel } from "@/enums/group.enums";
import { abbreviateNumber } from "@/helpers/abbreviateNumber";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { Link } from "react-router-dom";

type ProfileGroupCardProps = {
  name: string;
  visibilityLevel: GroupVisibilityLevel;
  id: string;
  memberCount: number;
};

const ProfileGroupCard = ({
  name,
  visibilityLevel,
  id,
  memberCount,
}: ProfileGroupCardProps) => {
  return (
    <div className="items-center w-full h-[100px] rounded-lg flex mb-3 border p-2">
      <div className="flex flex-col">
        <Link to={`/groups/${id}`} className="text-black no-underline ">
          <span className="cursor-pointer  ml-4 font-semibold hover:underline">
            {name}
          </span>
        </Link>

        <span className="ml-4   cursor-pointer text-xs text-dark-grey hover:underline">
          {capitalizeFirstLetter(visibilityLevel)} •{" "}
          {abbreviateNumber(memberCount) + " members"}
        </span>
      </div>
    </div>
  );
};

export default ProfileGroupCard;

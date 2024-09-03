import GroupActions from "@/components/Group/GroupHeader/GroupActions";
import TabItem from "@/components/Profile/ProfileHeader/TabItem";
import GlobalIcon from "@/components/svg/GlobalIcon";
import PrivateIcon from "@/components/svg/PrivateIcon";
import { GroupVisibilityLevel, UserGroupRelation } from "@/enums/group.enums";
import { abbreviateNumber } from "@/helpers/abbreviateNumber";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { Group } from "@/types/group.types";

import { Link, useLocation, useNavigate } from "react-router-dom";

type GroupHeaderProps = {
  group: Group;
  setGroup: React.Dispatch<React.SetStateAction<Group | null>>;
};

const GroupHeader = ({ group, setGroup }: GroupHeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-white pt-6 ">
      {/* Profile image and details */}
      <div className="flex items-center  relative ">
        {/* Profile Details */}
        <div className="">
          <h1 className="text-3xl font-bold">{group.name}</h1>
          <div className="flex  items-center">
            {group.visibilityLevel === GroupVisibilityLevel.PUBLIC ? (
              <GlobalIcon height={16} width={16} />
            ) : (
              <div className="mb-[2px]">
                <PrivateIcon height={16} width={16} />
              </div>
            )}{" "}
            <h1 className="text-dark-grey font-semibold ml-1">
              {capitalizeFirstLetter(group.visibilityLevel) + " group" + " •"}
            </h1>
            {/*  div for spacing because for some reason {" "} doesn't work */}
            <div className="w-1"></div>
            <Link to={`/groups/${group._id}/members`}>
              <span
                className="text-dark-grey font-semibold cursor-pointer hover:underline"
                onClick={() => {
                  if (
                    group.visibilityLevel === GroupVisibilityLevel.PUBLIC ||
                    group.userGroupRelation === UserGroupRelation.ADMIN
                  ) {
                    navigate(`/groups/${group._id}/members`);
                  }
                }}>
                {abbreviateNumber(group.memberCount) + " members "}{" "}
              </span>
            </Link>
          </div>
          {/* description */}
          <p className="mt-2 text-dark-grey m-0 w-[656px] break-words">
            {group.description}
          </p>
        </div>

        {/* Group Actions */}
        <GroupActions group={group} setGroup={setGroup} />
      </div>

      {/* Navigation Links */}

      <div className="flex flex-row border-t  mt-4  border-dark-grey/55  ">
        <>
          <TabItem
            title="Posts"
            url={`/groups/${group._id}`}
            isActive={location.pathname === `/groups/${group._id}`}
          />
          <TabItem
            title="Members"
            url={`/groups/${group._id}/members`}
            isActive={location.pathname === `/groups/${group._id}/members`}
          />
        </>
        {/* If the user is the owner of the group, show additional tabs */}
        {group.userGroupRelation === UserGroupRelation.ADMIN && (
          <TabItem
            title="Requests"
            url={`/groups/${group._id}/requests`}
            isActive={location.pathname === `/groups/${group._id}/requests`}
          />
        )}
      </div>
    </div>
  );
};

export default GroupHeader;

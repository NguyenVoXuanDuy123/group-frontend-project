import GlobalIcon from "@/components/svg/GlobalIcon";
import FriendIcon from "@/components/svg/side-bar-icons/FriendIcon";
import GroupIcon from "@/components/svg/side-bar-icons/GroupIcon";
import { PostVisibilityLevel } from "@/enums/post.enums";

type VisibilityLevelIconProps = {
  visibilityLevel: PostVisibilityLevel;
};
const VisibilityLevelIcon = ({ visibilityLevel }: VisibilityLevelIconProps) => {
  if (visibilityLevel === PostVisibilityLevel.PUBLIC) {
    return (
      <div className=" mt-[2px] ml-[2px]">
        <GlobalIcon height={16} width={16} />
      </div>
    );
  }
  if (visibilityLevel === PostVisibilityLevel.FRIEND) {
    return <FriendIcon height={18} width={18} />;
  }

  if (visibilityLevel === PostVisibilityLevel.GROUP) {
    return <GroupIcon height={18} width={18} />;
  }

  return null;
};

export default VisibilityLevelIcon;

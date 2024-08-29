import { ReactionType } from "@/enums/post.enums";
import AngryReaction from "../svg/reactions/Angry";
import HahaReaction from "../svg/reactions/Haha";
import LikeReaction from "../svg/reactions/Like";
import LoveReaction from "../svg/reactions/Love";

type ReactionPopupProps = {
  showReactions: boolean;
  handleReaction: (reaction: ReactionType) => void;
};

const ReactionPopup = ({
  showReactions,
  handleReaction,
}: ReactionPopupProps) => {
  return (
    <div
      className={`absolute bottom-full left-0 bg-white border border-gray-200 rounded-lg p-2 flex space-x-2
    transform transition-transform duration-300 ease-in-out ${
      //  z-40 is used to make sure the popup is on top of other elements
      // -z-40 is used to make sure when the popup is hidden, it's not clickable or hoverable
      showReactions
        ? "translate-y-0 opacity-100 z-40"
        : "translate-y-4 opacity-0 -z-40"
    }`}
    >
      <LikeReaction
        width={48}
        height={48}
        onClick={() => handleReaction(ReactionType.LIKE)}
        className="hover:scale-110 transition-transform duration-150 cursor-pointer"
      />
      <LoveReaction
        width={48}
        height={48}
        onClick={() => handleReaction(ReactionType.LOVE)}
        className="hover:scale-110 transition-transform duration-150 cursor-pointer"
      />
      <HahaReaction
        width={48}
        height={48}
        onClick={() => handleReaction(ReactionType.HAHA)}
        className="hover:scale-110 transition-transform duration-150 cursor-pointer"
      />
      <AngryReaction
        width={48}
        height={48}
        onClick={() => handleReaction(ReactionType.ANGRY)}
        className="hover:scale-110 transition-transform duration-150 cursor-pointer"
      />
    </div>
  );
};

export default ReactionPopup;

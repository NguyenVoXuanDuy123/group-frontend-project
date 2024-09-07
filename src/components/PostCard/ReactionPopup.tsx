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
        transform transition-all duration-300 ease-in-out
        ${
          showReactions
            ? "translate-y-0 opacity-100 scale-100 z-40"
            : "translate-y-4 opacity-0 scale-95 -z-40 "
        }`}>
      {[
        { type: ReactionType.LIKE, Component: LikeReaction },
        { type: ReactionType.LOVE, Component: LoveReaction },
        { type: ReactionType.HAHA, Component: HahaReaction },
        { type: ReactionType.ANGRY, Component: AngryReaction },
      ].map(({ type, Component }) => (
        <button
          key={type}
          onClick={() => handleReaction(type)}
          className="group relative focus:outline-none">
          <Component
            width={48}
            height={48}
            className="transform transition-all duration-200 ease-out group-hover:scale-125 "
          />
        </button>
      ))}
    </div>
  );
};

export default ReactionPopup;

import reactionMap from "@/constants/reactionMap";
import { ReactionType } from "@/enums/post.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { UserReaction } from "@/types/post.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LikeAction from "../svg/post/LikeAction";
import AngryReaction from "../svg/reactions/Angry";
import HahaReaction from "../svg/reactions/Haha";
import LikeReaction from "../svg/reactions/Like";
import LoveReaction from "../svg/reactions/Love";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";

const reactionColors = {
  like: "#4D98EF",
  love: "#F06D6D",
  haha: "#FCC738",
  angry: "#E56232",
};

type ReactionButtonProps = {
  postId: string;
  userReaction?: UserReaction | null;
  updateUserReaction: (newReaction: UserReaction) => void;
};

const ReactionButton = ({
  postId,
  userReaction,
  updateUserReaction,
}: ReactionButtonProps) => {
  const [showReactions, setShowReactions] = useState(false);
  const dispatch = useDispatch();

  const handleClickReaction = async () => {
    if (!userReaction) {
      handleReaction(ReactionType.LIKE);
      return;
    }

    const response = await fetchApi(
      `/api/posts/${postId}/reactions`,
      "PUT",
      dispatch,
      {
        // remove reaction
        type: userReaction.type,
      }
    );

    if (response) {
      updateUserReaction(userReaction);
    }
  };

  const handleReaction = async (reactionType: ReactionType) => {
    const response = await fetchApi(
      `/api/posts/${postId}/reactions`,
      "PUT",
      dispatch,
      {
        type: reactionType,
      }
    );

    if (response) {
      updateUserReaction({ type: reactionType });
    }

    setShowReactions(false);
  };

  const _renderReaction = () => {
    if (userReaction) {
      const Reaction = reactionMap[userReaction?.type] || null;
      if (!Reaction) return null;
      return (
        <>
          <Reaction />
          <span
            style={{ color: reactionColors[userReaction.type] }}
            className={`ml-2 font-bold`}
          >
            {capitalizeFirstLetter(userReaction.type)}
          </span>
        </>
      );
    }
  };

  return (
    <div
      className="relative flex-1"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <div
        className="flex-1 rounded-lg p-3 relative flex items-center justify-center cursor-pointer hover:bg-light-grey"
        onClick={() => handleClickReaction()}
      >
        {userReaction ? (
          _renderReaction()
        ) : (
          <>
            <LikeAction />
            <span className="ml-2 ">Like</span>
          </>
        )}
      </div>
      {/* Reaction Popup */}
      {
        <div
          className={`absolute bottom-full left-0 bg-white border border-gray-200 rounded-lg p-2 flex space-x-2
          transform transition-transform duration-300 ease-in-out ${
            //  z-40 is used to make sure the popup is on top of other elements
            // -z-40 is used to make sure when the popup is hidden, it's not clickable or hoverable
            showReactions
              ? "translate-y-0 opacity-100 z-40"
              : "translate-y-4 -z-40"
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
      }
    </div>
  );
};

export default ReactionButton;

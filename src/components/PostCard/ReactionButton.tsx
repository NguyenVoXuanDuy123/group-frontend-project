import reactionMap from "@/constants/reactionMap";
import { ReactionType } from "@/enums/post.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { fetchApi } from "@/helpers/fetchApi";
import { UserReaction } from "@/types/post.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LikeAction from "@/components/svg/post/LikeAction";
import ReactionPopup from "@/components/PostCard/ReactionPopup";
import { reactionColors } from "@/constants";

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
  const [showReactions, setShowReactions] = useState<boolean>(false);
  const [showDelay, setShowDelay] = useState<NodeJS.Timeout | null>(null);
  const [hideDelay, setHideDelay] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();

  const handleReaction = async (reactionType: ReactionType) => {
    if (userReaction && userReaction.type === reactionType) {
      const response = await fetchApi(
        `/api/posts/${postId}/reactions`,
        "DELETE",
        dispatch
      );

      if (response.status === "success") {
        updateUserReaction({ type: reactionType });
      }
    } else {
      const response = await fetchApi(
        `/api/posts/${postId}/reactions`,
        "PUT",
        dispatch,
        {
          type: reactionType,
        }
      );
      if (response.status === "success") {
        updateUserReaction({ type: reactionType });
      }
    }
    setShowReactions(false);
  };

  const handleClickReaction = () => {
    if (!userReaction) {
      handleReaction(ReactionType.LIKE);
      return;
    }
    handleReaction(userReaction.type);
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
            className={`ml-2 font-bold`}>
            {capitalizeFirstLetter(userReaction.type)}
          </span>
        </>
      );
    }
  };

  const showReactionChoices = () => {
    if (hideDelay) clearTimeout(hideDelay);
    setShowDelay(
      setTimeout(() => {
        setShowReactions(true);
      }, 500) // Adjust the delay duration as needed
    );
  };

  const hideReactionChoices = () => {
    if (showDelay) clearTimeout(showDelay);
    setHideDelay(
      setTimeout(() => {
        setShowReactions(false);
      }, 500) // Adjust the delay duration as needed
    );
  };

  return (
    <div
      className="relative flex-1"
      onMouseEnter={showReactionChoices}
      onMouseLeave={hideReactionChoices}>
      <div
        className="flex-1 rounded-lg p-3 relative flex items-center justify-center cursor-pointer hover:bg-light-grey"
        onClick={handleClickReaction}>
        {userReaction ? (
          _renderReaction()
        ) : (
          <>
            <LikeAction />
            <span className="ml-2 ">Like</span>
          </>
        )}
      </div>
      <ReactionPopup
        handleReaction={handleReaction}
        showReactions={showReactions}
      />
    </div>
  );
};

export default ReactionButton;

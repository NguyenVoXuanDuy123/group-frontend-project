import { reactionColors } from "@/constants";
import { ReactionType } from "@/enums/post.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { UserReaction } from "@/types/post.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ReactionPopup from "./ReactionPopup";

type ReactionButtonProps = {
  commentId: string;
  userReaction?: UserReaction | null;
  updateCommentReaction: (reactionType: ReactionType) => void;
};

const CommentReactionButton = ({
  commentId,
  userReaction,
  updateCommentReaction,
}: ReactionButtonProps) => {
  const [showReactions, setShowReactions] = useState(false);
  const dispatch = useDispatch();

  const showReactionModal = () => {
    setShowReactions(true);
  };

  const hideReactionModal = () => {
    setShowReactions(false);
  };

  const delayedHideModal = () => {
    if (showReactions) {
      setTimeout(() => {
        setShowReactions(false);
      }, 1000);
    }
  };

  const reactToComment = async (reactionType: ReactionType) => {
    try {
      if (userReaction && userReaction.type === reactionType) {
        const response = await fetchApi<Comment>(
          `/api/comments/${commentId}/reactions`,
          "DELETE",
          dispatch
        );
        if (!response) {
          dispatch(
            setToast({
              type: "error",
              message: "Failed to unreact to comment",
            })
          );
        }
      } else {
        const response = await fetchApi<Comment>(
          `/api/comments/${commentId}/reactions`,
          "PUT",
          dispatch,
          { type: reactionType }
        );
        if (!response) {
          dispatch(
            setToast({
              type: "error",
              message: "Failed to react to comment",
            })
          );
        }
      }

      hideReactionModal();
      updateCommentReaction(reactionType);
    } catch (error) {
      console.error("Error reacting to comment:", error);
    }
  };

  const handleClickReaction = () => {
    if (!userReaction) {
      reactToComment(ReactionType.LIKE);
      return;
    }
    reactToComment(userReaction.type);
  };

  return (
    <button
      onMouseEnter={showReactionModal}
      onMouseLeave={delayedHideModal}
      className="relative font-bold px-4 py-2"
    >
      <div className="mr-2 text-dark-grey" onClick={handleClickReaction}>
        <span
          style={
            userReaction
              ? {
                  color: reactionColors[userReaction?.type],
                }
              : {}
          }
        >
          {capitalizeFirstLetter(userReaction?.type || "Like")}
        </span>
      </div>

      <ReactionPopup
        handleReaction={reactToComment}
        showReactions={showReactions}
      />
    </button>
  );
};

export default CommentReactionButton;

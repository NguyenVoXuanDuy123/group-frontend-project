import { reactionColors } from "@/constants";
import { ReactionType } from "@/enums/post.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { fetchApi } from "@/helpers/fetchApi";
import { UserReaction } from "@/types/post.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ReactionPopup from "@/components/PostCard/ReactionPopup";
import { saveReactionToIndexedDB } from "@/helpers/indexedDB";

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
      }, 500);
    }
  };

  const reactToComment = async (newReaction: ReactionType) => {
    const oldReaction = userReaction?.type;
    updateCommentReaction(newReaction);
    hideReactionModal();

    const response = await fetchApi(
      `/api/comments/${commentId}/reactions`,
      oldReaction == newReaction ? "DELETE" : "PUT",
      dispatch,
      { type: newReaction }
    );
    if (
      response.status === "error" &&
      response.errorCode === "ERR_CONNECTION_REFUSED"
    ) {
      await saveReactionToIndexedDB({
        id: commentId,
        type: oldReaction == newReaction ? "UNREACT" : newReaction,
        isComment: true,
      });

      return;
    }
    // if the server returns an error not related to offline support, revert the reaction
    if (response.status === "error") {
      if (oldReaction) {
        updateCommentReaction(oldReaction);
      } else {
        updateCommentReaction(userReaction!.type);
      }
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
    <div
      onMouseEnter={showReactionModal}
      onMouseLeave={delayedHideModal}
      className="relative font-bold px-4 py-2 cursor-pointer">
      <div className="mr-2 text-dark-grey" onClick={handleClickReaction}>
        <span
          style={
            userReaction
              ? {
                  color: reactionColors[userReaction?.type],
                }
              : {}
          }>
          {capitalizeFirstLetter(userReaction?.type || "Like")}
        </span>
      </div>

      <ReactionPopup
        handleReaction={reactToComment}
        showReactions={showReactions}
      />
    </div>
  );
};

export default CommentReactionButton;

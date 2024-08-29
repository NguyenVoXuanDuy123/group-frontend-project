import reactionMap from "@/constants/reactionMap";
import { ReactionType } from "@/enums/post.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { fetchApi } from "@/helpers/fetchApi";
import { UserReaction } from "@/types/post.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LikeAction from "../svg/post/LikeAction";
import ReactionPopup from "./ReactionPopup";
import { reactionColors } from "@/constants";
import { setToast } from "@/redux/slices/toastSlice";

type ReactionButtonProps = {
  postId: string;
  userReaction?: UserReaction | null;
  updateReaction: (newReaction: UserReaction) => void;
};

const ReactionButton = ({
  postId,
  userReaction,
  updateReaction: updateUserReaction,
}: ReactionButtonProps) => {
  const [showReactions, setShowReactions] = useState(false);
  const dispatch = useDispatch();

  const handleReaction = async (reactionType: ReactionType) => {
    if (userReaction && userReaction.type === reactionType) {
      const response = await fetchApi(
        `/api/posts/${postId}/reactions`,
        "DELETE",
        dispatch
      );

      if (!response) {
        dispatch(
          setToast({
            type: "error",
            message: "Failed to unreact to post",
          })
        );
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
      if (!response) {
        dispatch(
          setToast({
            type: "error",
            message: "Failed to react to post",
          })
        );
      }
    }

    updateUserReaction({ type: reactionType });
    hideCommentModal();
  };

  const handleClickReaction = () => {
    // user has not reacted
    if (!userReaction) {
      handleReaction(ReactionType.LIKE);
      return;
    }

    // user has already reacted
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
            className={`ml-2 font-bold`}
          >
            {capitalizeFirstLetter(userReaction.type)}
          </span>
        </>
      );
    }
  };

  const showCommentModal = () => {
    setShowReactions(true);
  };

  const hideCommentModal = () => {
    setShowReactions(false);
  };

  const delayedHideModal = () => {
    if (showReactions) {
      setTimeout(() => {
        setShowReactions(false);
      }, 1000);
    }
  };

  return (
    <div
      className="relative flex-1"
      onMouseEnter={showCommentModal}
      onMouseLeave={delayedHideModal}
    >
      <div
        className="flex-1 rounded-lg p-3 relative flex items-center justify-center cursor-pointer hover:bg-light-grey"
        onClick={handleClickReaction}
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
      <ReactionPopup
        handleReaction={handleReaction}
        showReactions={showReactions}
      />
    </div>
  );
};

export default ReactionButton;

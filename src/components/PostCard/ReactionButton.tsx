import ReactionPopup from "@/components/PostCard/ReactionPopup";
import LikeAction from "@/components/svg/post/LikeAction";
import { reactionColors } from "@/constants";
import reactionMap from "@/constants/reactionMap";
import { ReactionType } from "@/enums/post.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { fetchApi } from "@/helpers/fetchApi";
import { saveReactionToIndexedDB } from "@/helpers/indexedDB";
import { UserReaction } from "@/types/post.types";
import { useState } from "react";
import { useDispatch } from "react-redux";

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

  const handleReaction = async (newReaction: ReactionType) => {
    const oldReaction = userReaction?.type;
    updateUserReaction({ type: newReaction });
    setShowReactions(false);

    const response = await fetchApi(
      `/api/posts/${postId}/reactions`,
      oldReaction == newReaction ? "DELETE" : "PUT",
      dispatch,
      { type: newReaction }
    );
    if (
      response.status === "error" &&
      response.errorCode === "ERR_CONNECTION_REFUSED"
    ) {
      await saveReactionToIndexedDB({
        id: postId,
        type: oldReaction == newReaction ? "UNREACT" : newReaction,
        isComment: false,
      });

      return;
    }
    // if the server returns an error not related to offline support, revert the reaction
    if (response.status === "error") {
      if (oldReaction) {
        updateUserReaction({ type: oldReaction });
      } else {
        updateUserReaction({ type: newReaction });
      }
    }
  };

  const handleClickReaction = () => {
    if (!userReaction) {
      handleReaction(ReactionType.LIKE);
      return;
    }
    handleReaction(userReaction.type);
  };

  const renderReaction = () => {
    if (userReaction) {
      const Reaction = reactionMap[userReaction?.type] || null;
      if (!Reaction) return null;
      return (
        <>
          <Reaction />
          <span
            style={
              reactionColors[userReaction.type]
                ? { color: reactionColors[userReaction.type] }
                : {}
            }
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
          renderReaction()
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

import reactionMap from "@/constants/reactionMap";
import { ReactionType } from "@/enums/post.enums";
import { fetchApi } from "@/helpers/fetchApi";
import reactionTypeFormat from "@/helpers/reactionTypeFormat";
import { setToast } from "@/redux/slices/toastSlice";
import { UserReaction } from "@/types/post.types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LikeAction from "../svg/post/LikeAction";
import AngryReaction from "../svg/reactions/Angry";
import HahaReaction from "../svg/reactions/Haha";
import LikeReaction from "../svg/reactions/Like";
import LoveReaction from "../svg/reactions/Love";

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
    } else {
      dispatch(
        setToast({ message: "Failed to remove reaction", type: "error" })
      );
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
    } else {
      dispatch(
        setToast({ message: "Failed to react this post", type: "error" })
      );
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
            className={`ml-2 font-bold`}>
            {reactionTypeFormat(userReaction.type)}
          </span>
        </>
      );
    }
  };

  return (
    <div
      className="relative flex-1"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}>
      <div
        className="flex-1 rounded-lg p-3 relative flex items-center justify-center cursor-pointer hover:bg-light-grey"
        onClick={() => handleClickReaction()}>
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
            showReactions
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}>
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

import { useState } from "react";
import LikeAction from "../svg/post/LikeAction";
import AngryReaction from "../svg/reactions/Angry";
import HahaReaction from "../svg/reactions/Haha";
import LikeReaction from "../svg/reactions/Like";
import LoveReaction from "../svg/reactions/Love";
import { ReactionType } from "@/enums/post.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/slices/toastSlice";

type ReactionButtonProps = {
  postId: string;
};

const ReactionButton = ({ postId }: ReactionButtonProps) => {
  const [showReactions, setShowReactions] = useState(false);
  const dispatch = useDispatch();

  const handleReaction = async (reactionType: ReactionType) => {
    const res = await fetchApi(
      `/api/posts/${postId}/reactions`,
      "PUT",
      dispatch,
      {
        type: reactionType,
      }
    );

    if (res) {
      dispatch(
        setToast({ message: "Create Post Successfully", type: "success" })
      );
    } else {
      dispatch(setToast({ message: "Failed to create post", type: "error" }));
    }
  };

  return (
    <div
      className="rounded-lg p-3 relative flex flex-1 items-center justify-center cursor-pointer hover:bg-light-grey"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <LikeAction onClick={() => handleReaction(ReactionType.LIKE)} />
      <span className="ml-1">Like</span>
      {/* Reaction Popup */}
      {showReactions && (
        <div
          className={`absolute bottom-full left-0 bg-white border border-gray-200 rounded-lg p-2 flex space-x-2
          transform transition-transform duration-300 ease-in-out ${
            showReactions
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <LikeReaction
            width={48}
            height={48}
            onClick={() => handleReaction(ReactionType.LIKE)}
            className="hover:scale-110 transition-transform duration-150"
          />
          <LoveReaction
            width={48}
            height={48}
            onClick={() => handleReaction(ReactionType.LOVE)}
            className="hover:scale-110 transition-transform duration-150"
          />
          <HahaReaction
            width={48}
            height={48}
            onClick={() => handleReaction(ReactionType.HAHA)}
            className="hover:scale-110 transition-transform duration-150"
          />
          <AngryReaction
            width={48}
            height={48}
            onClick={() => handleReaction(ReactionType.ANGRY)}
            className="hover:scale-110 transition-transform duration-150"
          />
        </div>
      )}
    </div>
  );
};

export default ReactionButton;

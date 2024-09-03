import { ReactionType } from "@/enums/post.enums";
import { timeAgo } from "@/helpers/timeAgo";
import { Comment } from "@/types/comment.types";
import { ReactionCounter, UserReaction } from "@/types/post.types";
import { useState } from "react";
import Avatar from "../../Common/User/Avatar";
import CommentReactionButton from "./CommentReactionButton";
import ThreeMostReaction from "../ThreeMostReaction";

type CommentCardProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const [userReaction, setUserReaction] = useState<UserReaction | null>(
    comment.userReaction || null
  );
  const [reactionCount, setReactionCount] = useState<number>(
    comment.reactionCount || 0
  );
  const [reactionSummary, setReactionSummary] = useState<ReactionCounter[]>(
    comment.reactionSummary
  );

  const updateCommentReaction = (reactionType: ReactionType) => {
    // user has not reacted to the comment
    if (!userReaction) {
      setReactionSummary((prev) =>
        prev.map((reaction) => {
          if (reaction.type === reactionType) {
            return {
              ...reaction,
              count: reaction.count + 1,
            };
          }
          return reaction;
        })
      );
      setReactionCount(reactionCount + 1);
      setUserReaction({ type: reactionType });

      return;
    }

    // user reacted to the comment with the same reaction
    if (userReaction.type === reactionType) {
      setReactionSummary((prev) =>
        prev.map((reaction) => {
          if (reaction.type === reactionType) {
            return {
              ...reaction,
              count: reaction.count - 1,
            };
          }
          return reaction;
        })
      );
      setReactionCount(reactionCount - 1);
      setUserReaction(null);

      return;
    }

    // user has reacted to the comment with a different reaction
    setReactionSummary((prev) =>
      prev.map((reaction) => {
        if (reaction.type === reactionType) {
          return {
            ...reaction,
            count: reaction.count + 1,
          };
        }
        if (reaction.type === userReaction.type) {
          return {
            ...reaction,
            count: reaction.count - 1,
          };
        }
        return reaction;
      })
    );
    setUserReaction({ type: reactionType });
  };

  return (
    <div key={comment._id} className="mb-4 last:mb-0">
      <div className="flex items-start">
        <Avatar photoURL={comment.author.avatar} size={48} />
        <div className="flex-grow ml-4">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="font-semibold">
              {comment.author.firstName} {comment.author.lastName}
            </p>
            <p className="mt-2 break-words">{comment.content}</p>
          </div>
          <div className="flex items-center text-sm text-dark-grey">
            <span className="ml-3">{timeAgo(comment.createdAt)}</span>

            <CommentReactionButton
              updateCommentReaction={updateCommentReaction}
              commentId={comment._id}
              userReaction={userReaction}
            />

            {reactionCount > 0 && (
              <>
                <span className="mr-2">{reactionCount}</span>
                <ThreeMostReaction
                  id={comment._id}
                  reactionSummary={reactionSummary}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

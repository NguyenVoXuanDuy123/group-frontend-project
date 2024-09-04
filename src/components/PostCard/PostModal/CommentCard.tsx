import ThreeDotsIcon from "@/components/svg/ThreeDotsIcon";
import { ReactionType } from "@/enums/post.enums";
import getFullName from "@/helpers/getFullName";
import { timeAgo } from "@/helpers/timeAgo";
import { Comment } from "@/types/comment.types";
import Avatar from "../../Common/User/Avatar";
import ThreeMostReaction from "../ThreeMostReaction";
import CommentActions from "./CommentActions";
import CommentReactionButton from "./CommentReactionButton";

type CommentCardProps = {
  comment: Comment;
  updateComment: (comment: Comment) => void;
  postAuthorId: string;
};

const CommentCard = ({
  comment,
  updateComment,
  postAuthorId,
}: CommentCardProps) => {
  const updateCommentReaction = (reactionType: ReactionType) => {
    // user has not reacted to the comment
    if (!comment.userReaction) {
      updateComment({
        ...comment,
        reactionCount: comment.reactionCount + 1,
        userReaction: { type: reactionType },
        reactionSummary: comment.reactionSummary.map((reaction) => {
          if (reaction.type === reactionType) {
            return {
              ...reaction,
              count: reaction.count + 1,
            };
          }
          return reaction;
        }),
      });
    }

    // user reacted to the comment with the same reaction
    else if (comment.userReaction.type === reactionType) {
      updateComment({
        ...comment,
        reactionCount: comment.reactionCount - 1,
        userReaction: null,
        reactionSummary: comment.reactionSummary.map((reaction) => {
          if (reaction.type === reactionType) {
            return {
              ...reaction,
              count: reaction.count - 1,
            };
          }
          return reaction;
        }),
      });
    }

    // user has reacted to the comment with a different reaction
    else {
      updateComment({
        ...comment,
        reactionCount: comment.reactionCount,
        userReaction: { type: reactionType },
        reactionSummary: comment.reactionSummary.map((reaction) => {
          if (reaction.type === reactionType) {
            return {
              ...reaction,
              count: reaction.count + 1,
            };
          }
          if (reaction.type === comment.userReaction!.type) {
            return {
              ...reaction,
              count: reaction.count - 1,
            };
          }
          return reaction;
        }),
      });
    }
  };

  return (
    <div key={comment._id} className="mb-4 last:mb-0">
      <div className="flex items-start">
        <Avatar photoURL={comment.author.avatar} size={48} />
        <div className="flex-grow ml-4">
          <div className="bg-gray-100 rounded-lg p-3 relative">
            <div className="flex w-full justify-between">
              <p className="font-semibold">{getFullName(comment.author)}</p>
              {/* <div className="p-2 absolute top-1 right-3 cursor-pointer rounded-full hover:bg-grey">
                <ThreeDotsIcon />
              </div> */}
              <CommentActions comment={comment} postAuthorId={postAuthorId} />
            </div>
            <p className="mt-2 break-words">{comment.content}</p>
          </div>
          <div className="flex items-center text-sm text-dark-grey">
            <span className="ml-3">{timeAgo(comment.createdAt)}</span>

            <CommentReactionButton
              updateCommentReaction={updateCommentReaction}
              commentId={comment._id}
              userReaction={comment.userReaction}
            />

            {comment.reactionCount > 0 && (
              <>
                <span className="mr-2">{comment.reactionCount}</span>
                <ThreeMostReaction
                  id={comment._id}
                  reactionSummary={comment.reactionSummary}
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

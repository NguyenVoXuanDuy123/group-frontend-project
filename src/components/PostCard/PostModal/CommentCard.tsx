import { ReactionType } from "@/enums/post.enums";
import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { timeAgo } from "@/helpers/timeAgo";
import { setToast } from "@/redux/slices/toastSlice";
import { Comment } from "@/types/comment.types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "@/components/Common/User/Avatar";
import ThreeMostReaction from "@/components/PostCard/ThreeMostReaction";
import CommentActions from "@/components/PostCard/PostModal/CommentActions";
import CommentReactionButton from "@/components/PostCard/PostModal/CommentReactionButton";
import { Link } from "react-router-dom";

type CommentCardProps = {
  comment: Comment;
  updateComment?: (comment: Comment) => void;
  deleteComment?: (commentId: string) => void;
  postAuthorId?: string;
  readonly?: boolean;
};

const CommentCard = ({
  comment,
  updateComment,
  deleteComment,
  postAuthorId,
  readonly,
}: CommentCardProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useDispatch();

  const updateCommentReaction = (reactionType: ReactionType) => {
    // user has not reacted to the comment
    if (!comment.userReaction) {
      if (!updateComment) return;

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
      if (!updateComment) return;

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
      if (!updateComment) return;
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

  const handleEditComment = async () => {
    const newContent = textInputRef.current!.value.trim();
    if (newContent === comment.content) {
      setEditMode(false);
      return;
    }
    if (!newContent) {
      dispatch(setToast({ message: "Comment cannot be empty", type: "error" }));
      return;
    }

    const response = await fetchApi<Comment>(
      `/api/comments/${comment._id}`,
      "PATCH",
      dispatch,
      {
        content: newContent,
      }
    );
    if (response.status === "success") {
      if (!updateComment) return;
      updateComment(response.result);
      setEditMode(false);
      dispatch(
        setToast({ message: "Comment updated successfully", type: "success" })
      );
    }
  };

  return (
    <div key={comment._id} className="mt-2 mb-4 last:mb-0">
      <div className="flex items-start">
        <Link to={`/${comment.author.username}`}>
          <Avatar photoURL={comment.author.avatar} size={48} />
        </Link>
        <div className="flex-grow ml-4">
          <div className="bg-gray-100 rounded-lg p-3 relative">
            <div className="flex w-full justify-between">
              <Link to={`/${comment.author.username}`}>
                <p className="font-semibold hover:underline">
                  {getFullName(comment.author)}
                </p>
              </Link>
              {!readonly && (
                <CommentActions
                  comment={comment}
                  postAuthorId={postAuthorId!}
                  setEditMode={setEditMode}
                  deleteComment={deleteComment!}
                />
              )}
            </div>
            {editMode && !readonly ? (
              <>
                <textarea
                  ref={textInputRef}
                  className="w-full mt-2 p-2 rounded-lg focus:outline-none resize-none"
                  defaultValue={comment.content}></textarea>
                <button
                  onClick={handleEditComment}
                  className="mt-2 bg-primary rounded-lg px-4 py-2 text-white">
                  Save change
                </button>
              </>
            ) : (
              <p className="mt-2 break-words">{comment.content}</p>
            )}
          </div>
          {!readonly && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

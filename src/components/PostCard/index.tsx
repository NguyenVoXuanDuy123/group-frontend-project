import VisibilityLevelIcon from "@/components/PostCard/VisibilityLevelIcon";
import getFullName from "@/helpers/getFullName";
import { timeAgo } from "@/helpers/timeAgo";
import { Post, ReactionCounter, UserReaction } from "@/types/post.types";
import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Common/User/Avatar";
import CommentAction from "../svg/post/CommentAction";
import CommentModal from "./PostModal";
import ImageCarousel from "./ImageCarousel";
import ReactionButton from "./ReactionButton";
import ReactionListModal from "./ReactionListModal";
import ThreeMostReaction from "./ThreeMostReaction";
import TruncateText from "./TruncateContent";

type PostCardProps = {
  post: Post;
  inCommentModal?: boolean;
};

const PostCard = ({ post, inCommentModal = false }: PostCardProps) => {
  const [userReaction, setUserReaction] = useState<UserReaction | null>(
    post.userReaction || null
  );
  const [reactionCount, setReactionCount] = useState<number>(
    post.reactionCount || 0
  );
  const [reactionSummary, setReactionSummary] = useState<ReactionCounter[]>(
    post.reactionSummary
  );

  const [reactionListModalShowing, setReactionListModalShowing] =
    useState<boolean>(false);

  const [commentModalShowing, setCommentModalShowing] =
    useState<boolean>(false);

  const showCommentModal = () => {
    setCommentModalShowing(true);
  };

  const hideCommentModal = () => {
    setCommentModalShowing(false);
  };

  const showReactionModal = () => {
    setReactionListModalShowing(true);
  };

  const hideReactionModal = () => {
    setReactionListModalShowing(false);
  };

  const updateReaction = (newReaction: UserReaction) => {
    if (!userReaction) {
      // user has not reacted to the post
      setReactionSummary((prev) =>
        prev.map((reaction) => {
          if (reaction.type === newReaction.type) {
            return {
              ...reaction,
              count: reaction.count + 1,
            };
          }
          return reaction;
        })
      );
      setReactionCount(reactionCount + 1);
      setUserReaction(newReaction);
    } else if (userReaction?.type === newReaction.type) {
      // user has reacted to the post with the same reaction
      setReactionSummary((prev) =>
        prev.map((reaction) => {
          if (reaction.type === newReaction.type) {
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
    } else {
      // user has reacted to the post with a different reaction
      setReactionSummary((prev) =>
        prev.map((reaction) => {
          if (reaction.type === newReaction.type) {
            return {
              ...reaction,
              count: reaction.count + 1,
            };
          } else if (reaction.type === userReaction?.type) {
            return {
              ...reaction,
              count: reaction.count - 1,
            };
          }
          return reaction;
        })
      );
      setUserReaction(newReaction);
    }
  };

  return (
    <>
      <div className="w-full mx-auto bg-white rounded-xl overflow-hidden my-4">
        <div className="md:flex flex-1">
          <div
            className={`flex-1 flex flex-col ${inCommentModal ? "" : "px-4 pt-4"}`}>
            {/* Profile Section */}
            <div className="flex items-center mb-2">
              <Link to={`/${post.author.username}`}>
                <Avatar photoURL={post.author.avatar} />
              </Link>
              <div className="ml-4">
                <Link
                  to={`/${post.author.username}`}
                  className="text-black no-underline">
                  <div className="hover:underline">
                    {getFullName(post.author)}
                  </div>
                </Link>
                <div className="text-dark-grey text-sm flex  items-center">
                  {timeAgo(post.createdAt)} •{" "}
                  <VisibilityLevelIcon visibilityLevel={post.visibilityLevel} />
                </div>
              </div>
            </div>

            <TruncateText text={post.content} maxLength={200} />

            {post.images.length > 0 && <ImageCarousel images={post.images} />}

            {/* Reactions and Comments */}
            <div className="my-3 flex justify-between text-dark-grey text-sm">
              <div className=" flex items-center">
                {reactionCount > 0 && (
                  <ThreeMostReaction
                    id={post.id}
                    reactionSummary={reactionSummary}
                  />
                )}
                <span
                  className="leading-6 hover:underline cursor-pointer"
                  onClick={showReactionModal}>
                  {reactionCount} {reactionCount > 0 ? "Reactions" : "Reaction"}
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className="leading-6 hover:underline cursor-pointer"
                  onClick={showCommentModal}>
                  {post.commentCount}{" "}
                  {post.commentCount > 0 ? "Comments" : "Comment"}
                </span>
              </div>
            </div>

            {/* Reactions and Comments */}
            <div
              className={`border-t py-2 flex justify-between items-center text-dark-grey ${inCommentModal ? "border-b" : ""}`}>
              <ReactionButton
                userReaction={userReaction}
                updateReaction={updateReaction}
                postId={post.id}
              />
              <div
                onClick={showCommentModal}
                className="rounded-lg p-3 flex flex-1 items-center justify-center cursor-pointer hover:bg-light-grey">
                <CommentAction />
                <span className="ml-2">Comment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactionListModal
        hideModal={hideReactionModal}
        open={reactionListModalShowing}
        postId={post.id}
      />

      <CommentModal
        hideModal={hideCommentModal}
        open={commentModalShowing}
        post={post}
      />
    </>
  );
};

export default PostCard;

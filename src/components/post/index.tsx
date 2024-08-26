import reactionMap from "@/constants/reactionMap";
import getFullName from "@/helpers/getFullName";
import getThreeMostReactionTypes from "@/helpers/getThreeMostReactionTypes";
import { timeAgo } from "@/helpers/timeAgo";
import { Post, ReactionCounter, UserReaction } from "@/types/post.types";
import CommentAction from "../svg/post/CommentAction";
import Avatar from "../user/Avatar";
import ImageCarousel from "./ImageCarousel";
import ReactionButton from "./ReactionButton";
import TruncateText from "./TruncateContent";
import { useState } from "react";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const [userReaction, setUserReaction] = useState<UserReaction | null>(
    post.userReaction || null
  );
  const [reactionCount, setReactionCount] = useState<number>(
    post.reactionCount || 0
  );
  const [reactionSummary, setReactionSummary] = useState<ReactionCounter[]>(
    post.reactionSummary
  );

  const updateUserReaction = (newReaction: UserReaction) => {
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
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex flex-1">
        <div className="px-4 pt-4 flex-1 flex flex-column">
          {/* Profile Section */}
          <div className="flex items-center mb-2">
            <Avatar photoURL={post.author.avatar} />
            <div className="ml-4">
              <div className="">{getFullName(post.author)}</div>
              <div className="text-dark-grey text-sm">
                {timeAgo(post.createdAt)}
              </div>
            </div>
          </div>

          <TruncateText text={post.content} maxLength={200} />

          {post.images.length > 0 && <ImageCarousel images={post.images} />}

          {/* Reactions and Comments */}
          <div className="my-3 flex justify-between text-dark-grey text-sm">
            <div className=" flex items-center">
              {reactionCount > 0 && (
                <div className="ml-2 mr-2 flex items-center">
                  {getThreeMostReactionTypes(reactionSummary).map(
                    (reactionType) => {
                      const Component = reactionMap[reactionType];
                      return (
                        <Component
                          key={`${post.id}-${reactionType}`}
                          className={` ml-[-8px]`}
                        />
                      );
                    }
                  )}
                </div>
              )}
              <span className="leading-6">
                {reactionCount} {reactionCount > 0 ? "Reactions" : "Reaction"}
              </span>
            </div>
            <div className="flex items-center">
              <span>
                {post.commentCount}{" "}
                {post.commentCount > 0 ? "Comments" : "Comment"}
              </span>
            </div>
          </div>

          {/* Reactions and Comments */}
          <div className="border-top py-2 flex justify-between items-center text-dark-grey">
            <ReactionButton
              userReaction={userReaction}
              updateUserReaction={updateUserReaction}
              postId={post.id}
            />
            <div className="rounded-lg p-3 flex flex-1 items-center justify-center cursor-pointer hover:bg-light-grey">
              <CommentAction />
              <span className="ml-1">Comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

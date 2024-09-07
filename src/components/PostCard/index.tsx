import Avatar from "@/components/Common/User/Avatar";
import ImageCarousel from "@/components/PostCard/ImageCarousel";
import PostActions from "@/components/PostCard/PostActions";
import PostModal from "@/components/PostCard/PostModal";
import ReactionButton from "@/components/PostCard/ReactionButton";
import ReactionListModal from "@/components/PostCard/ReactionListModal";
import ThreeMostReaction from "@/components/PostCard/ThreeMostReaction";
import TruncateText from "@/components/PostCard/TruncateContent";
import VisibilityLevelIcon from "@/components/PostCard/VisibilityLevelIcon";
import CommentAction from "@/components/svg/post/CommentAction";
import getFullName from "@/helpers/getFullName";
import { timeAgo } from "@/helpers/timeAgo";
import { Group } from "@/types/group.types";
import { Post, UserReaction } from "@/types/post.types";
import { useState } from "react";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Post;
  inModal?: boolean;
  readonly?: boolean;

  // setPosts is used to update the post list when post is deleted or updated (reactions, comments, edit, etc)
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;

  // the group Object is passed means that post was fetched while user was viewing a group
  group?: Group;
};

const PostCard = ({
  post,
  inModal = false,
  readonly = false,
  setPosts,
  group,
}: PostCardProps) => {
  const [reactionListModalShowing, setReactionListModalShowing] =
    useState<boolean>(false);

  const [postModalShowing, setPostModalShowing] = useState<boolean>(false);

  const showPostModal = () => {
    if (inModal) return;
    setPostModalShowing(true);
  };

  const hidePostModal = () => {
    setPostModalShowing(false);
  };

  const showReactionModal = () => {
    setReactionListModalShowing(true);
  };

  const hideReactionModal = () => {
    setReactionListModalShowing(false);
  };

  const updateReaction = (newReaction: UserReaction) => {
    if (!setPosts) return;

    if (!post.userReaction) {
      // user has not reacted to the post
      setPosts((prev) =>
        prev.map((p) => {
          if (p._id === post._id) {
            return {
              ...p,
              reactionCount: p.reactionCount + 1,
              reactionSummary: p.reactionSummary.map((reaction) => {
                if (reaction.type === newReaction.type) {
                  return {
                    ...reaction,
                    count: reaction.count + 1,
                  };
                }
                return reaction;
              }),
              userReaction: newReaction,
            };
          }
          return p;
        })
      );
    } else if (post.userReaction?.type === newReaction.type) {
      // user has reacted to the post with the same reaction then remove the reaction
      setPosts((prev) =>
        prev.map((p) => {
          if (p._id === post._id) {
            return {
              ...p,
              reactionCount: p.reactionCount - 1,
              reactionSummary: p.reactionSummary.map((reaction) => {
                if (reaction.type === newReaction.type) {
                  return {
                    ...reaction,
                    count: reaction.count - 1,
                  };
                }
                return reaction;
              }),
              userReaction: null,
            };
          }
          return p;
        })
      );
    } else {
      // user has reacted to the post with a different reaction
      setPosts((prev) =>
        prev.map((p) => {
          if (p._id === post._id) {
            return {
              ...p,
              reactionCount: p.reactionCount,
              reactionSummary: p.reactionSummary.map((reaction) => {
                if (reaction.type === newReaction.type) {
                  return {
                    ...reaction,
                    count: reaction.count + 1,
                  };
                }
                if (reaction.type === post.userReaction!.type) {
                  return {
                    ...reaction,
                    count: reaction.count - 1,
                  };
                }
                return reaction;
              }),
              userReaction: newReaction,
            };
          }
          return p;
        })
      );
    }
  };

  return (
    <>
      <div
        className={`w-full mx-auto rounded-xl overflow-hidden my-4 ${readonly ? "bg-light-grey" : "bg-white"}`}>
        <div className="md:flex flex-1">
          <div className={`flex-1 flex flex-col ${inModal ? "" : "px-4 pt-4"}`}>
            {/* Profile Section */}
            <div className="flex items-center mb-2">
              {/* Avatar Section */}
              <Link to={`/${post.author.username}`}>
                <Avatar photoURL={post.author.avatar} />
              </Link>

              {/* Name and Time Section */}
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    {
                      /*If group object is passed, that means the post is fetched while user is viewing a group
                       *So, we don't show the group name in the post card
                       */
                      !group &&
                        /*If the post was fetched from home feed, we show the group name in the post card
                         *if the post is created in a group
                         */
                        post.group && (
                          <Link
                            to={`/groups/${post.group._id}`}
                            className="text-black no-underline">
                            <div className="hover:underline">
                              {post.group.name}{" "}
                            </div>
                          </Link>
                        )
                    }

                    {(group || !post.group?.name) && (
                      // Only show the author name as primary title
                      // if the post is fetched while user is viewing a group
                      // or the post is not created in a group
                      <Link
                        to={`/${post.author.username}`}
                        className="text-black no-underline">
                        <div className="hover:underline">
                          {getFullName(post.author)}
                        </div>
                      </Link>
                    )}
                  </div>
                  {!readonly && (
                    <PostActions
                      post={post}
                      setPosts={setPosts}
                      // If the post is fetched while user is viewing a group, we pass the group.admin.id
                      // Otherwise we pass the post.group.admin, which is the admin id of the group where the post was created
                      // If the post is not created in a group, null is passed
                      groupAdminId={group?.admin._id || post.group?.admin}
                    />
                  )}
                </div>
                <div className="text-dark-grey text-sm flex space-x-1 items-center">
                  {!group && post.group?.name && (
                    // Show the author name as secondary title
                    // if the user on feed is viewing a post created in a group
                    <Link
                      to={`/${post.author.username}`}
                      className="text-dark-grey no-underline flex">
                      <div className="hover:underline">
                        {getFullName(post.author)}
                      </div>
                      <span className="ml-1"> • </span>
                    </Link>
                  )}
                  <span> {` ${timeAgo(post.createdAt)}  •`}</span>
                  <VisibilityLevelIcon visibilityLevel={post.visibilityLevel} />
                </div>
              </div>
            </div>

            <TruncateText text={post.content} maxLength={200} />

            {post.images.length > 0 && (
              <ImageCarousel readonly={readonly} images={post.images} />
            )}

            {/* Reactions and Comments */}
            {!readonly && (
              <>
                <div className="mb-3 flex justify-between text-dark-grey text-sm">
                  <div className=" flex items-center">
                    {post.reactionCount > 0 && (
                      <ThreeMostReaction
                        id={post._id}
                        reactionSummary={post.reactionSummary}
                      />
                    )}
                    <span
                      className="leading-6 hover:underline cursor-pointer"
                      onClick={showReactionModal}>
                      {post.reactionCount}{" "}
                      {post.reactionCount > 0 ? "Reactions" : "Reaction"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span
                      className="leading-6 hover:underline cursor-pointer"
                      onClick={!readonly ? showPostModal : () => {}}>
                      {post.commentCount}{" "}
                      {post.commentCount > 0 ? "Comments" : "Comment"}
                    </span>
                  </div>
                </div>
                <div
                  className={`border-t py-2 flex justify-between items-center text-dark-grey ${inModal ? "border-b" : ""}`}>
                  <ReactionButton
                    userReaction={post.userReaction}
                    updateUserReaction={updateReaction}
                    postId={post._id}
                  />
                  <div
                    onClick={showPostModal}
                    className="rounded-lg p-3 flex flex-1 items-center justify-center cursor-pointer hover:bg-light-grey">
                    <CommentAction />
                    <span className="ml-2">Comment</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ReactionListModal
        hideModal={hideReactionModal}
        open={reactionListModalShowing}
        postId={post._id}
      />

      <PostModal
        setPosts={setPosts!}
        hideModal={hidePostModal}
        open={postModalShowing}
        post={post}
      />
    </>
  );
};

export default PostCard;

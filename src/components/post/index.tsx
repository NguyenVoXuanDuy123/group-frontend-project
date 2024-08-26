import reactionMap from "@/constants/reactionMap";
import getFullName from "@/helpers/getFullName";
import getThreeMostReactionTypes from "@/helpers/getThreeMostReactionTypes";
import { timeAgo } from "@/helpers/timeAgo";
import { Post } from "@/types/post.types";
import CommentAction from "../svg/post/CommentAction";
import Avatar from "../user/Avatar";
import ImageCarousel from "./ImageCarousel";
import ReactionButton from "./ReactionButton";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex flex-1">
        <div className="px-4 pt-4 flex-1 flex flex-column">
          {/* Profile Section */}
          <div className="flex items-center mb-4">
            <Avatar photoURL={post.author.avatar} />
            <div className="ml-4">
              <div className="">{getFullName(post.author)}</div>
              <div className="text-dark-grey text-sm">
                {timeAgo(post.createdAt)}
              </div>
            </div>
          </div>

          {/* Post Content */}
          <p className="leading-6">
            {post.content} <span className="font-semibold">...See more</span>
          </p>

          {post.images.length > 0 && <ImageCarousel images={post.images} />}

          {/* Reactions and Comments */}
          <div className="my-3 flex justify-between text-dark-grey text-sm">
            <div className=" flex items-center">
              {post.reactionCount > 0 && (
                <div className="ml-2 mr-2 flex items-center">
                  {getThreeMostReactionTypes(post.reactionSummary).map(
                    (reactionType) => {
                      const Component = reactionMap[reactionType];
                      return <Component className={` ml-[-8px]`} />;
                    }
                  )}
                </div>
              )}
              <span>{post.reactionCount} Reactions</span>
            </div>
            <div className="flex items-center">
              <span>{post.commentCount} Comments</span>
            </div>
          </div>

          {/* Reactions and Comments */}
          <div className="border-top py-2 flex justify-between items-center text-dark-grey">
            <ReactionButton userReaction={post.userReaction} postId={post.id} />
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

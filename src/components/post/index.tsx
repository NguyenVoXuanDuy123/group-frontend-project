import { useState } from "react";
import LikeReaction from "../svg/reactions/Like";
import LoveReaction from "../svg/reactions/Love";
import Avatar from "../user/Avatar";
import LikeAction from "../svg/post/LikeAction";
import CommentAction from "../svg/post/CommentAction";
import HahaReaction from "../svg/reactions/Haha";
import AngryReaction from "../svg/reactions/Angry";
import { Post } from "@/types/post.types";
import getFullName from "@/helpers/getFullName";

type PostCardProps = {
  post: Post; 
}


const PostCard = ({post}: PostCardProps) => {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        <div className="px-4 pt-4">
          {/* Profile Section */}
          <div className="flex items-center mb-4">
            <Avatar photoURL={post.author.avatar} />
            <div className="ml-4">
              <div className="">{getFullName(post.author)}</div>
              <div className="text-dark-grey text-sm">{post.createdAt}</div>
            </div>
          </div>

          {/* Post Content */}
          <p className="mt-2 leading-6">
            {post.content}
            <span className="font-bold">See more</span>
          </p>

          {/* Image Section */}
          <img
            className="mt-4 w-full object-cover rounded-lg"
            // src="https://images.unsplash.com/photo-1548978886-6badb16fc09f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace this with the path to your image
            src={post.images[0]}
            alt="Porsche Car"
          />

          {/* Reactions and Comments */}
          <div className="my-3 flex justify-between text-dark-grey text-sm">
            <div className="flex items-center">
              <LikeReaction />
              <LoveReaction />
              <span className="ml-2">{post.reactionCount} Reactions</span>
            </div>
            <div className="flex items-center">
              <span className="">{post.commentCount} Comments</span>
            </div>
          </div>

          {/* Reactions and Comments */}
          <div className="border-top py-2 flex justify-between items-center text-dark-grey">
            <div
              className="rounded-lg p-3 relative flex flex-1 items-center justify-center cursor-pointer hover:bg-light-grey"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <LikeAction />
              <span className="ml-1">Like</span>
              {/* Reaction Popup */}
              {showReactions && (
                <div className="absolute bottom-full left-0 bg-white border border-gray-200 rounded-lg p-2 flex space-x-2">
                  <LikeReaction width={48} height={48} />
                  <LoveReaction width={48} height={48} />
                  <HahaReaction width={48} height={48} />
                  <AngryReaction width={48} height={48} />
                </div>
              )}
            </div>
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

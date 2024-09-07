import Avatar from "@/components/Common/User/Avatar";
import PostModal from "@/components/PostCard/PostModal";
import reactionMap from "@/constants/reactionMap";
import { ReactionTargetType, ReactionType } from "@/enums/post.enums";
import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { timeAgo } from "@/helpers/timeAgo";
import { truncateText } from "@/helpers/truncateText";
import { Post } from "@/types/post.types";
import { UserInformation } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type PostOrCommentReactionNotificationProps = {
  targetType: ReactionTargetType;
  type: ReactionType;
  content: string;
  senderDetail: UserInformation;
  createdAt: string;
  postId: string;
  isRead: boolean;
};

const PostOrCommentReactionNotification = ({
  createdAt,
  senderDetail,
  targetType,
  type,
  content,
  postId,
  isRead,
}: PostOrCommentReactionNotificationProps) => {
  const Reaction = reactionMap[type] || null;
  const [PostModalOpen, setPostModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetchApi<Post>(
        `/api/posts/${postId}`,
        "GET",
        dispatch
      );

      if (response.status === "success") {
        setPosts([response.result]);
      }
    };
    fetchPost();
  }, [dispatch, postId]);

  return (
    <>
      <div
        onClick={() => {
          setPostModalOpen(true);
        }}
        className="bg-white w-full rounded-md hover:bg-dark-grey/20 p-1 cursor-pointer text-sm">
        <div className="flex items-center">
          <div className="relative">
            <Avatar
              key={senderDetail._id}
              photoURL={senderDetail.avatar}
              size={64}
            />
            <div className="absolute bottom-0 right-1">
              <Reaction />
            </div>
          </div>

          <div className="flex-1 py-1 px-2">
            <span className="font-bold">{getFullName(senderDetail)} </span>
            <span>has reacted to your </span>
            <span>{targetType}: </span>
            <span className="text-dark-grey">{truncateText(content)}.</span>
            <div className="flex">
              <span className="text-xs text-grey">{timeAgo(createdAt)}</span>
            </div>
          </div>
          {!isRead && (
            <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
      </div>
      {posts.length !== 0 && (
        <PostModal
          hideModal={() => {
            setPostModalOpen(false);
          }}
          open={PostModalOpen}
          post={posts[0]}
          setPosts={setPosts}
        />
      )}
    </>
  );
};

export default PostOrCommentReactionNotification;

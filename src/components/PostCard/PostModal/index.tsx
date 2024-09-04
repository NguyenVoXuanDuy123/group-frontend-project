import InfiniteScroll from "@/components/Common/InfiniteScroll";
import Modal from "@/components/Common/Modal";
import PostCard from "@/components/PostCard";
import CommentCard from "@/components/PostCard/PostModal/CommentCard";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Comment } from "@/types/comment.types";
import { Post } from "@/types/post.types";
import CommentPrompt from "./CommentPrompt";

type Props = {
  open: boolean;
  hideModal: () => void;
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const COMMENTS_PER_PAGE = 15;

export const PostModal = ({ open, hideModal, post, setPosts }: Props) => {
  const { user } = useAuth();
  //add edit and delete comment nhe <3
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comments, setComments, loadMore, isLoading] =
    useInfiniteScroll<Comment>({
      endpoint: `/api/posts/${post._id}/comments`,
      limit: COMMENTS_PER_PAGE,
    });

  const updateComment = (updatedComment: Comment) => {
    setComments((prev) =>
      prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
    );
  };

  const createNewComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
    setPosts((prev) =>
      prev.map((p) => {
        if (p._id === post._id) {
          return {
            ...p,
            commentCount: p.commentCount + 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <Modal open={open} hideModal={hideModal}>
      <div className="flex-grow overflow-y-auto w-[720px]  ">
        {open ? (
          <>
            <PostCard setPosts={setPosts} inModal post={post} />
            <CommentPrompt
              onSubmit={createNewComment}
              postId={post._id}
              user={user!}
            />
            <InfiniteScroll
              items={comments}
              loadMore={loadMore}
              renderItem={(comment) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  postAuthorId={post.author._id}
                  updateComment={updateComment}
                />
              )}
            />
          </>
        ) : (
          <div className="bg-white h-[300px]"></div>
        )}
      </div>
      {!isLoading && comments.length === 0 && (
        <div className="mt-2 text-center text-gray-500">
          No comments to display.
        </div>
      )}
    </Modal>
  );
};

export default PostModal;

import { Comment } from "@/types/comment.types";
import { Post } from "@/types/post.types";
import PostCard from "@/components/PostCard";
import Modal from "@/components/Common/Modal";
import CommentCard from "@/components/PostCard/CommentCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import InfiniteScroll from "@/components/Common/InfiniteScroll";

type Props = {
  open: boolean;
  hideModal: () => void;
  post: Post;
};

const COMMENTS_PER_PAGE = 5;

export default function CommentModal({ open, hideModal, post }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comments, setComments, loadMore, isLoading] =
    useInfiniteScroll<Comment>({
      endpoint: `/api/posts/${post.id}/comments`,
      limit: COMMENTS_PER_PAGE,
    });

  return (
    <Modal open={open} hideModal={hideModal}>
      <div className="flex-grow overflow-y-auto w-[672px] max-w-2xl ">
        {open ? (
          <>
            <PostCard inCommentModal post={post} />
            <InfiniteScroll
              items={comments}
              loadMore={loadMore}
              renderItem={(comment) => (
                <CommentCard key={comment.id} comment={comment} />
              )}
            />
          </>
        ) : (
          <div className="bg-white h-[300px]"></div>
        )}
      </div>
      {!isLoading && comments.length === 0 && (
        <div className="text-center text-gray-500">No comments to display</div>
      )}
    </Modal>
  );
}

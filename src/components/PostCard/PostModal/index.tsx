import InfiniteScroll from "@/components/Common/InfiniteScroll";
import Modal from "@/components/Common/Modal";
import PostCard from "@/components/PostCard";
import CommentCard from "@/components/PostCard/PostModal/CommentCard";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Comment } from "@/types/comment.types";
import { Post } from "@/types/post.types";
import CommentPrompt from "./CommentPrompt";
import { Group } from "@/types/group.types";
import { UserGroupRelation } from "@/enums/group.enums";

type Props = {
  open: boolean;
  hideModal: () => void;
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  group?: Group;
};

const COMMENTS_PER_PAGE = 15;

export const PostModal = ({
  open,
  hideModal,
  post,
  setPosts,
  group,
}: Props) => {
  const { user } = useAuth();
  // console.log(group);

  const [comments, setComments, loadMore] = useInfiniteScroll<Comment>({
    endpoint: `/api/posts/${post._id}/comments`,
    limit: COMMENTS_PER_PAGE,
  });

  const updateComment = (updatedComment: Comment) => {
    setComments((prev) =>
      prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
    );
  };

  const deleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c._id !== commentId));
    setPosts((prev) =>
      prev.map((p) => {
        if (p._id === post._id) {
          return {
            ...p,
            commentCount: p.commentCount - 1,
          };
        }
        return p;
      })
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
      <div className="flex-grow overflow-y-auto mt-1 px-2  w-[720px]  ">
        {open ? (
          <>
            <PostCard setPosts={setPosts} inModal post={post} />
            {(group?.userGroupRelation === UserGroupRelation.ADMIN ||
              group?.userGroupRelation === UserGroupRelation.MEMBER) && (
              <CommentPrompt
                onSubmit={createNewComment}
                postId={post._id}
                user={user!}
              />
            )}
            <InfiniteScroll
              items={comments}
              loadMore={loadMore}
              renderItem={(comment) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  postAuthorId={post.author._id}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                />
              )}
            />
          </>
        ) : (
          <div className="bg-white h-[300px]"></div>
        )}
      </div>
    </Modal>
  );
};

export default PostModal;

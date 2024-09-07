import Modal from "@/components/Common/Modal";
import { timeAgo } from "@/helpers/timeAgo";
import { Comment } from "@/types/comment.types";
import { Post } from "@/types/post.types";
import PostCard from "..";
import CommentCard from "./CommentCard";

type EditHistoryModalProps = {
  originalPost?: Post;
  originalComment?: Comment;
  modalShowing: boolean;
  hideModal: () => void;
};

const EditHistoryModal = ({
  originalPost,
  originalComment,
  modalShowing,
  hideModal,
}: EditHistoryModalProps) => {
  const renderPostEditHistory = (originalPost: Post) => (
    <Modal open={modalShowing} hideModal={hideModal}>
      {originalPost.editHistory.length > 0 ? (
        <div className="pr-2 mt-4 max-w-2xl max-h-[80vh] overflow-y-scroll">
          {originalPost.editHistory.reverse().map((history) => {
            const post = {
              ...originalPost,
              content: history.content,
              images: history.images || [],
            };
            return (
              <div key={history._id}>
                <span>{`Edited ${timeAgo(history.editedAt)}`}</span>
                <PostCard
                  readonly
                  post={post}
                  key={post._id + history.editedAt}
                />
                <div className="h-[1px] bg-grey w-full mb-8"></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="text-center text-gray-500 mt-4 w-[672px]">
            No edit history to display
          </div>
        </div>
      )}
    </Modal>
  );

  const renderCommentEditHistory = (originalComment: Comment) => (
    <Modal open={modalShowing} hideModal={hideModal}>
      {originalComment.editHistory.length > 0 ? (
        <div className="pr-2 mt-4 max-w-2xl max-h-[80vh] overflow-y-scroll">
          {originalComment.editHistory.reverse().map((history) => {
            const comment = {
              ...originalComment,
              content: history.content,
            };
            return (
              <div key={history._id}>
                <span className="mb-4">{`Edited ${timeAgo(history.editedAt)}`}</span>
                <CommentCard comment={comment} readonly />
                <div className="h-[1px] bg-grey w-full mb-8"></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="text-center text-gray-500 mt-4 w-[672px]">
            No edit history to display
          </div>
        </div>
      )}
    </Modal>
  );

  return originalPost
    ? renderPostEditHistory(originalPost)
    : renderCommentEditHistory(originalComment!);
};

export default EditHistoryModal;

import Modal from "@/components/Common/Modal";
import { timeAgo } from "@/helpers/timeAgo";
import { Post } from "@/types/post.types";
import PostCard from "..";

type EditHistoryModalProps = {
  originalPost: Post;
  modalShowing: boolean;
  hideModal: () => void;
};

const EditHistoryModal = ({
  originalPost,
  modalShowing,
  hideModal,
}: EditHistoryModalProps) => {
  return (
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
              <div>
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
};

export default EditHistoryModal;

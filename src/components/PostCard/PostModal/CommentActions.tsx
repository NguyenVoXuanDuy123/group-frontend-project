import WarningModal from "@/components/Common/Modal/WarningUnfriendModal";
import Popover from "@/components/Common/Popover";
import EditIcon from "@/components/svg/EditIcon";
import HistoryIcon from "@/components/svg/HistoryIcon";
import ThreeDotsIcon from "@/components/svg/ThreeDotsIcon";
import TrashIcon from "@/components/svg/TrashIcon";
import { UserRole } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { RootState } from "@/redux/store";
import { Comment } from "@/types/comment.types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditHistoryModal from "./EditHistoryModal";

type CommentActionsProps = {
  comment: Comment;
  postAuthorId: string;
  groupAdminId?: string;
  setEditMode: (editMode: boolean) => void;
  deleteComment: (commentId: string) => void;
};

const CommentActions = ({
  comment,
  postAuthorId,
  groupAdminId,
  setEditMode,
  deleteComment,
}: CommentActionsProps) => {
  const dispatch = useDispatch();
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [warningDeleteCommentModal, setWarningDeleteCommentModal] =
    useState<boolean>(false);
  const [editHistoryModalOpen, setEditHistoryModalOpen] =
    useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user!);

  const showEditHistoryModal = () => {
    setEditHistoryModalOpen(true);
  };

  const hideEditHistoryModal = () => {
    setEditHistoryModalOpen(false);
  };

  const handleDeleteComment = async () => {
    const res = await fetchApi<Comment>(
      `/api/comments/${comment._id}`,
      "DELETE",
      dispatch
    );
    if (res) {
      deleteComment(comment._id);
      dispatch(
        setToast({
          message: "Comment deleted successfully",
          type: "success",
        })
      );
    }
  };

  return (
    <>
      <Popover
        key={comment._id}
        popoverOpen={popoverOpen}
        setPopoverOpen={setPopoverOpen}
        displayComponent={<ThreeDotsIcon />}
      >
        <div className=" w-[244px] bg-white shadow-md rounded-md ">
          {/* Comment can only be deleted by the comment author, post author, site-admin or group admin */}
          {(user._id === comment.author._id ||
            user._id === postAuthorId ||
            user.role === UserRole.ADMIN ||
            user._id === groupAdminId) && (
            <button
              onClick={() => setWarningDeleteCommentModal(true)}
              className="flex w-full px-4  py-2 text-gray-700 hover:bg-gray-100 text-left items-center"
            >
              <div className="mr-2 mb-[2px]">
                <TrashIcon />
              </div>
              Delete Comment
            </button>
          )}
          {/* Post can only be edited by the author */}
          {user._id === comment.author._id && (
            <button
              onClick={() => setEditMode(true)}
              className="flex w-full px-4  py-2 text-gray-700 hover:bg-gray-100 text-left items-center"
            >
              <div className="mr-2 mb-[2px]">
                <EditIcon />
              </div>
              Edit Comment
            </button>
          )}

          <button
            onClick={showEditHistoryModal}
            className="flex w-full px-4 rounded-md py-2 text-gray-700 hover:bg-gray-100 text-left items-center"
          >
            <div className="mr-2 mb-[2px]">
              <HistoryIcon />
            </div>
            View Edit History ({comment.editHistory.length})
          </button>
        </div>
      </Popover>
      <WarningModal
        onClose={() => setWarningDeleteCommentModal(false)}
        onConfirm={handleDeleteComment}
        open={warningDeleteCommentModal}
        warningContent="Are you sure you want to delete this comment?"
      />
      <EditHistoryModal
        originalComment={comment}
        modalShowing={editHistoryModalOpen}
        hideModal={hideEditHistoryModal}
      />
    </>
  );
};

export default CommentActions;

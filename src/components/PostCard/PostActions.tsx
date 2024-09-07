import Popover from "@/components/Common/Popover";
import ThreeDotsIcon from "@/components/svg/ThreeDotsIcon";
import TrashIcon from "@/components/svg/TrashIcon";
import { UserRole } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { Post } from "@/types/post.types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@/components/svg/EditIcon";
import HistoryIcon from "@/components/svg/HistoryIcon";
import WarningModal from "@/components/Common/Modal/WarningUnfriendModal";
import CreateOrEditPostModal from "../Common/Post/CreateOrEditPostModal";
import EditHistoryModal from "./PostModal/EditHistoryModal";
import { RootState } from "@/redux/store";

type SiteAdminActionsProps = {
  post: Post;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;

  // groupAdminId is passed when the post is fetched from a group, so that the group admin can delete the post
  groupAdminId?: string;
};

const PostActions = ({
  post,
  setPosts,
  groupAdminId,
}: SiteAdminActionsProps) => {
  const dispatch = useDispatch();
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [warningDeletePostModal, setWarningDeletePostModal] =
    useState<boolean>(false);
  const [editPostModalOpen, setEditPostModalOpen] = useState<boolean>(false);
  const [editHistoryModalOpen, setEditHistoryModalOpen] =
    useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user!);

  const showEditHistoryModal = () => {
    setEditHistoryModalOpen(true);
  };

  const hideEditHistoryModal = () => {
    setEditHistoryModalOpen(false);
  };

  const showEditModal = () => {
    setEditPostModalOpen(true);
  };

  const hideEditModal = () => {
    setEditPostModalOpen(false);
  };

  const handleDeletePost = async () => {
    const response = await fetchApi(
      `/api/posts/${post._id}`,
      "DELETE",
      dispatch
    );
    if (response.status === "success") {
      if (!setPosts) return;
      setPosts((prevPosts) =>
        prevPosts.filter((prevPost) => prevPost._id !== post._id)
      );
      dispatch(
        setToast({ message: "Post deleted successfully", type: "success" })
      );
    }
    setPopoverOpen(false);
  };
  return (
    <>
      <Popover
        key={post._id}
        popoverOpen={popoverOpen}
        setPopoverOpen={setPopoverOpen}
        displayComponent={<ThreeDotsIcon />}>
        <div className=" w-[244px] bg-white shadow-md rounded-md ">
          {/* Post can only be deleted by the author, site-admin or group admin */}
          {(user._id === post.author._id ||
            user.role === UserRole.ADMIN ||
            user._id === groupAdminId) && (
            <button
              onClick={() => setWarningDeletePostModal(true)}
              className="flex w-full px-4  py-2 text-gray-700 hover:bg-gray-100 text-left items-center">
              <div className="mr-2 mb-[2px]">
                <TrashIcon />
              </div>
              Delete post
            </button>
          )}
          {/* Post can only be edited by the author */}
          {user._id === post.author._id && (
            <button
              onClick={showEditModal}
              className="flex w-full px-4  py-2 text-gray-700 hover:bg-gray-100 text-left items-center">
              <div className="mr-2 mb-[2px]">
                <EditIcon />
              </div>
              Edit post
            </button>
          )}

          <button
            onClick={showEditHistoryModal}
            className="flex w-full px-4 rounded-md py-2 text-gray-700 hover:bg-gray-100 text-left items-center">
            <div className="mr-2 mb-[2px]">
              <HistoryIcon />
            </div>
            View Edit History ({post.editHistory.length})
          </button>
        </div>
      </Popover>
      <WarningModal
        onClose={() => setWarningDeletePostModal(false)}
        onConfirm={handleDeletePost}
        open={warningDeletePostModal}
        warningContent="Are you sure you want to delete this post?"
      />
      <CreateOrEditPostModal
        modalShowing={editPostModalOpen}
        hideModal={hideEditModal}
        setPosts={setPosts}
        post={post}
      />
      <EditHistoryModal
        originalPost={post}
        modalShowing={editHistoryModalOpen}
        hideModal={hideEditHistoryModal}
      />
    </>
  );
};

export default PostActions;

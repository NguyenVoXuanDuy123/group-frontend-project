import Popover from "@/components/Common/Popover";
import ThreeDotsIcon from "@/components/svg/ThreeDotsIcon";
import TrashIcon from "@/components/svg/TrashIcon";
import { UserRole } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { RootState } from "@/redux/store";
import { Post } from "@/types/post.types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type SiteAdminActionsProps = {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;

  // groupAdminId is passed when the post is fetched from a group, so that the group admin can delete the post
  groupAdminId?: string;
};

const PostActions = ({
  post,
  setPosts,
  groupAdminId,
}: SiteAdminActionsProps) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user!);
  const handleDeletePost = async () => {
    const response = await fetchApi(
      `/api/posts/${post.id}`,
      "DELETE",
      dispatch
    );
    if (response) {
      setPosts((prevPosts) =>
        prevPosts.filter((prevPost) => prevPost.id !== post.id)
      );
      dispatch(
        setToast({ message: "Post deleted successfully", type: "success" })
      );
    }
    setPopoverOpen(false);
  };

  return (
    <Popover
      popoverOpen={popoverOpen}
      setPopoverOpen={setPopoverOpen}
      displayComponent={<ThreeDotsIcon />}>
      <div className=" w-[212px] bg-white shadow-md rounded-md ">
        {/* Post can only be deleted by the author, site-admin or group admin */}
        {(user.id === post.author.id ||
          user.role === UserRole.ADMIN ||
          user.id === groupAdminId) && (
          <button
            onClick={handleDeletePost}
            className="flex w-full px-4  py-2 text-gray-700 hover:bg-gray-100 text-left items-center">
            <div className="mr-1 mb-[2px]">
              <TrashIcon size={24} />
            </div>
            Delete post
          </button>
        )}
        {/* Post can only be edited by the author */}
        {user.id === post.author.id && (
          <button className="flex w-full px-4  py-2 text-gray-700 hover:bg-gray-100 text-left items-center">
            <div className="mr-1 mb-[2px]">
              <TrashIcon size={24} />
            </div>
            Edit post
          </button>
        )}
        <button className="flex w-full px-4 rounded-md py-2 text-gray-700 hover:bg-gray-100 text-left items-center">
          <div className="mr-1 mb-[2px]">
            <TrashIcon size={24} />
          </div>
          View Edit History
        </button>
      </div>
    </Popover>
  );
};

export default PostActions;

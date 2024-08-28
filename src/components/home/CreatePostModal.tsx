import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { Post } from "@/types/post.types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import Avatar from "../user/Avatar";
import ImageInput from "./ImageInput";
import GlobalIcon from "../svg/GlobalIcon";
import FriendIcon from "../svg/side-bar-icons/FriendIcon";
import { PostVisibilityLevel } from "@/enums/post.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import Popover from "@/components/Common/Popover";

type CreatePostModalProps = {
  modalShowing: boolean;
  hideModal: () => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  fullName: string;
  avatar: string;

  // Optional group id to create post in a group
  // If groupId is provided, the post will be created in the group
  groupId?: string;
};

export default function CreatePostModal({
  modalShowing,
  hideModal,
  setPosts,
  fullName,
  avatar,
  groupId,
}: CreatePostModalProps) {
  const contentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<PostVisibilityLevel>(
    PostVisibilityLevel.PUBLIC
  );
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const updateImages = (images: string[]) => {
    setImages(images);
  };

  const submitPost = async () => {
    if (!contentInputRef.current) {
      return;
    }
    if (!contentInputRef.current.value.trim()) {
      dispatch(
        setToast({
          message: "Please enter some content 🥺🥺🥺",
          type: "error",
        })
      );
      return;
    }

    const content = contentInputRef.current.value;
    const res = await fetchApi<Post>("/api/posts", "POST", dispatch, {
      content,
      images,
      visibilityLevel: groupId ? PostVisibilityLevel.GROUP : privacy,
      groupId,
    });
    if (res) {
      setPosts((posts) => [res, ...posts]);
      hideModal();

      setImages([]);
      contentInputRef.current.value = "";

      dispatch(
        setToast({ message: "Create Post Successfully", type: "success" })
      );
    } else {
      dispatch(setToast({ message: "Failed to create post", type: "error" }));
    }
  };

  console.log(groupId, groupId === undefined);

  return (
    <Modal open={modalShowing} hideModal={hideModal}>
      <div className="flex items-center w-[680px] max-w-[680px]">
        <Avatar photoURL={avatar} />
        <div className="ml-3 flex-1">
          <div className="relative inline-block text-left">
            <div className="font-semibold">{fullName}</div>
            {groupId === undefined && (
              <>
                <Popover
                  popoverOpen={popoverOpen}
                  setPopoverOpen={setPopoverOpen}
                  displayComponent={
                    <button
                      type="button"
                      className="inline-flex justify-center items-center w-[60%] px-4 py-2 text-sm font-medium
                       text-gray-700 bg-white border border-light-grey rounded-md hover:bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                       w-full sm:w-auto"
                      id="privacy-menu"
                      aria-haspopup="true">
                      {privacy === PostVisibilityLevel.PUBLIC ? (
                        <GlobalIcon className="mr-2 h-4 w-4" />
                      ) : (
                        <FriendIcon className="mr-2 h-4 w-4" />
                      )}
                      {capitalizeFirstLetter(privacy)}
                    </button>
                  }>
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="privacy-menu">
                    <div className="py-1" role="none">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={() => {
                          setPrivacy(PostVisibilityLevel.PUBLIC);
                        }}>
                        <GlobalIcon className="mr-2 h-4 w-4" />
                        <span>Public</span>
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={() => {
                          setPrivacy(PostVisibilityLevel.FRIEND);
                        }}>
                        <FriendIcon className="mr-2 h-4 w-4" />
                        <span>Friends</span>
                      </button>
                    </div>
                  </div>
                </Popover>
              </>
            )}
          </div>
        </div>
      </div>
      <textarea
        ref={contentInputRef}
        className="w-full mt-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder={`What's on your mind, ${fullName}?`}
        rows={5}
      />
      <ImageInput images={images} updateImages={updateImages} />
      <button
        onClick={submitPost}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"

        // below is error
        // disabled={!contentInputRef.current?.value.trim()}
      >
        Post
      </button>
    </Modal>
  );
}

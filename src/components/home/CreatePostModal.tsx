import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { Post } from "@/types/post.types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import Avatar from "../user/Avatar";
import ImageInput from "./ImageInput";

type CreatePostModalProps = {
  modalShowing: boolean;
  hideModal: () => void;
};

const CreatePostModal = ({ modalShowing, hideModal }: CreatePostModalProps) => {
  const contentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<"public" | "friend">("public");

  const dispatch = useDispatch();

  const updateImages = (images: string[]) => {
    setImages(images);
  };

  const submitPost = async () => {
    if (!contentInputRef.current) {
      return;
    }
    const content = contentInputRef.current.value;
    const res = await fetchApi<{ message: string; result: Post }>(
      "/api/posts",
      "POST",
      dispatch,
      {
        content,
        images,
        visibilityLevel: privacy,
      }
    );
    if (res) {
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

  return (
    <Modal open={modalShowing} hideModal={hideModal}>
      <div className="flex items-center w-[744px]">
        <Avatar />
        <div className="ml-3 flex-1">
          <div className="font-semibold">Huong Dat Huy</div>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value as "public" | "friend")}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="public">Public</option>
            <option value="friend">Friend</option>
          </select>
        </div>
      </div>
      <textarea
        ref={contentInputRef}
        className="w-full mt-3 p-2 border border-gray-300 rounded focus:outline-none resize-none"
        placeholder="What's on your mind, Huy?"
        rows={5}
      />
      <ImageInput images={images} updateImages={updateImages} />
      <button
        onClick={submitPost}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded disabled:bg-blue-300"
      >
        Post
      </button>
    </Modal>
  );
};

export default CreatePostModal;

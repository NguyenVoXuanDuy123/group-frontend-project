import { useRef, useState } from "react";
import Avatar from "../user/Avatar";
import ImageInput from "./ImageInputField";
import { fetchApi } from "@/helpers/fetchApi";
import { useDispatch } from "react-redux";
import { Post } from "@/types/post.types";
import { setToast } from "@/redux/slices/toastSlice";
import * as bootstrap from "bootstrap";

const CreatePostModal = () => {
  const contentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<"public" | "friend">("public");
  const modalRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // Hide the modal
  const handleCloseModal = () => {
    const myModal = new bootstrap.Modal(modalRef.current!);
    console.log("myModal", myModal);
    myModal.hide();
  };

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
      dispatch(setToast({ message: res.message, type: "success" }));
      handleCloseModal();
      setImages([]);
      contentInputRef.current.value = "";
    } else {
      dispatch(setToast({ message: "Failed to create post", type: "error" }));
    }
  };

  return (
    <div className="modal modal-lg fade" id="createPostModal" ref={modalRef}>
      <div className="modal-dialog">
        <div className="modal-content bg-white p-4 border-0">
          <button className="absolute top-4 right-4" data-dismiss="modal">
            x
          </button>

          <div className="flex items-center">
            <Avatar />
            <div className="ml-3 flex-1">
              <div className="font-semibold">Huong Dat Huy</div>
              <select
                value={privacy}
                onChange={(e) =>
                  setPrivacy(e.target.value as "public" | "friend")
                }
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="public">Public</option>
                <option value="friend">friend</option>
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
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;

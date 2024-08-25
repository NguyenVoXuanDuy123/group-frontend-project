import { useRef, useState } from "react";
import Avatar from "../user/Avatar";
import ImageInput from "./ImageInputField";
import { fetchApi } from "@/helpers/fetchApi";
import { useDispatch } from "react-redux";

const CreatePostModal = () => {
  const contentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<"public" | "friend">("public");
  const dispatch = useDispatch();

  const updateImages = (images: string[]) => {
    setImages(images);
  };

  const submitPost = () => {
    if (!contentInputRef.current) {
      return;
    }
    const content = contentInputRef.current.value;
    fetchApi("/api/posts", "POST", dispatch, {
      content,
      images,
      visibilityLevel: privacy,
    });
  };

  return (
    <div className="modal modal-lg fade" id="exampleModal">
      <div className="modal-dialog">
        <div className="modal-content bg-white p-4 border-0">
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

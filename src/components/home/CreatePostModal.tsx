import { useState } from "react";
import Avatar from "../user/Avatar";
import ImageInput from "./ImageInputField";

const CreatePostModal = () => {
  const [privacy, setPrivacy] = useState<"Public" | "Friends">("Public");

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
                  setPrivacy(e.target.value as "Public" | "Friends")
                }
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="Public">Public</option>
                <option value="Friends">Friends</option>
              </select>
            </div>
          </div>
          <textarea
            className="w-full mt-3 p-2 border border-gray-300 rounded focus:outline-none resize-none"
            placeholder="What's on your mind, Huy?"
            rows={5}
          ></textarea>
          <ImageInput
            onImageSelect={(file) => {
              console.log(file);
            }}
          />
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded disabled:bg-blue-300">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;

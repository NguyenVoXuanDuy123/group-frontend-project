import { useState } from "react";
import ImageAdd from "../svg/post/ImageAdd";
import Avatar from "../user/Avatar";
import CreatePostModal from "./CreatePostModal";

const CreatePostPrompt = () => {
  const [modalShowing, setModalShowing] = useState<boolean>(false);

  const handleCloseModal = () => {
    setModalShowing(false);
  };

  const handleShowModal = () => {
    setModalShowing(true);
  };

  return (
    <>
      <div className="w-full rounded-xl bg-white p-4 flex">
        <Avatar />
        <button
          onClick={handleShowModal}
          className="flex items-center justify-between ml-4 w-full h-12 rounded-full bg-light-grey p-2.5 hover:bg-dark-grey/15">
          <span className="pl-2 text-grey text-sm">What's on your mind?</span>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <ImageAdd />
          </div>
        </button>
      </div>
      <CreatePostModal
        modalShowing={modalShowing}
        hideModal={handleCloseModal}
      />
    </>
  );
};

export default CreatePostPrompt;

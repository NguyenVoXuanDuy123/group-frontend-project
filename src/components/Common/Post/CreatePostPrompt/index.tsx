import Avatar from "@/components/Common/User/Avatar";
import getFullName from "@/helpers/getFullName";
import { Post } from "@/types/post.types";
import { useState } from "react";
import CreateOrEditPostModal from "@/components/Common/Post/CreateOrEditPostModal";
import { useAuth } from "@/hooks/useAuth";

type CreatePostPromptProps = {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;

  // Optional group id to create post in a group
  // If groupId is provided, the post will be created in the group
  groupId?: string;
};

const CreatePostPrompt = ({ setPosts, groupId }: CreatePostPromptProps) => {
  const [modalShowing, setModalShowing] = useState<boolean>(false);
  const { user } = useAuth();
  if (!user) return null;

  const handleCloseModal = () => {
    setModalShowing(false);
  };

  const handleShowModal = () => {
    setModalShowing(true);
  };

  return (
    <>
      <div className="w-full rounded-xl bg-white p-4 flex">
        <Avatar photoURL={user.avatar} />
        <button
          onClick={handleShowModal}
          className="flex items-center justify-between ml-4 w-full h-12 rounded-full bg-light-grey p-2.5 hover:bg-dark-grey/15">
          <span className="pl-2 text-grey text-sm">What's on your mind?</span>
          {/* <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <ImageAdd />
          </div> */}
        </button>
      </div>
      <CreateOrEditPostModal
        groupId={groupId}
        fullName={getFullName(user)}
        avatar={user.avatar}
        setPosts={setPosts}
        modalShowing={modalShowing}
        hideModal={handleCloseModal}
      />
    </>
  );
};

export default CreatePostPrompt;

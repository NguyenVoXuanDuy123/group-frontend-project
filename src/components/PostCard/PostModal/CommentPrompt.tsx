import Avatar from "@/components/Common/User/Avatar";
import SendIcon from "@/components/svg/SendIcon";
import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { Comment } from "@/types/comment.types";
import { UserInformation } from "@/types/user.types";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type CommentPromptProps = {
  postId: string;
  user: UserInformation;
  onSubmit: (comment: Comment) => void;
};

const CommentPrompt = ({ postId, user, onSubmit }: CommentPromptProps) => {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 208);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handleSubmit = async () => {
    if (!message.trim()) {
      dispatch(
        setToast({
          message: "Please enter some content 🥺🥺🥺",
          type: "error",
        })
      );
      return;
    }
    const response = await fetchApi<Comment>(
      `/api/posts/${postId}/comments`,
      "POST",
      dispatch,
      {
        content: message.trim(),
      }
    );
    if (response.status === "success") {
      setMessage("");
      onSubmit(response.result);
    }
  };

  return (
    <div className="relative flex mb-6">
      <Avatar photoURL={user.avatar} />
      <div className="p-3 w-full ml-4 bg-light-grey rounded-lg flex flex-col items-end space-y-0">
        <textarea
          ref={textareaRef}
          value={message}
          rows={1}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your comment here..."
          className=" w-full pr-3 text-black bg-light-grey focus:outline-none resize-none overflow-y-auto  "></textarea>

        <div className="self-end cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-grey rounded-full">
          <SendIcon onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CommentPrompt;

import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { ReactionUserInfo } from "@/types/reaction.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import UserCard from "../Common/UserCard/ProfileFriendCard";
import { ReactionType } from "@/enums/post.enums";

type ReactionListModalProps = {
  modalShowing: boolean;
  hideModal: () => void;
  postId: string;
};

const ReactionListModal = ({
  modalShowing,
  hideModal,
  postId,
}: ReactionListModalProps) => {
  const [activeTab, setActiveTab] = useState<ReactionType>(ReactionType.LIKE);
  const [reactionLikeUserInfos, setReactionLikeUserInfos] = useState<
    ReactionUserInfo[]
  >([]);
  const [reactionLoveUserInfos, setReactionLoveUserInfos] = useState<
    ReactionUserInfo[]
  >([]);
  const [reactionHahaUserInfos, setReactionHahaUserInfos] = useState<
    ReactionUserInfo[]
  >([]);
  const [reactionAngryUserInfos, setReactionAngryUserInfos] = useState<
    ReactionUserInfo[]
  >([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReactions = async () => {
      const likeRes = await fetchApi<ReactionUserInfo[]>(
        `/api/posts/${postId}/reactions?type=like`,
        "GET",
        dispatch
      );
      const loveRes = await fetchApi<ReactionUserInfo[]>(
        `/api/posts/${postId}/reactions?type=love`,
        "GET",
        dispatch
      );
      const hahaRes = await fetchApi<ReactionUserInfo[]>(
        `/api/posts/${postId}/reactions?type=haha`,
        "GET",
        dispatch
      );
      const angryRes = await fetchApi<ReactionUserInfo[]>(
        `/api/posts/${postId}/reactions?type=angry`,
        "GET",
        dispatch
      );

      setReactionLikeUserInfos(likeRes || []);
      setReactionLoveUserInfos(loveRes || []);
      setReactionHahaUserInfos(hahaRes || []);
      setReactionAngryUserInfos(angryRes || []);
    };
    if (modalShowing) {
      fetchReactions();
    }
  }, [modalShowing, postId, dispatch]);

  const renderUserList = (users: ReactionUserInfo[]) => {
    if (!users.length)
      return (
        <div className="text-center text-dark-grey font-bold mt-4">
          No users reacted with {activeTab}
        </div>
      );

    return (
      <div className="mt-4 px-2">
        {users.map((info) => (
          <UserCard
            key={`${info.user.id}-${info.type}`}
            avatar={info.user.avatar}
            fullName={getFullName(info.user)}
            username={info.user.username}
          />
        ))}
      </div>
    );
  };

  return (
    <Modal open={modalShowing} hideModal={hideModal}>
      <div className="p-3 max-h-[500px] w-[484px]">
        <div className="border-b border-light-grey">
          <nav className="flex space-x-4">
            {Object.values(ReactionType).map((reaction) => (
              <button
                key={reaction}
                onClick={() => setActiveTab(reaction)}
                className={`px-4 py-2 text-sm ${
                  activeTab === reaction
                    ? "border-b-2 border-primary text-primary font-semibold"
                    : ""
                }`}>
                {reaction.charAt(0).toUpperCase() + reaction.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        {/* Update the div containing the user list */}
        <div className="mt-4 max-h-[400px] overflow-y-auto">
          {activeTab === ReactionType.LIKE &&
            renderUserList(reactionLikeUserInfos)}
          {activeTab === ReactionType.LOVE &&
            renderUserList(reactionLoveUserInfos)}
          {activeTab === ReactionType.HAHA &&
            renderUserList(reactionHahaUserInfos)}
          {activeTab === ReactionType.ANGRY &&
            renderUserList(reactionAngryUserInfos)}
        </div>
      </div>
    </Modal>
  );
};

export default ReactionListModal;

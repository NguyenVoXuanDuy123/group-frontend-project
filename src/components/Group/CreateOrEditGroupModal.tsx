import { useState } from "react";
import Modal from "@/components/Common/Modal";
import { GroupVisibilityLevel } from "@/enums/group.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import GlobalIcon from "@/components/svg/GlobalIcon";
import PrivateIcon from "@/components/svg/PrivateIcon";
import { Group, GroupCard } from "@/types/group.types";
import { fetchApi } from "@/helpers/fetchApi";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/slices/toastSlice";

type CreateOrEditGroupModalProps = {
  open: boolean;
  hideModal: () => void;

  // Optional props when editing a group
  group?: Group | GroupCard;

  // Optional props when editing a group, or create a new group card in my groups section in the profile
  setGroupCards?: (callBack: (prevGroups: GroupCard[]) => GroupCard[]) => void;

  // Optional props when editing a group
  setGroup?: React.Dispatch<React.SetStateAction<Group | null>>;
};

const CreateOrEditGroupModal = ({
  open,
  hideModal,
  group,
  setGroupCards,
  setGroup,
}: CreateOrEditGroupModalProps) => {
  const [name, setName] = useState<string>(group?.name || "");
  const [description, setDescription] = useState<string>(
    group?.description || ""
  );
  const [visibilityLevel, setVisibilityLevel] = useState<GroupVisibilityLevel>(
    group?.visibilityLevel || GroupVisibilityLevel.PUBLIC
  );

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // If group exists, then we are editing the group
    if (group) {
      const response = await fetchApi(
        `/api/groups/${group._id}`,
        "PATCH",
        dispatch,
        {
          name,
          description,
          visibilityLevel,
        }
      );

      if (response.status === "success") {
        if (setGroupCards) {
          setGroupCards((prevGroups) =>
            prevGroups.map((prevGroup) =>
              prevGroup._id === group._id
                ? {
                    ...prevGroup,
                    name,
                    description,
                    visibilityLevel,
                  }
                : prevGroup
            )
          );
        }
        if (setGroup) {
          setGroup((prevGroup) => ({
            ...prevGroup!,
            name,
            description,
            visibilityLevel,
          }));
        }
        dispatch(
          setToast({ type: "success", message: "Group updated successfully" })
        );
        hideModal();
      }
    }
    // If group does not exist, then we are creating a new group
    else {
      const response = await fetchApi<Group>("/api/groups", "POST", dispatch, {
        name,
        description,
        visibilityLevel,
      });

      if (response.status === "success") {
        hideModal();
        dispatch(
          setToast({ type: "success", message: "Group created successfully" })
        );
        setName("");
        setDescription("");
        setVisibilityLevel(GroupVisibilityLevel.PUBLIC);
        const group = response.result;

        if (!setGroupCards) return;
        const newGroup: GroupCard = {
          _id: group._id,
          name: group.name,
          description: group.description,
          visibilityLevel: group.visibilityLevel,
          status: group.status,
          createdAt: group.createdAt,
          memberCount: 1,
        };

        // If setGroupCards is provided, then we are updating the group card
        setGroupCards((prevGroups) => [newGroup, ...prevGroups]);
      }
    }
  };

  return (
    <Modal open={open} hideModal={hideModal}>
      <div className="p-6 bg-white max-w-md w-[448px]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {group ? "Edit Group" : "Create New Group"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
               focus:outline-none focus:ring-2 focus:ring-blue-500
                resize-none
               "
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Visibility Level
            </span>
            <div className="space-y-2">
              {Object.values(GroupVisibilityLevel).map((level) => (
                <label
                  key={level}
                  className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value={level}
                    checked={visibilityLevel === level}
                    onChange={() => setVisibilityLevel(level)}
                    className="form-radio h-5 w-5 text-blue-600 cursor-pointer"
                  />
                  <span className="text-gray-700 flex ">
                    <div className="mr-1">
                      {level === GroupVisibilityLevel.PUBLIC ? (
                        <GlobalIcon />
                      ) : (
                        <PrivateIcon />
                      )}
                    </div>
                    {capitalizeFirstLetter(level)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={hideModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {group ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateOrEditGroupModal;

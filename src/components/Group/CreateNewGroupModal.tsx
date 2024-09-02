import { useState } from "react";
import Modal from "@/components/Common/Modal";
import { GroupVisibilityLevel } from "@/enums/group.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import GlobalIcon from "@/components/svg/GlobalIcon";
import PrivateIcon from "@/components/svg/PrivateIcon";
import { Group } from "@/types/group.types";
import { fetchApi } from "@/helpers/fetchApi";
import { useDispatch } from "react-redux";

type CreateNewGroupModalProps = {
  open: boolean;
  hideModal: () => void;

  // Optional props when editing a group
  group?: Group;
  setGroup?: React.Dispatch<React.SetStateAction<Group | null>>;
};

const CreateOrUpdateGroupModal = ({
  open,
  hideModal,
  group,
  setGroup,
}: CreateNewGroupModalProps) => {
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
    // Handle form submission here
    if (group && setGroup) {
      const response = await fetchApi(
        `/api/groups/${group.id}`,
        "PATCH",
        dispatch,
        {
          name,
          description,
          visibilityLevel,
        }
      );

      if (response?.status === "success") {
        const newGroup: Group = {
          ...group,
          name,
          description,
          visibilityLevel,
        };
        setGroup(newGroup);
        hideModal();
      }
    } else {
      const response = await fetchApi("/api/groups", "POST", dispatch, {
        name,
        description,
        visibilityLevel,
      });

      if (response) {
        hideModal();
        setName("");
        setDescription("");
        setVisibilityLevel(GroupVisibilityLevel.PUBLIC);
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

export default CreateOrUpdateGroupModal;

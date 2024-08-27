import Modal from "@/components/Modal";
import { fetchApi } from "@/helpers/fetchApi";
import { Group } from "@/types/group.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type EditGroupModalProps = {
  open: boolean;
  onClose: () => void;
  group: Group;
  setGroup: React.Dispatch<React.SetStateAction<Group | null>>;
};

const MAX_WORD_COUNT = 150;

const countWords = (text: string) => {
  return text.trim().length;
};

export const EditGroupModal = ({
  open,
  onClose,
  group,
  setGroup,
}: EditGroupModalProps) => {
  const [name, setName] = useState<string>(group.name);
  const [description, setDescription] = useState<string>(group.description);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetchApi(
      `/api/groups/${group.id}`,
      "PATCH",
      dispatch,
      {
        name,
        description,
      }
    );

    if (response?.status === "success") {
      const newGroup: Group = { ...group, name, description };
      setGroup(newGroup);
      handleClose();
    }
  };

  // This is necessary because we can't use the user state directly in the form
  // because setUser don't update the user state immediately when we call it
  // so we use useEffect to reset the form when the user state changes
  useEffect(() => {
    handleClose();
  }, [group]);

  const handleClose = () => {
    onClose();
    setName(group.name);
    setDescription(group.description);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    if (countWords(newDescription) <= MAX_WORD_COUNT) {
      setDescription(newDescription);
    }
  };

  return (
    <Modal open={open} hideModal={handleClose}>
      <div className="flex flex-col space-y-6 bg-white rounded-lg w-96 ">
        <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="">
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700">
              Group Name
            </label>
            <input
              type="text"
              placeholder="Group Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md border h-8 px-2 focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="text-sm font-medium text-gray-700 flex items-center justify-between">
              Description
              <span className="text-gray-500 text-sm">
                {countWords(description)}/{MAX_WORD_COUNT}
              </span>
            </label>
            <textarea
              id="bio"
              value={description}
              onChange={handleBioChange}
              rows={4}
              placeholder="Tell us about yourself"
              className="mt-1 block w-full border-gray-300 rounded-md border p-1 px-2 focus:ring-primary focus:border-primary resize-none sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

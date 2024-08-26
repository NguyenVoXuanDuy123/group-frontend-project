import Modal from "@/components/Modal";
import { fetchApi } from "@/helpers/fetchApi";
import { updateUser } from "@/redux/slices/authSlice";
import { UserProfile } from "@/types/user.types";
import { useState } from "react";
import { useDispatch } from "react-redux";

type EditProfileModalProps = {
  open: boolean;
  onClose: () => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
};

const MAX_WORD_COUNT = 150;

const countWords = (text: string) => {
  return text.trim().length;
};

export const EditProfileModal = ({
  open,
  onClose,
  user,
  setUser,
}: EditProfileModalProps) => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [bio, setBio] = useState<string>(user.bio);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetchApi(
      `/api/users/profile/me`,
      "PATCH",
      dispatch,
      {
        firstName,
        lastName,
        bio,
      }
    );

    if (response?.status === "success") {
      const newUser = { ...user, firstName, lastName, bio };
      setUser(newUser);
      dispatch(updateUser(user));
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setBio(user.bio);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = e.target.value;
    if (countWords(newBio) <= MAX_WORD_COUNT) {
      setBio(newBio);
    }
  };

  return (
    <Modal open={open} hideModal={handleClose}>
      <div className="flex flex-col p-6 space-y-6 bg-white rounded-lg ">
        <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md border h-8 px-2 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md border h-8 px-2 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 flex items-center justify-between"
            >
              Bio
              <span className="text-gray-500 text-sm">
                {countWords(bio)}/{MAX_WORD_COUNT}
              </span>
            </label>
            <textarea
              id="bio"
              value={bio}
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
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

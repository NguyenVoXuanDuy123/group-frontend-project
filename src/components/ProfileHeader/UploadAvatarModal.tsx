import Modal from "@/components/Modal";
import ChevronLeft from "@/components/svg/ChevronLeft";
import ChevronRight from "@/components/svg/ChevronRight";
import { fetchApi } from "@/helpers/fetchApi";
import { UserProfile } from "@/types/user.types";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AVATAR_BASE_URL = "http://localhost:4000/images/avatar-{number}.png";
const AVATARS_PER_PAGE = 8;

const generateAvatarUrl = (avatarNumber: number) => {
  return AVATAR_BASE_URL.replace("{number}", avatarNumber.toString());
};

type UploadAvatarModalProps = {
  avatar: string;
  open: boolean;
  hideModal: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  user: UserProfile;
};

const UploadAvatarModal = ({
  avatar,
  open,
  hideModal,
  setUser,
  user,
}: UploadAvatarModalProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    avatar || generateAvatarUrl(0)
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const dispatch = useDispatch();

  const filteredAvatars = Array.from(
    { length: 50 },
    (_, i) => i + (isFemale ? 50 : 0)
  );

  const totalPages = Math.ceil(filteredAvatars.length / AVATARS_PER_PAGE);
  const currentAvatars = filteredAvatars.slice(
    (currentPage - 1) * AVATARS_PER_PAGE,
    currentPage * AVATARS_PER_PAGE
  );

  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleGenderToggle = () => {
    setIsFemale(!isFemale);
    setCurrentPage(1); // Reset to first page when switching gender
  };
  const onHideModal = () => {
    hideModal();
    setSelectedAvatar(avatar);
    setIsFemale(false);
  };

  const handleUploadAvatar = async () => {
    const response = await fetchApi(
      "/api/users/profile/me",
      "PATCH",
      dispatch,
      {
        avatar: selectedAvatar,
      }
    );
    if (response) {
      setUser({ ...user, avatar: selectedAvatar });
      setIsFemale(false);
      hideModal();
    }
  };
  return (
    <Modal open={open} hideModal={onHideModal}>
      <div className="h-[688px]  w-[800px] mx-auto  transition-colors duration-300 relative">
        <div className="container mx-auto px-4  ">
          {selectedAvatar && (
            <div className="mt-2  text-center ">
              <h2 className="text-2xl font-semibold mb-4">
                Choose Your Avatar
              </h2>
              <div className="inline-block relative w-40 h-40 rounded-full overflow-hidden shadow-lg">
                <img
                  src={selectedAvatar}
                  alt="Selected Avatar"
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end items-center mb-6  ">
            <span className="mr-3 text-sm font-medium text-gray-900">Male</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isFemale}
                onChange={handleGenderToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Female
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {currentAvatars.map((num) => (
              <div
                key={num}
                className={`relative aspect-square rounded-full overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  selectedAvatar === `${AVATAR_BASE_URL}/${num}`
                    ? "ring-4 ring-offset-4 ring-blue-500"
                    : ""
                }`}
                onClick={() => handleAvatarSelect(generateAvatarUrl(num))}>
                <img
                  src={generateAvatarUrl(num)}
                  alt={`Avatar ${num}`}
                  className="transition-opacity duration-300 ease-in-out rounded-full object-cover h-full w-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300" />
                <span className="absolute bottom-5 right-9 bg-white bg-opacity-75 text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                  {num + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-9 w-full">
            <div className="flex justify-center items-center space-x-4 absolute     right-[40%] z-50">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-white text-gray-800 disabled:opacity-50"
                aria-label="Previous page">
                <ChevronLeft color="black" />
              </button>
              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-white text-gray-800 disabled:opacity-50"
                aria-label="Next page">
                <ChevronRight color="black" />
              </button>
            </div>
            <button
              //If the selected avatar is the same as the current avatar, disable the button
              disabled={selectedAvatar === avatar}
              onClick={handleUploadAvatar}
              className="absolute right-5 transition-all duration-300 transform hover:scale-105
            bg-primary text-white font-semibold h-10 px-6 rounded flex justify-center items-center disabled:opacity-50">
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadAvatarModal;

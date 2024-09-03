import WarningModal from "@/components/Common/Modal/WarningUnfriendModal";
import Popover from "@/components/Common/Popover";
import ThreeDotsIcon from "@/components/svg/ThreeDotsIcon";
import { UserStatus } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { UserProfile } from "@/types/user.types";
import { useState } from "react";
import { useDispatch } from "react-redux";

type SiteAdminActionsProps = {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
};

const SiteAdminActions = ({ user, setUser }: SiteAdminActionsProps) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChangeUserStatus = async (status: UserStatus) => {
    const response = await fetchApi(
      `/api/users/${user._id}/status`,
      "PATCH",
      dispatch,
      { status }
    );
    if (response) {
      if (status === UserStatus.ACTIVE) {
        dispatch(setToast({ message: "User is now active", type: "success" }));
      }
      if (status === UserStatus.BANNED) {
        dispatch(
          setToast({ message: "User is now suspended", type: "success" })
        );
      }
      const updatedUser: UserProfile = { ...user, status };
      setUser(updatedUser);
    }
    setPopoverOpen(false);
  };

  return (
    <>
      <Popover
        popoverOpen={popoverOpen}
        setPopoverOpen={setPopoverOpen}
        displayComponent={<ThreeDotsIcon />}>
        <div className=" w-[145px] bg-white shadow-md rounded-md">
          {user.status === "active" ? (
            <button
              onClick={() => {
                setSuspendModalOpen(true);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              Suspend User
            </button>
          ) : (
            <button
              onClick={() => {
                handleChangeUserStatus(UserStatus.ACTIVE);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              Resume User
            </button>
          )}
        </div>
      </Popover>
      <WarningModal
        warningContent="Are you sure you want to suspend this user?"
        onClose={() => setSuspendModalOpen(false)}
        onConfirm={() => {
          handleChangeUserStatus(UserStatus.BANNED);
          setSuspendModalOpen(false);
        }}
        open={suspendModalOpen}
      />
    </>
  );
};

export default SiteAdminActions;

import { GroupVisibilityLevel } from "@/enums/group.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { GroupCard } from "@/types/group.types";
import Modal from "@/components/Common/Modal";
import GlobalIcon from "@/components/svg/GlobalIcon";
import PrivateIcon from "@/components/svg/PrivateIcon";

type GroupModalProps = {
  open: boolean;
  hideModal: () => void;
  group: GroupCard;
};

const InfoItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <div className="text-base font-semibold text-gray-900">{children}</div>
  </div>
);

export default function GroupModal({
  open,
  hideModal,
  group,
}: GroupModalProps) {
  return (
    <Modal open={open} hideModal={hideModal}>
      <div className="p-6 bg-white rounded-lg max-w-lg w-[700px]">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Group Details</h2>

        <div className="space-y-6">
          <InfoItem label="Group Name">{group.name}</InfoItem>

          <InfoItem label="Description">
            <p className="text-gray-700">
              {group.description || "No description available"}
            </p>
          </InfoItem>

          <InfoItem label="Visibility Level">
            <div className="flex items-center space-x-2">
              {group.visibilityLevel === GroupVisibilityLevel.PUBLIC ? (
                <GlobalIcon className="w-5 h-5 text-blue-500" />
              ) : (
                <PrivateIcon className="w-5 h-5 text-gray-500" />
              )}
              <span>{capitalizeFirstLetter(group.visibilityLevel)}</span>
            </div>
          </InfoItem>

          {group.rejectedReason && (
            <InfoItem label="Rejected Reason">
              <p className="text-red-600">{group.rejectedReason}</p>
            </InfoItem>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={hideModal}
            className="text-white bg-primary px-6 py-2 rounded-lg">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

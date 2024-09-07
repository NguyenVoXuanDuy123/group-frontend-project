import Modal from "@/components/Common/Modal";

type RejectGroupCreationModalProps = {
  hideModal: () => void;
  open: boolean;
  rejectedReason: string;
  setRejectedReason: React.Dispatch<React.SetStateAction<string>>;
  handleReject: () => void;
};

const RejectGroupCreationModal = ({
  hideModal,
  open,
  rejectedReason,
  setRejectedReason,
  handleReject,
}: RejectGroupCreationModalProps) => {
  // Check if rejectedReason is empty or only contains whitespace
  const isRejectButtonDisabled = rejectedReason.trim() === "";

  return (
    <Modal open={open} hideModal={hideModal}>
      <div className="modal p-8 bg-white max-w-lg w-[480px] rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">
          Reject Group Creation
        </h2>

        <div className="description mb-4">
          <label className="block text-lg font-medium text-gray-600 mb-1">
            Reason for rejection
          </label>
          <textarea
            className="w-full p-2 border rounded mb-4 resize-none"
            rows={4}
            value={rejectedReason}
            onChange={(e) => setRejectedReason(e.target.value)}
            placeholder="Enter rejection reason..."></textarea>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={hideModal}
            className="text-white bg-dark-grey px-6 py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleReject}
            className={`text-white px-6 py-2 rounded-lg ml-4 ${
              isRejectButtonDisabled
                ? "bg-red-300 cursor-default"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={isRejectButtonDisabled} // Disable button based on condition
          >
            Reject
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectGroupCreationModal;

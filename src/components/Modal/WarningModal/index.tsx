import Modal from "@/components/Modal";

type WarningUnfriendModalProps = {
  warningContent: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const WarningModal = ({
  warningContent,
  open,
  onClose,
  onConfirm,
}: WarningUnfriendModalProps) => {
  return (
    <Modal open={open} hideModal={onClose}>
      <div className="bg-white p-2 rounded-lg max-w-96 mx-auto ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Action
        </h2>
        <p className="text-gray-600 mb-6">{warningContent}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-4 rounded">
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;

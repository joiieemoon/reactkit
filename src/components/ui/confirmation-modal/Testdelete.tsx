import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
// import {
//   ConfirmationModal,
//   DeleteConfirmationModal,
// } from "@/components/ui/confirmation-modal";

export default function ModalTest() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="flex gap-4 p-10">
      {/* Normal Confirmation */}
      <button
        onClick={() => setOpenConfirm(true)}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white"
      >
        Open Confirmation
      </button>

      <ConfirmationModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Save Changes?"
        message="Are you sure you want to save these changes?"
        variant="confirm"
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={async () => {
          console.log("Confirmed");
          setOpenConfirm(false);
        }}
      />

      {/* Delete Confirmation */}
      <button
        onClick={() => setOpenDelete(true)}
        className="rounded-lg bg-red-500 px-4 py-2 text-white"
      >
        Open Delete
      </button>

      <DeleteConfirmationModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        // recordName="User Profile"
        // onDelete={async () => {
        //   console.log("Deleted");
        //   setOpenDelete(false);
        // }}
      />
    </div>
  );
}

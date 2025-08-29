"use client";

import { useState } from "react";
import Modal from "@/app/ui/modal";

export default function Modal_view() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl"
      >
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        primaryBtnText="Save"
        secondaryBtnText="Dismiss"
        onPrimaryClick={() => {
          alert("Saved!");
          setOpen(false);
        }}
        onSecondaryClick={() => setOpen(false)}
      >
        <h2 className="text-xl font-semibold mb-2">Custom Child Content</h2>
        <p className="text-gray-600">
          You can put anything here — forms, text, inputs, etc.
        </p>
      </Modal>
    </div>
  );
}

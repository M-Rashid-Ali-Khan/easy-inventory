// components/Modal.tsx
"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  primaryBtnText = "Confirm",
  secondaryBtnText = "Cancel",
  onPrimaryClick,
  onSecondaryClick,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking outside
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent outside click from closing
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* Child content */}
            <div className="mb-6">{children}</div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onSecondaryClick || onClose}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                {secondaryBtnText}
              </button>
              <button
                onClick={onPrimaryClick}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                {primaryBtnText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

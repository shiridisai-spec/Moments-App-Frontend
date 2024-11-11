import React from "react";

const ConfirmationDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Close the dialog when the overlay is clicked
    if (e.target === e.currentTarget) {
      onCancel(); // Trigger the onCancel function
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>

        {/* Message */}
        <p className="text-gray-600 mt-3 mb-6">{message}</p>

        {/* Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold transition-transform transform hover:scale-105 focus:outline-none"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold transition-transform transform hover:scale-105 focus:outline-none shadow-lg"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

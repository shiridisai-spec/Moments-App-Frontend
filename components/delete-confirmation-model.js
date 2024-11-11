const DeleteConfirmationModel = ({
  setDeleteConfirmationOpen,
  handleDeleteMoments,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg text-center space-y-4">
        <h2 className="text-xl font-semibold">
          Are you sure you want to delete selected moments?
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setDeleteConfirmationOpen(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteMoments}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModel;

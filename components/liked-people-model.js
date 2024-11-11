const LikedPeopleModel = ({ closeLikesModal, likedUsers }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeLikesModal}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        <button
          onClick={closeLikesModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h3 className="text-lg font-bold mb-4">Liked by</h3>
        <ul className="max-h-60 overflow-y-auto">
          {likedUsers.map((user, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {user}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default LikedPeopleModel;

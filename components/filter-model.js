const FilterModel = ({
  activeTab,
  setActiveTab,
  myTags,
  selectedTags,
  setSelectedTags,
  myCategories,
  selectedCategories,
  setSelectedCategories,
  privacyLevels,
  selectedPrivacy,
  setSelectedPrivacy,
  toggleModal,
  handleSaveFilters,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 h-3/4 shadow-lg flex flex-col text-black">
        {/* Modal Header and Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left-side navigation */}
          <div className="w-1/4 border-r p-6">
            <div
              className={`cursor-pointer py-2 px-4 text-lg font-semibold ${
                activeTab === "tags" ? "bg-blue-100 text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("tags")}
            >
              Tags
            </div>

            <div
              className={`cursor-pointer py-2 px-4 text-lg font-semibold ${
                activeTab === "categories" ? "bg-blue-100 text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("categories")}
            >
              Categories
            </div>

            <div
              className={`cursor-pointer py-2 px-4 text-lg font-semibold ${
                activeTab === "privacy" ? "bg-blue-100 text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("privacy")}
            >
              Privacy
            </div>
          </div>

          {/* Right-side content */}
          <div className="w-3/4 p-6 overflow-y-auto relative">
            {/* Clear All Filters button */}
            <div className="absolute top-4 right-6">
              <button
                onClick={() => {
                  setSelectedTags([]);
                  setSelectedCategories([]);
                  setSelectedPrivacy([]);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Clear All Filters
              </button>
            </div>

            {activeTab === "tags" &&
              myTags.map((tag) => (
                <label key={tag} className="block mb-3 flex items-center">
                  {/* Added flex and items-center for alignment */}
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={(e) => {
                      const { checked } = e.target;
                      setSelectedTags((prevTags) =>
                        checked
                          ? [...prevTags, tag]
                          : prevTags.filter((t) => t !== tag)
                      );
                    }}
                    className="mr-2" // Checkbox margin
                  />
                  {tag}
                </label>
              ))}

            {activeTab === "categories" &&
              myCategories.map((category) => (
                <label key={category} className="block mb-3 flex items-center">
                  {/* Added flex and items-center for alignment */}
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      const { checked } = e.target;
                      setSelectedCategories((prevCategories) =>
                        checked
                          ? [...prevCategories, category]
                          : prevCategories.filter((c) => c !== category)
                      );
                    }}
                    className="mr-2" // Checkbox margin
                  />
                  {category}
                </label>
              ))}

            {activeTab === "privacy" &&
              privacyLevels.map((privacy) => (
                <label key={privacy} className="block mb-3 flex items-center">
                  {/* Added flex and items-center for alignment */}
                  <input
                    type="checkbox"
                    checked={selectedPrivacy?.includes(privacy)}
                    onChange={(e) => {
                      const { checked } = e.target;
                      setSelectedPrivacy((prevPrivacy) =>
                        checked
                          ? [...prevPrivacy, privacy]
                          : prevPrivacy.filter((c) => c !== privacy)
                      );
                    }}
                    className="mr-2" // Checkbox margin
                  />
                  {privacy}
                </label>
              ))}
          </div>
        </div>
        {/* Modal Footer */}
        <div className="border-t p-4 flex justify-end space-x-4">
          <button
            onClick={toggleModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModel;

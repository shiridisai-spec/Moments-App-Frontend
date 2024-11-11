import { showToast } from "@/utils/toast";
import {
  MagnifyingGlassIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const SearchFilterAddDeleteComponent = ({
  myMoments,
  searchQuery,
  handleSearch,
  clearSearch,
  toggleModal,
  selectedMoments,
  setDeleteConfirmationOpen,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-grow max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search moments..."
          className="pl-10 pr-8 py-2 border rounded-lg w-64"
        />
        <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        {searchQuery && (
          <XMarkIcon
            onClick={clearSearch}
            className="absolute right-2 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
          />
        )}
      </div>
      <button
        onClick={toggleModal}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        Filter
      </button>
      {myMoments && (
        <Link href="/add-moment">
          <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
            + Add New Moment
          </button>
        </Link>
      )}

      {myMoments && (
        <button
          onClick={() => {
            if (selectedMoments.length > 0) {
              setDeleteConfirmationOpen(true);
            } else {
              showToast("Please select at least one moment to delete", "error");
            }
          }}
        >
          <TrashIcon className="h-7 w-7 text-red-600 hover:text-red-700 transition duration-300" />
        </button>
      )}
    </div>
  );
};

export default SearchFilterAddDeleteComponent;

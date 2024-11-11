"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MagnifyingGlassIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Header from "@/components/header";
import LikedPeopleModel from "@/components/liked-people-model";
import MomentCard from "@/components/MomentCard";
import {
  useDeleteMomentsMutation,
  useGetAllMomentsQuery,
} from "@/slices/apiSlice";
import Link from "next/link";
import { showToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import FilterModel from "@/components/filter-model";
import DeleteConfirmationModel from "@/components/delete-confirmation-model";
import SearchFilterAddDeleteComponent from "@/components/search-filter-add-delete-component";

const MyMomentsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: myMoments, isSuccess } = useGetAllMomentsQuery();

  const [deleteMoments, { isLoading, isSuccess2, isError, error }] =
    useDeleteMomentsMutation();

  const [likedUsers, setLikedUsers] = useState([]);
  const [selectedMoments, setSelectedMoments] = useState([]);

  const [myTags, setMyTags] = useState([]);
  const [myCategories, setMyCategories] = useState([]);
  const [privacyLevels, setPrivacyLevels] = useState(["Private", "Public"]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPrivacy, setSelectedPrivacy] = useState([]);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tags");

  const [filteredMoments, setFilteredMoments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectMoments = (momentId) => {
    setSelectedMoments((prevSelectedIds) => {
      if (prevSelectedIds.includes(momentId)) {
        return prevSelectedIds.filter((id) => id !== momentId);
      } else {
        return [...prevSelectedIds, momentId];
      }
    });
  };

  const openLikesModal = (users) => {
    setLikedUsers(users);
    setIsModalOpen(true);
  };

  const closeLikesModal = () => {
    setIsModalOpen(false);
    setLikedUsers([]);
  };

  const handleDeleteMoments = async () => {
    let payload = {
      moments: selectedMoments,
    };
    try {
      const deleteMomentsResponse = await deleteMoments(payload).unwrap();
      setDeleteConfirmationOpen(false);
      showToast("Success!", "success");
    } catch (error) {
      console.error("Failed to create moment: ", error);
      showToast(error.message || "Failed to create moment", "error");
    }
  };

  const toggleModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  useEffect(() => {
    if (isSuccess) {
      setFilteredMoments(myMoments?.allMoments);
    }
  }, [isSuccess, myMoments]);

  useEffect(() => {
    if (isSuccess && myMoments?.allMoments) {
      const tags = [
        ...new Set(myMoments?.allMoments?.flatMap((tags) => tags?.tags)),
      ];
      const categories = [
        ...new Set(
          myMoments?.allMoments?.flatMap((category) => category?.category)
        ),
      ];
      setMyTags(tags);
      setMyCategories(categories);
    }
  }, [isSuccess, myMoments]);

  const handleSaveFilters = () => {
    const filtered = myMoments?.allMoments?.filter((moment) => {
      const matchedTags = selectedTags.length
        ? selectedTags.some((tag) => moment.tags.includes(tag))
        : true;

      const matchedCategories = selectedCategories.length
        ? selectedCategories.includes(moment.category)
        : true;

      const matchedPrivacy = selectedPrivacy.length
        ? selectedPrivacy.includes(moment.ispublic ? "Public" : "Private")
        : true;

      return matchedTags && matchedCategories && matchedPrivacy;
    });
    setFilteredMoments(filtered || []);
    toggleModal();
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const searchedMoments = myMoments?.allMoments?.filter((moment) =>
      moment.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMoments(searchedMoments);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredMoments(myMoments?.allMoments);
  };

  console.log(
    "myMoments",
    myMoments,
    "selectedTags",
    selectedTags,
    "selectedCategories",
    selectedCategories,
    "filteredMoments",
    filteredMoments
  );
  console.log("myTags", myTags, "myCategories", myCategories);

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Chronicles of Joy</h1>

          <SearchFilterAddDeleteComponent
            myMoments
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
            toggleModal={toggleModal}
            selectedMoments={selectedMoments}
            setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMoments?.map((moment) => (
            <MomentCard
              key={moment.moment_id}
              publicMoments={false}
              selectedMoments={selectedMoments}
              handleSelectMoments={() => handleSelectMoments(moment.moment_id)}
              moment={moment}
              openLikesModal={openLikesModal}
              router={router}
              filteredMoments={filteredMoments}
            />
          ))}
        </div>
      </div>

      {isFilterModalOpen && (
        <FilterModel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          myTags={myTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          myCategories={myCategories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          privacyLevels={privacyLevels}
          selectedPrivacy={selectedPrivacy}
          setSelectedPrivacy={setSelectedPrivacy}
          toggleModal={toggleModal}
          handleSaveFilters={handleSaveFilters}
        />
      )}

      {isModalOpen && (
        <LikedPeopleModel
          closeLikesModal={closeLikesModal}
          likedUsers={likedUsers}
        />
      )}

      {deleteConfirmationOpen && (
        <DeleteConfirmationModel
          handleDeleteMoments={handleDeleteMoments}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
        />
      )}
    </>
  );
};

export default MyMomentsPage;

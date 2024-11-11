"use client";

import FilterModel from "@/components/filter-model";
import Header from "@/components/header";
import LikedPeopleModel from "@/components/liked-people-model";
import MomentCard from "@/components/MomentCard";
import SearchFilterAddDeleteComponent from "@/components/search-filter-add-delete-component";
import { useGetAllPublicMomentsQuery } from "@/slices/apiSlice";
import { setAllPublicMoments } from "@/store/publicMomentsSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MomentsPage = () => {
  const dispatch = useDispatch();
  const allPublicMoments = useSelector(
    (state) => state.publicMomentsSlice.publicMoments
  );

  const {
    data: publicMoments,
    isSuccess,
    refetch,
  } = useGetAllPublicMomentsQuery();

  const [likedUsers, setLikedUsers] = useState([]);

  const [activeTab, setActiveTab] = useState("tags");
  const [myTags, setMyTags] = useState([]);
  const [myCategories, setMyCategories] = useState([]);
  const [privacyLevels, setPrivacyLevels] = useState(["Private", "Public"]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPrivacy, setSelectedPrivacy] = useState([]);

  const [filteredMoments, setFilteredMoments] = useState([]);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const openLikesModal = (users) => {
    setLikedUsers(users);
    setIsModalOpen(true);
  };

  const closeLikesModal = () => {
    setIsModalOpen(false);
    setLikedUsers([]);
  };

  const handleSaveFilters = () => {
    const filtered = publicMoments?.allMoments?.filter((moment) => {
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

    const searchedMoments = publicMoments?.allMoments?.filter((moment) =>
      moment.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMoments(searchedMoments);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredMoments(publicMoments?.allMoments);
  };

  const toggleModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  useEffect(() => {
    if (isSuccess && publicMoments?.allMoments) {
      const tags = [
        ...new Set(publicMoments?.allMoments?.flatMap((tags) => tags?.tags)),
      ];
      const categories = [
        ...new Set(
          publicMoments?.allMoments?.flatMap((category) => category?.category)
        ),
      ];
      setMyTags(tags);
      setMyCategories(categories);
    }
  }, [isSuccess, publicMoments]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAllPublicMoments(publicMoments?.allMoments));
      setFilteredMoments(publicMoments?.allMoments);
    }
  }, [isSuccess]);

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Chronicles of Joy</h1>

          <SearchFilterAddDeleteComponent
            myMoments={false}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
            toggleModal={toggleModal}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMoments.map((moment) => (
            <MomentCard
              publicMoments={true}
              moment={moment}
              openLikesModal={openLikesModal}
              refetch={refetch}
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

      {/* Modal for displaying users who liked the moment */}
      {isModalOpen && (
        <LikedPeopleModel
          closeLikesModal={closeLikesModal}
          likedUsers={likedUsers}
        />
      )}
    </>
  );
};

export default MomentsPage;

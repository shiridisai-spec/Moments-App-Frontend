"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { useCreateMomentMutation } from "@/slices/apiSlice";
import { showToast } from "@/utils/toast";

const AddMomentsPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [createMoment, { isLoading, isSuccess, error }] =
    useCreateMomentMutation();

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Preview the image
      // Clear the photo error if a file is selected
      if (errors.photo) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          photo: undefined, // Clear photo error
        }));
      }
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null); // Clear the file input
    setPhotoPreview(null); // Clear the image preview
    document.getElementById("photo").value = ""; // Clear the filename in the input
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (errors[e.target.id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.id]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validate fields
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Category is required";
    if (tags.length === 0) newErrors.tags = "At least one tag is required";
    if (!photo) newErrors.photo = "Photo is required";

    // If no errors, handle form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    return newErrors;
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setErrors("");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("ispublic", isPublic ? "true" : "false");
      formData.append("tags", JSON.stringify(tags));
      formData.append("photo", photo);

      console.log("formData", formData);

      try {
        const addMomentResponse = await createMoment(formData).unwrap();
        showToast("Success!", "success");
        router.push("/my-moments");
      } catch (error) {
        console.error("Failed to create moment: ", error);
        showToast(error.message || "Failed to create moment", "error");
      }
    }
  };

  if (isLoading) {
    <h1
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading...
    </h1>;
  }

  console.log("tags", tags);

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 white">
          Add a New Moment
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div className="flex flex-col mb-4">
            <label className="white font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleInputChange(setTitle)}
              className="shadow-lg border rounded-lg py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="flex flex-col mb-4">
            <label className="white font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleInputChange(setDescription)}
              className="shadow-lg border rounded-lg py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Category Field */}
          <div className="flex flex-col mb-4">
            <label className="white font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={handleInputChange(setCategory)}
              className="shadow-lg border rounded-lg py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter category"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Public Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="mr-2 leading-tight"
            />
            <label htmlFor="isPublic" className="white font-bold">
              Public
            </label>
          </div>

          {/* Tags Field */}
          <div className="flex flex-col mb-4">
            <label className="white font-bold mb-2" htmlFor="tags">
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  if (errors.tags) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      tags: undefined, // Clear the tags error
                    }));
                  }
                }}
                className="shadow-lg border rounded-lg py-2 px-4 text-white leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition duration-300"
              >
                Add
              </button>
            </div>
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags}</p>
            )}
            <div className="mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-purple-200 text-purple-600 rounded-full px-3 py-1 text-sm font-semibold mr-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Photo Upload Field */}
          <div className="flex flex-col mb-4">
            <label className="white font-bold mb-2" htmlFor="photo">
              Photo
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="shadow-lg border rounded-lg py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
              {photo && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="ml-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition duration-300"
                  title="Remove image"
                >
                  &times;
                </button>
              )}
            </div>
            {photoPreview && (
              <div className="mt-4 cursor-pointer" onClick={handleImageClick}>
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="rounded-lg shadow-lg"
                  style={{
                    maxHeight: "100px",
                    maxWidth: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Modal for Image Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 relative">
            <img
              src={photoPreview}
              alt="Large Preview"
              className="max-w-md max-h-md"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition duration-300"
              title="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMomentsPage;

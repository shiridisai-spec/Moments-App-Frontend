"use client";

import {
  useFavUnfavMomentMutation,
  useLikeUnlikeMomentMutation,
} from "@/slices/apiSlice";
import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";

const MomentCard = ({
  moment,
  openLikesModal,
  handleSelectMoments,
  selectedMoments,
  publicMoments,
  router,
  filteredMoments,
}) => {
  const [isLiked, setIsLiked] = useState(""); // Initialize with moment's is_liked value

  const [favMoments, setFavMoments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

  const [likeUnlike, { isLoading, isSuccess, isError }] =
    useLikeUnlikeMomentMutation();

  const [favUnfavMoment, { isLoading2, isSuccess2, isError2 }] =
    useFavUnfavMomentMutation();

  const handleLikeUnlike = async () => {
    const payload = {
      moment_id: moment?.moment_id,
      is_liked: !isLiked,
    };

    try {
      await likeUnlike(payload).unwrap();
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const toggleFavorite = (momentId) => {
    console.log("Before update:", favMoments);
    setFavMoments((prevFavMoments) =>
      prevFavMoments.map((favMoment) => {
        if (favMoment.moment_id === momentId) {
          return { ...favMoment, is_favourite: !favMoment.is_favourite };
        }
        return favMoment;
      })
    );
    console.log("After update:", favMoments);
  };

  const handleFavUnfavMoments = async () => {
    favUnfavMoment({
      moments: favMoments,
    })
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.error("Error favoriting/unfavoriting moments:", error);
      });
  };

  useEffect(() => {
    setIsLiked(moment?.is_liked);
    setLikesCount(moment?.total_likes);
  }, [moment]);

  useEffect(() => {
    if (!publicMoments) {
      if (filteredMoments.length > 0) {
        const updatedFavMoments = filteredMoments.map((moment) => ({
          moment_id: moment?.moment_id,
          is_favourite: moment?.is_favourite,
        }));

        setFavMoments(updatedFavMoments);
      }
    }
  }, [filteredMoments]);

  console.log("favMoments", favMoments, "filteredMoments", filteredMoments);

  return (
    <div
      onClick={() => {
        if (!publicMoments) {
          router?.push(`/my-moments/${moment.moment_id}`);
        }
      }}
      key={moment.moment_id}
      className={`relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
        selectedMoments?.includes(moment.moment_id)
          ? "border-4 border-purple-500"
          : ""
      }`}
    >
      <Image
        src={moment.photo}
        alt={moment.title}
        width={500}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{moment.title}</h2>
        <p className="text-gray-600">{moment.description}</p>
        {moment.user_name && (
          <p className="text-gray-500 mt-2">By {moment.user_name}</p>
        )}
        <p className="text-gray-500 mt-1">
          <strong>Category:</strong> {moment.category}
        </p>
        <p className="text-gray-500 mt-1">
          <strong>Created At:</strong>{" "}
          {new Date(moment.created_at).toLocaleDateString()}
        </p>
        <div className="mt-2">
          {moment.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-teal-200 text-teal-800 text-xs px-2 py-1 rounded-full mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openLikesModal(moment.liked_by);
            }}
            className="text-gray-500 hover:text-blue-500 flex items-center space-x-1"
          >
            <span>{likesCount}</span>
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
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
          </button>

          {!publicMoments && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(moment?.moment_id);
                handleFavUnfavMoments(); // Send API request with the current state
              }}
              style={{
                paddingLeft: "20px",
              }}
            >
              {moment?.is_favourite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              )}
            </button>
          )}

          {publicMoments && (
            <button
              onClick={handleLikeUnlike} // Toggle like button click
              style={{
                paddingLeft: "20px",
              }}
            >
              {isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="blue"
                  class="size-6"
                >
                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>
              )}
              {/* <HeartIcon
              className={`w-6 h-6 ${
                isLiked ? "fill-current text-red-600" : "text-gray-400"
              }`}
            /> */}
            </button>
          )}

          {!publicMoments && (
            <button
              className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectMoments(moment.moment_id);
              }}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MomentCard;

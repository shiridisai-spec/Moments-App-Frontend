import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.API_URL || "http://localhost:3000/api/v1/moments";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state.authSlice.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["getAllPublicMoments", "getAllMoments"],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["getAllPublicMoments"],
    }),

    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["getAllPublicMoments"],
    }),

    requestResetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/request-reset-password",
        method: "POST",
        body: payload,
      }),
    }),

    confirmResetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/confirm-reset-password",
        method: "POST",
        body: payload,
      }),
    }),

    getAllPublicMoments: builder.query({
      query: () => "/usermoments/get-all-public-moments",
      providesTags: ["getAllPublicMoments"],
    }),

    likeUnlikeMoment: builder.mutation({
      query: (payload) => ({
        url: "/usermoments/like-unlike-moment",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllPublicMoments"],
    }),

    favUnfavMoment: builder.mutation({
      query: (payload) => ({
        url: "/usermoments/favourite-moments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllMoments"],
    }),

    getAllMoments: builder.query({
      query: () => "/usermoments/all-moments",
      providesTags: ["getAllMoments"],
    }),

    getSingleMoment: builder.query({
      query: (id) => `/usermoments/get-moment/${id}`,
      providesTags: ["getAllMoments"],
    }),

    createMoment: builder.mutation({
      query: (payload) => ({
        url: "/usermoments/create-moment",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllMoments"],
    }),

    editMoment: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/usermoments/update-moment/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["getAllMoments"],
    }),

    deleteMoments: builder.mutation({
      query: (payload) => ({
        url: "usermoments/delete-moment",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["getAllMoments"],
    }),

    getProfileInfo: builder.query({
      query: () => "/userprofile/get-profile-details",
    }),

    uploadProfilePicture: builder.mutation({
      query: (formData) => ({
        url: "/userprofile/upload-profile-picture",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRequestResetPasswordMutation,
  useConfirmResetPasswordMutation,
  useGetAllPublicMomentsQuery,
  useFavUnfavMomentMutation,
  useLikeUnlikeMomentMutation,
  useGetAllMomentsQuery,
  useGetSingleMomentQuery,
  useCreateMomentMutation,
  useEditMomentMutation,
  useDeleteMomentsMutation,
  useGetProfileInfoQuery,
  useUploadProfilePictureMutation,
} = apiSlice;

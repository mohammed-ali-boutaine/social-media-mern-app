import { apiSlice } from './apiSlice';

const POSTS_URL = '/api/posts';

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (formData) => ({
        url: POSTS_URL,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useCreatePostMutation } = postApiSlice;

import { Post } from "@/types/post.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NewsfeedState = {
  posts: Post[];
};

const initialState: NewsfeedState = {
  posts: [],
};

const newsfeedSlice = createSlice({
  name: "newsfeed",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const { addPost, removePost } = newsfeedSlice.actions;

export default newsfeedSlice;

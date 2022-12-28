import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const forumSlice = createSlice({
 name: 'forum',
 initialState: {
     posts: [],
 },
 reducers: {
     setPosts: (state,action) => {
         return {
             ...state,
             posts: action.payload
         }
     },
 }
});

export const { setPosts } = forumSlice.actions;
export default forumSlice.reducer;
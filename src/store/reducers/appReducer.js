import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const appSlice = createSlice({
 name: 'app',
 initialState: {
     loaded: false,
     chatFocused: false,
     confirmation: "",
 },
 reducers: {
     setLoaded: (state,action) => {
         return {
             ...state,
             loaded: action.payload
         }
     },
     setChatFocussed: (state,action) => {
        return {
            ...state,
            chatFocused: action.payload
        }
    },
    setConfirmation: (state, action) => {
        return {
            ...state,
            confirmation: action.payload
        }
    }
 }
});

export const { setLoaded, setChatFocussed, setConfirmation } = appSlice.actions;
export default appSlice.reducer;
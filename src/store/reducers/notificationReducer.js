import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const notificationSlice = createSlice({
 name: 'notification',
 initialState: {
     notifications: [],
     quantity: 0,
 },
 reducers: {
     setNotifications: (state,action) => {
         return {
             ...state,
             notifications: action.payload
         }
     },
     setQuantity: (state,action) => {
        return {
            ...state,
            quantity: action.payload
        }
    },
 }
});

export const { setNotifications, setQuantity } = notificationSlice.actions;
export default notificationSlice.reducer;
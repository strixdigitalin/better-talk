import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const bookSlice = createSlice({
 name: 'book',
 initialState: {
     doctorEnquired: "",
     freeUsed: false,
     docSelectedObj: ""
 },
 reducers: {
     setDoctorEnquired: (state,action) => {
        console.log('action: ', action);
         return {
             ...state,
             doctorEnquired: action.payload
         }
     },
     setFreeUsed: (state,action) => {
        return {
            ...state,
            freeUsed: action.payload
        }
    },
    setDocSelectedObj: (state,action) => {
        console.log('action.payload:setDocSelectedObj ', action.payload);
        return {
            ...state,
            docSelectedObj: action.payload
        }
    },
 }
});

export const { setDoctorEnquired, setFreeUsed,setDocSelectedObj } = bookSlice.actions;
export default bookSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';
import React from 'react';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    sessionEnd: '',
    chatOngoing: false,
    minsRem: 0,
    docSelected: '',
    appointmentId: "",
    mode: "chat",
  },
  reducers: {
    setSessionEnd: (state, action) => {
      return {
        ...state,
        sessionEnd: action.payload,
      };
    },
    setChatOngoing: (state, action) => {
      return {
        ...state,
        chatOngoing: action.payload,
      };
    },
    setMinsRem: (state, action) => {
      console.log('action: minsrem', action.payload);
      return {
        ...state,
        minsRem: action.payload,
      };
    },
    setDocSelected: (state, action) => {
      console.log('action: minsrem', action.payload);
      return {
        ...state,
        docSelected: action.payload,
      };
    },
    setAppointmentId: (state, action) => {
      console.log('action: setAppointmentId', action.payload);
      return {
        ...state,
        appointmentId: action.payload,
      };
    },
    setMode: (state, action) => {
      console.log('action: setAppointmentId', action.payload);
      return {
        ...state,
        mode: action.payload,
      };
    },
  },
});

export const {setSessionEnd, setChatOngoing,setMinsRem,setDocSelected,setAppointmentId,setMode} =
  chatSlice.actions;
export default chatSlice.reducer;

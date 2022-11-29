import {createSlice} from '@reduxjs/toolkit';
import React from 'react';
import { postPurchaseAsync } from '../services/payServices';

export const paySlice = createSlice({
  name: 'pay',
  initialState: {
    sessionType: "persession",
    balance: 0,
    availMin: 0,
    availSessions: 0,
  },
  reducers: {
    setSessionType: (state, action) => {
      return {
        ...state,
        sessionType: action.payload,
      };
    },
    setSessionAmt: (state, action) => {
      return {
        ...state,
        sessionAmt: action.payload,
      };
    },
    setBalance: (state, action) => {
      return {
        ...state,
        balance: action.payload,
      };
    },
    setAvailMin: (state, action) => {
      return {
        ...state,
        availMin: action.payload,
      };
    },
    setAvailSessions: (state, action) => {
      return {
        ...state,
        availSessions: action.payload,
      };
    },
  },
  extraReducers: {
    [postPurchaseAsync.fulfilled]: (state, action) => {
      console.log('action:payload ', action.payload);
    },
    [postPurchaseAsync.rejected]: (state, action) => {
      console.log('action.error.message: ', action.error.message);
    },
  }
});

export const {setSessionType, setSessionAmt, setBalance, setAvailMin, setAvailSessions} = paySlice.actions;
export default paySlice.reducer;

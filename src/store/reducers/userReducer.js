import {createSlice} from '@reduxjs/toolkit';
import React from 'react';
import {postUserAsync, getUserIdAsync} from '../services/services';

const tempData = {
  age: 21,
  freeSession: false,
  gender: '',
  isAvailable: false,
  location: 'Bangalore',
  medHistory: 'Issue\n',
  minutes: '0',
  name: 'Test 85',
  qualification: 'Professor',
  sessions: '0',
  upcomingApp: [],
  userId: '639960855e84e3449b3e224f',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'test2',
    qualification: '',
    age: '',
    gender: '',
    medHistory: '',
    freeSession: '',
    location: '',
    upcomingApp: [],
    isLoggedIn: false,
    userId: '639960855e84e3449b3e224f',
    session: 0,
    loading: true,
    image:
      'https://res.cloudinary.com/strix-digital/image/upload/v1671304736/gpdsnxigzopmf40ztdc1.png',
  },
  reducers: {
    setName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    setQualification: (state, action) => {
      return {
        ...state,
        qualification: action.payload,
      };
    },
    setAge: (state, action) => {
      return {
        ...state,
        age: action.payload,
      };
    },
    setGender: (state, action) => {
      return {
        ...state,
        gender: action.payload,
      };
    },
    setMedHistory: (state, action) => {
      return {
        ...state,
        medHistory: action.payload,
      };
    },
    setLocation: (state, action) => {
      return {
        ...state,
        location: action.payload,
      };
    },
    setSession: (state, action) => {
      return {
        ...state,
        session: action.payload,
      };
    },
    setFreeSession: (state, action) => {
      return {
        ...state,
        freeSession: action.payload,
      };
    },
    setUpcomingApp: (state, action) => {
      return {
        ...state,
        upcomingApp: action.payload,
      };
    },
    setiIsLoggedIn: (state, action) => {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    },
    setUserId: (state, action) => {
      console.log('setuserId', action.payload);
      return {
        ...state,
        userId: action.payload,
      };
    },
    setImage: (state, action) => {
      return {
        ...state,
        image: action.payload,
      };
    },
  },
  extraReducers: {
    [postUserAsync.fulfilled]: (state, action) => {
      console.log('postUserAsync action:payload ', action.payload);
    },
    [postUserAsync.rejected]: (state, action) => {
      console.log('action.error.message: ', action.error.message);
    },
    [postUserAsync.pending]: (state, action) => {},
    [getUserIdAsync.fulfilled]: (state, action) => {
      console.log('getUserIdAsync action:payload ', action.payload);
      state.loading = false;
    },
    [getUserIdAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      console.log(
        'getUserIdAsync action.error.message: ',
        action.error.message,
      );
    },
    [getUserIdAsync.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const {
  setName,
  setiIsLoggedIn,
  setQualification,
  setSession,
  setAge,
  setFreeSession,
  setGender,
  setMedHistory,
  setUpcomingApp,
  setLocation,
  setUserId,
  setImage,
} = userSlice.actions;
export default userSlice.reducer;

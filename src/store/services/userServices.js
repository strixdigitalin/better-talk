import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { setAge, setFreeSession, setGender, setLocation, setMedHistory, setQualification } from '../reducers/userReducer';
import { setAvailMin, setAvailSessions } from '../reducers/payReducer';

export const updateAgeAsync = createAsyncThunk(
    'users/updateSessionAsync',
    ({id, age, dispatch}) => {
      return axios
        .put(`https://rihal-be.herokuapp.com/api/users/age/${id}`, {
          age: age,
        })
        .then(function (response) {
          console.log('users/updateAgeAsync response', response);
          dispatch(setAge(age));
        })
        .catch(function (error) {
          console.log('users/updateAgeAsync error', error);
        });
    },
);


export const updateLocationAsync = createAsyncThunk(
    'users/updateLocationAsync',
    ({id, location, dispatch}) => {
      return axios
        .put(`https://rihal-be.herokuapp.com/api/users/location/${id}`, {
          location: location,
        })
        .then(function (response) {
          console.log('users/updateLocationAsync response', response);
          dispatch(setLocation(location));
        })
        .catch(function (error) {
          console.log('users/updateLocationAsync error', error);
        });
    },
);


export const updateGenderAsync = createAsyncThunk(
    'users/updateGenderAsync',
    ({id, gender, dispatch}) => {
        console.log('gender: updateGenderAsync', gender);
      return axios
        .put(`https://rihal-be.herokuapp.com/api/users/gender/${id}`, {
          gender: gender,
        })
        .then(function (response) {
        console.log('users/updateGenderAsync response', response);
          dispatch(setGender(gender));
        })
        .catch(function (error) {
          console.log('users/updateGenderAsync error', error);
        });
    },
);



export const updateQualificationAsync = createAsyncThunk(
    'users/updateQualificationAsync',
    ({id, qualification, dispatch}) => {
      return axios
        .put(`https://rihal-be.herokuapp.com/api/users/qualification/${id}`, {
            qualification: qualification,
        })
        .then(function (response) {
          console.log('users/updateQualificationAsync response', response);
          dispatch(setQualification(qualification));
        })
        .catch(function (error) {
          console.log('users/updateQualificationAsync error', error);
        });
    },
);



export const updateMedHistoryAsync = createAsyncThunk(
    'users/updateMedHistoryAsync',
    ({id, medHistory, dispatch}) => {
      return axios
        .put(`https://rihal-be.herokuapp.com/api/users/medhistory/${id}`, {
            medHistory: medHistory,
        })
        .then(function (response) {
          console.log('users/updateMedHistoryAsync response', response);
          dispatch(setMedHistory(medHistory));
        })
        .catch(function (error) {
          console.log('users/updateMedHistoryAsync error', error);
        });
    },
);

export const updateFreeSessionAsync = createAsyncThunk(
    'users/updateFreeSessionAsync',
    ({id, freeSession, dispatch}) => {
      return axios
        .put(`https://rihal-be.herokuapp.com/api/users/free/${id}`, {
            freeSession: freeSession,
        })
        .then(function (response) {
          console.log('users/updateFreeSessionAsync response', response);
          dispatch(setFreeSession(freeSession));
        })
        .catch(function (error) {
          console.log('users/updateFreeSessionAsync error', error);
        });
    },
);

export const updateSessionsAsync = createAsyncThunk(
  'users/updateSessionsAsync',
  ({id, sessions}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/users/sessions/${id}`, {
          sessions: sessions,
      })
      .then(function (response) {
        console.log('users/updateSessionsAsync response', response);

      })
      .catch(function (error) {
        console.log('users/updateSessionsAsync error', error);
      });
  },
);


export const updateMinsAsync = createAsyncThunk(
  'users/updateMinsAsync',
  ({id, minutes}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/users/minutes/${id}`, {
          minutes: minutes,
      })
      .then(function (response) {
        console.log('users/updateMinsAsync response', response);
        dispatch(setAvailMin(minutes));
      })
      .catch(function (error) {
        console.log('users/updateMinsAsync error', error);
      });
  },
);
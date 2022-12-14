import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {setNotifications, setQuantity} from '../reducers/notificationReducer';
import {STRIX_URL} from './services';

export const getNotificationsAsync = createAsyncThunk(
  'notifications/getNotificationsAsync',
  ({id, dispatch}) => {
    return axios
      .get(STRIX_URL + `/api/notifications/${id}`)
      .then(function (response) {
        console.log(' getNotificationsAsync response: data', response.data);
        dispatch(setNotifications(response.data));
        dispatch(setQuantity(response.data.length));
      })
      .catch(function (error) {
        console.log('getNotificationsAsync error: ', error);
      });
  },
);

export const postNotificationAsync = createAsyncThunk(
  'forums/postNotificationsAsync',
  ({to, content, type, date}) => {
    return axios
      .post(STRIX_URL + '/api/notifications', {
        content: content,
        to: to,
        type: type,
        date: date,
      })
      .then(function (response) {
        console.log('response: postNotificationsAsync', response);
      })
      .catch(function (error) {
        console.log('error: postNotificationsAsync', error);
      });
  },
);

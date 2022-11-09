import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {setNotifications, setQuantity} from '../reducers/notificationReducer';

export const getNotificationsAsync = createAsyncThunk(
  'notifications/getNotificationsAsync',
  ({id, dispatch}) => {
    return axios
      .get(`https://rihal-be.herokuapp.com/api/notifications/${id}`)
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
      .post('https://rihal-be.herokuapp.com/api/notifications', {
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

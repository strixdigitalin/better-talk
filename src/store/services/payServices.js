import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {useSelector} from 'react-redux';

export const postPurchaseAsync = createAsyncThunk(
    'users/postPurchaseAsync',
    ({name, appType, type}) => {
        console.log('name:postPurchaseAsync ', name);
        console.log('apptype:postPurchaseAsync ', appType);
        console.log('type:postPurchaseAsync ', type);
      return axios({
        method: 'post',
        url: 'https://rihal-be.herokuapp.com/api/purchases',
        data: {
          by: "62ad2a574607a57cf3545501",
          username: name,
          time: "2022-06-18T16:00:00Z",
          appointmentType: appType,
          packType: type
        },
      })
        .then(function (response) {
          console.log('response: postPurchaseAsync', response);
        })
        .catch(function (error) {
          console.log('postPurchaseAsync error: ', error);
        });
    },
  );
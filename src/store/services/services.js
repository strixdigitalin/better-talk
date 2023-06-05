import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {setDoctors, setLoading} from '../reducers/docReducer';

// http://ec2-43-204-216-211.ap-south-1.compute.amazonaws.com:5000/

// export const STRIX_URL = 'https://better-talk-strix-backend.herokuapp.com';
// export const STRIX_URL = 'https://better-backend.onrender.com';
export const STRIX_URL = 'https://backend-update-production.up.railway.app';
// export const STRIX_URL = 'http://192.168.168.136:5000';
// export const STRIX_URL =
//   'http://ec2-43-204-216-211.ap-south-1.compute.amazonaws.com:5000';
import {
  setUserId,
  setName,
  setAge,
  setGender,
  setFreeSession,
  setLocation,
  setMedHistory,
  setQualification,
  setUpcomingApp,
  setImage,
  setSession,
  setMobileNumber,
} from '../reducers/userReducer';
import {setAppointmentId} from '../reducers/chatReducer';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAvailMin, setAvailSessions} from '../reducers/payReducer';

// const d = 'https://rihal-be.herokuapp.com/api';

const saveId = async (id, name) => {
  try {
    await AsyncStorage.setItem('userId', id);
    await AsyncStorage.setItem('name', name);
    console.log('id:saveId', id);
  } catch (err) {
    console.log('saveId err', err);
  }
};

export const getUserIdAsync = createAsyncThunk(
  'doctors/getDoctorIdAsync',
  ({dispatch}) => {
    return AsyncStorage.getItem('userId')
      .then(function (response) {
        // console.log(' getDoctorsAsync response: ', response);
        console.log(' getUserIdAsync response: data', response);
        dispatch(setUserId(response));
      })
      .catch(function (error) {
        console.log('getUserIdAsync error: ', error);
      });
  },
);

export const getUserByIdAsync = createAsyncThunk(
  'users/getUserByIdAsync',
  ({id, dispatch}) => {
    console.log('\n\n\n id of the user--->>>> \n\n', id, '\n\n\n');
    return axios
      .get(STRIX_URL + `/api/users/${id}`)
      .then(function (response) {
        console.log(' getUserByIdAsync response: ', response.data);
        // console.log(' getUserByIdAsync response: data', response.data.age);
        dispatch(setAge(response.data.age));
        // console.log(' getUserByIdAsync response: data', response.data.gender);
        dispatch(setGender(response.data.gender));
        // console.log(' getUserByIdAsync response: data', response.data.freeSession);
        dispatch(setFreeSession(response.data.freeSession));
        // console.log(' getUserByIdAsync response: data', response.data.medHistory);
        dispatch(setMedHistory(response.data.medHistory));
        //console.log(' getUserByIdAsync response: data', response.data.name);
        dispatch(setImage(response.data.profile));
        dispatch(setSession(response.data.sessions));
        dispatch(setName(response.data.name));
        dispatch(setMobileNumber(response.data.mobile));
        // console.log(' getUserByIdAsync response: data', response.data.upcomingApp);
        dispatch(setUpcomingApp(response.data.upcomingApp));
        //console.log(' getUserByIdAsync response: data', response.data.location);
        dispatch(setLocation(response.data.location));
        // console.log(' getUserByIdAsync response: data', response.data.qualification);
        dispatch(setQualification(response.data.qualification));
        console.log(' getUserByIdAsync response: data', response.data.sessions);
        dispatch(setAvailSessions(response.data.sessions));
        console.log(' getUserByIdAsync response: data', response.data.minutes);
        dispatch(setAvailMin(response.data.minutes));
      })
      .catch(function (error) {
        console.log('getUserByIdAsync error: ', error);
      });
  },
);

export const getUsernameAsync = createAsyncThunk(
  'doctors/getDoctorIdAsync',
  ({dispatch}) => {
    return AsyncStorage.getItem('name')
      .then(function (response) {
        // console.log(' getDoctorsAsync response: ', response);
        console.log(' getUsernameAsync response: data', response);
        dispatch(setName(response));
      })
      .catch(function (error) {
        console.log('getUserIdAsync error: ', error);
      });
  },
);

export const postUserAsync = createAsyncThunk(
  'users/postUserAsync',
  ({
    name,
    qualification,
    location,
    age,
    gender,
    medHistory,
    mobile,
    freeSession,
    upcomingApp,
    dispatch,
    sessions,
    minutes,
  }) => {
    console.log('callingpostuserasync------>', {
      name,
      qualification,
      location,
      age,
      gender,
      mobile,
      medHistory,
      freeSession,
      upcomingApp,
      dispatch,
      sessions,
      minutes,
    });
    // return null;
    return (
      axios
        // .post('https://rihal-be.herokuapp.com/api/users', {
        .post(STRIX_URL + '/api/users', {
          name: name,
          qualification: qualification,
          age: age,
          gender: gender,
          location: location,
          medHistory: medHistory,
          mobile,
          freeSession: freeSession,
          upcomingApp: upcomingApp,
          sessions: sessions,
          minutes: minutes,
        })
        .then(function (response) {
          console.log('response: message', response.data.message);
          console.log('response: ', response.data);
          console.log('response: id', response.data.data._id);

          // return null;
          saveId(response.data.data._id, response.data.data.name);
          dispatch(setUserId(response.data.data._id));
          // console.log("datasavedinasyncand")
        })
        .catch(function (error) {
          console.log('error: ', error);
        })
    );
  },
);

export const getDoctorsAsync = createAsyncThunk(
  'doctors/getDoctorsAsync',
  ({dispatch}) => {
    console.log(STRIX_URL + '/api/doctors', '<-----get doctor url');

    return (
      axios
        // .get('https://rihal-be.herokuapp.com/api/doctors')
        .get(STRIX_URL + '/api/doctors')
        .then(function (response) {
          // console.log(' getDoctorsAsync response: ', response);
          console.log('getDoctorsAsync response: data', response.data);
          dispatch(setDoctors(response.data));
          dispatch(setLoading(false));
        })
        .catch(function (error) {
          console.log('getDoctorsAsync error: ', error);
        })
    );
  },
);

export const getAppointmentAsync = createAsyncThunk(
  'doctors/getDoctorsAsync',
  () => {
    const id = useSelector(state => state.doc.appointmentId);
    return axios({
      method: 'get',
      // url: `https://rihal-be.herokuapp.com/api/appointments/accept/${id}`,
      url: STRIX_URL + `/api/appointments/accept/${id}`,
    })
      .then(function (response) {
        console.log('response: message', response.data.acceptStatus);
        return response.data;
      })
      .catch(function (error) {
        console.log('error: ', error);
      });
  },
);

//needs id
export const startAppointmentAsync = createAsyncThunk(
  'doctors/getDoctorsAsync',
  () => {
    const id = useSelector(state => state.doc.appointmentId);
    return axios({
      method: 'put',
      url: STRIX_URL + `/api/appointments/${id}`,
    })
      .then(function (response) {
        console.log('response: message', response.data.message);
        console.log('response: ', response.data);
        console.log('response: id', response.data.data._id);
        return response.data.data;
      })
      .catch(function (error) {
        console.log('error: ', error);
      });
  },
);

export const PostAppointment = async (
  {
    from,
    to,
    fromName,
    acceptStatus,
    startStatus,
    time,
    appointmentType,
    dispatch,
  },
  callBack,
) => {
  var axios = require('axios');
  var data = JSON.stringify({
    from,
    to,
    time,
    acceptStatus: false,
    startStatus: false,
    fromName: fromName,
    appointmentType: 'permins',
  });

  var config = {
    method: 'post',
    url: STRIX_URL + '/api/appointments',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log('appointmentresult', response.data);
      callBack(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const postAppointmentAsync = createAsyncThunk(
  'users/postAppointmentAsync',
  ({
    from,
    to,
    fromName,
    acceptStatus,
    startStatus,
    time,
    appointmentType,
    dispatch,
  }) => {
    console.log(
      'creating appointment',
      from,
      to,
      fromName,
      acceptStatus,
      startStatus,
      time,
      appointmentType,
      dispatch,
    );
    // return null;

    // .post('https://rihal-be.herokuapp.com/api/appointments', {
  },
);

export const postRatingAsync = createAsyncThunk(
  'users/postAppointmentAsync',
  ({id, from, rating, date}) => {
    return axios
      .put(STRIX_URL + `/api/doctors/ratings/${id}`, {
        from: from,
        rating: rating,
        date: date,
      })
      .then(function (response) {
        console.log('response: postRatingAsync ', response);
      })
      .catch(function (error) {
        console.log('error:postRatingAsync ', error);
      });
  },
);

export const appointMentStarted = (
  {id, acceptStatus, startStatus},
  callBack,
) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    acceptStatus: acceptStatus,
    startStatus: startStatus,
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(STRIX_URL + '/api/appointments/update/' + id, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result, '<<< this is appoint ment end result');
      callBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const getUpdateText = async callBack => {
  const {data} = await axios.get(STRIX_URL + '/api/settings');
  callBack(data);
};

export const cancleAppointment = async (id, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    acceptStatus: false,
    startStatus: false,
    isDeleted: false,
    isCanceled: true,
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(STRIX_URL + '/api/appointments/update/' + id, requestOptions)
    .then(response => response.text())
    .then(result => callBack(JSON.parse(result)))
    .catch(error => console.log('error', error));
};

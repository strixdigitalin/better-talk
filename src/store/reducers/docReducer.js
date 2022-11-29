import {createSlice} from '@reduxjs/toolkit';
import {postAppointmentAsync} from '../services/services';
import {getDoctorsAsync} from '../services/services';
import {getAppointmentAsync} from '../services/services';
import {startAppointmentAsync} from '../services/services';

export const doctorsSlice = createSlice({
  name: 'doc',
  initialState: {
    doctors: [],
    loading: true,
    error: false,
    appointmentId: '',
    acceptStatus: false,
    startStatus: false,
  },
  reducers: {
    setDoctors: (state, action) => {
      console.log('action: setDoctors', action.payload);
      return {
        ...state,
        doctors: action.payload,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      }
    },
  },
  extraReducers: {
    [getDoctorsAsync.fulfilled]: (state, action) => {
      console.log('getDoctorsAsync action:payload fulfilled', action.payload);
    },
    [getDoctorsAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      console.log(
        'action.error.message:getDoctorsAsync ',
        action.error.message,
      );
    },
    [getDoctorsAsync.pending]: (state, action) => {
      console.log('pending: getDoctorsAsync', pending);
    },
    [postAppointmentAsync.fulfilled]: (state, action) => {
      console.log('action:payload._id ', action.payload._id);
      state.appointmentId = action.payload._id;
      console.log('state.appointmentId: ', state.appointmentId);
      state.loading = false;
    },
    [postAppointmentAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      console.log(' postAppointmentAsync state.error : ', state.error);
      state.loading = false;
    },
    [postAppointmentAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [getAppointmentAsync.fulfilled]: (state, action) => {
      console.log('action:payload accept ', action.payload.acceptStatus);
      state.acceptStatus = true;
      console.log('state.appointmentId: ', state.appointmentId);
      state.loading = false;
    },
    [getAppointmentAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [getAppointmentAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [startAppointmentAsync.fulfilled]: (state, action) => {
      console.log('action:payloadaccept  start ', action.payload.acceptStatus);
      console.log('action:payloadstart start ', action.payload.acceptStatus);
      state.startStatus = true;
      console.log('state.appointmentId: ', state.appointmentId);
      state.loading = false;
    },
    [startAppointmentAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [startAppointmentAsync.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const {setDoctors, setLoading} = doctorsSlice.actions;
export default doctorsSlice.reducer;

import {STRIX_URL} from '../services';

export const updateImage = (userid, file, CallBack) => {
  console.log('\n\ncalling api to get image update\n\n', file, userid);
  var formdata = new FormData();
  formdata.append('Image', file, file.name);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(STRIX_URL + '/api/users/profile/' + userid, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log('<<<< PAI update image \n\n ', result, '  \n\n');
      CallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const sendOTPAPI = (num, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    mobile: num,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(STRIX_URL + '/api/verify/sendotp', requestOptions)
    .then(response => response.text())
    .then(result => callBack(JSON.parse(result)))
    .catch(error => console.log('error', error));
};

export const VerifyOTPAPI = (payload, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    mobile: payload.mobile,
    code: payload.code,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(STRIX_URL + '/api/verify/otp', requestOptions)
    .then(response => response.text())
    .then(result => callBack(JSON.parse(result)))
    .catch(error => console.log('error', error));
};

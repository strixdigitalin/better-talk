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
      console.log('<<<< PAI update image \n\n\n\n');
      CallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

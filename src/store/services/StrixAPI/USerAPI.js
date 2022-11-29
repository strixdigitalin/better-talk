export const updateImage = (userid, file, CallBack) => {
  console.log('\n\ncalling api to get image update\n\n', file);
  var formdata = new FormData();
  formdata.append('Image', file);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(
    'https://better-talk-strix-backend.herokuapp.com/api/users/profile/' +
      userid,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log(result, '<<<< PAI update image \n\n\n\n');
      CallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

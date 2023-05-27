import React from 'react';
import {WebView} from 'react-native';
function EasePay({route}) {
  let data = route.params.data;
  console.log(data, '<<<<thisisurldat');
  // console.log(route)
  return (
    <div>
      <WebView
        source={{
          uri: 'https://pay.easebuzz.in/pay/' + data,
        }}
        style={{marginTop: 20}}
      />
    </div>
  );
}

export default EasePay;

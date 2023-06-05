import React, {useEffect} from 'react';
import {WebView} from 'react-native-webview';

import {Linking} from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

function EaseBuzz({route}) {
  useEffect(() => {
    console.log(route.params.data, '<<<<propsroute');
    // Linking.openURL('https://pay.easebuzz.in/pay/' + route.params.data);
  }, []);

  return (
    // <View>
    <>
      <WebView
        source={{
          uri: 'https://github.com/facebook/react-native',
        }}
        style={{marginTop: 20, height: 30}}
      />
    </>
    // </View>
  );
}

export default EaseBuzz;

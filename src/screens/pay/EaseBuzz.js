import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';

import {Linking} from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

function EaseBuzz({route}) {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    console.log(route.params.data, '<<<<propsroute');
    // Linking.openURL('https://pay.easebuzz.in/pay/' + route.params.data);
  }, []);
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       Alert.alert(
  //         'Alert',
  //         'Transaction session will be ended \n
  //        Please Ignore if payment successfull',
  //         [
  //           {
  //             text: 'Go Back',
  //             onPress: () => navigation.goBack(),
  //             style: 'cancel',
  //           },
  //           {
  //             text: 'Stay here',
  //             onPress: () => {},
  //             style: 'cancel',
  //           },
  //         ],
  //         {
  //           cancelable: true,
  //           onDismiss: () =>
  //             Alert.alert(
  //               'This alert was dismissed by tapping outside of the alert dialog.',
  //             ),
  //         },
  //       );
  //       return true;
  //     },
  //   );
  //   return () => backHandler.remove();
  // }, []);

  if (loader)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
        <Text style={{color: 'white'}}>wait</Text>
      </View>
    );

  return (
    // <View>
    <>
      <WebView
        source={{
          uri: 'https://pay.easebuzz.in/pay/' + route.params.data,
        }}
        style={{marginTop: 20, height: 30}}
      />
    </>
    // </View>
  );
}
let styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.4,
    zIndex: 99,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EaseBuzz;

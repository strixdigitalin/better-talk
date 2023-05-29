import React, {useEffect} from 'react';
// import {WebView} from 'react-native-webview';
import {Button, Linking} from 'react-native';
import EasebuzzCheckout from 'react-native-easebuzz-kit';
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
    Linking.openURL('https://pay.easebuzz.in/pay/' + route.params.data);
  }, []);
  const callPaymentGateway  = () => {
    var options = {
      access_key: "Access key",
      pay_mode: "This can be “test” or “production"
    }
   
    EasebuzzCheckout.open(options).then((data) => {
      //handle the payment success & failed response here
      console.log("Payment Response:") 
      console.log(data);
    }).catch((error) => {
      //handle sdk failure issue here
      console.log("SDK Error:")
      console.log(error);
    });
   }
   
  return (
    <View>
      {/* <WebView
        source={{
          uri: 'https://github.com/facebook/react-native',
        }}
        style={{marginTop: 20, height: 30}}
      /> */}
      <Button
       onPress={callPaymentGateway}>
        <Text>Payment </Text>
      </Button>
    </View>
  );
}

export default EaseBuzz;

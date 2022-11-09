import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import confirmslot from '../../assets/confirmslot.png';
import { Button } from 'react-native-paper';
const windowHeight = Dimensions.get('window').height;

export default function SlotConfirmedScreen({route, navigation}) {
  const {timestamp, slot} = route.params;
  console.log('slot: ', slot);
  console.log('timestamp: ', timestamp);
  const monthNames = [ "January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December" ];
  return (
    <View style={styles.rootContainer}>
      <Image source={confirmslot} />
      <Text>Your slot has been confirmed on {timestamp.getDay()}, {monthNames[timestamp.getMonth()]} at {slot} successfully.</Text>
      <Button
          mode="contained"
          uppercase={false}
          loading={false}
          onPress={() => navigation.navigate('DoctorsList')}
          style={styles.btnOnboard}>
          <Text style={styles.btnText}>Go To HomeScreen</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
  },
  btnOnboard: {
    position: "absolute",
    bottom: 100,
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    width: "100%",
  },
});

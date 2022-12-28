import React from 'react';
import { StyleSheet, View, Text, Image,Dimensions } from 'react-native';
import appointmentfail from '../../assets/appointmentfail.png';
import { Button } from 'react-native-paper';


const windowHeight = Dimensions.get('window').height;

const AppointmentFailScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <Image source={appointmentfail} style={styles.appointmentImage} />
            <Text style={styles.arrived}>Oops! The doctor has failed to join the appointment for some reason. Please try again.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        height: windowHeight,
        backgroundColor: '#FDFDFD',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 55,
      },
      appointmentImage: {
  
      },
      btnOnboard: {
        backgroundColor: '#323F4D',
        height: 46,
        borderRadius: 8,
        paddingVertical: 5,
        width: '80%',
        marginTop: 20,
      },
      arrived: {
          fontFamily: "Inter-Regular",
          fontSize: 14,
          lineHeight: 24,
          color: "#85919D",
          textAlign: "center"
      },
});

export default AppointmentFailScreen;

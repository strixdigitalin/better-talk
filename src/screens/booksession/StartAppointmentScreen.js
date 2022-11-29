import React, {useState} from 'react';
import io from 'socket.io-client';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import startappointment from '../../assets/startappointment.png';
import {Button} from 'react-native-paper';
import { useSelector } from 'react-redux';

const windowHeight = Dimensions.get('window').height;

const StartAppointmentScreen = ({navigation}) => {

  const userId = useSelector(state=>state.user.userId);
  const appointmentId = useSelector(state=>state.chat.appointmentId);
  const socket = io('https://socketrahilbe.herokuapp.com/', {
    query: {userId: userId, appointmentId:appointmentId },
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  function startAppointmentHandler() {
    navigation.navigate('ChatDoctor');
    socket.emit('start', {
      status: true,
      from: 456,
      to: 123,
      id: 123,
    });
  }

  return (
    <View style={styles.rootContainer}>
      <Image source={startappointment} style={styles.appointmentImage} />
      <Text style={styles.arrived}>Your doctor has arrived. Please start the session.</Text>
      <Button
        mode="contained"
        uppercase={false}
        onPress={() => {startAppointmentHandler();}}
        style={styles.btnOnboard}>
        <Text style={styles.btnText}>Start Appointment</Text>
      </Button>
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
    },
});

export default StartAppointmentScreen;

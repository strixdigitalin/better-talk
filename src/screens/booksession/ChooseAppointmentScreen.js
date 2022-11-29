import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Alert} from 'react-native';
import instantappointment from '../../assets/instantappointment.png';
import advancebooking from '../../assets/advancebooking.png';
import {Button} from 'react-native-paper';
import {postAppointmentAsync} from '../../store/services/services';
import {postNotificationAsync} from '../../store/services/notificationservices';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ChooseAppointmentScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const availSessions = useSelector(state => state.pay.availSessions);
  const {disableBookLater} = route.params;
  const docSelected = useSelector(state => state.chat.docSelected);
  const userId = useSelector(state => state.user.userId);
  console.log('userId: ', userId);
  const name = useSelector(state => state.user.name);
  const now = moment();
  console.log('docSelected: ', docSelected);

  useEffect(() => {
    if (availSessions === 0) {
      Alert.alert(
        'Zero Sessions',
        'You have zero sessions available. Please Recharge',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Recharge',
            onPress: () => {
              navigation.navigate('Packs', {screen: 'Pay'});
            },
          },
        ],
      );
    }
  }, []);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.appointmentType}>
        <Image source={instantappointment} style={styles.appointmentImage} />
        <Text style={styles.heading}>Instant Appointment</Text>
        <Text style={styles.subheading}>
          Start up an instant session with the doctor
        </Text>
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => {
            dispatch(
              postAppointmentAsync({
                from: userId,
                to: docSelected,
                fromName: name,
                time: now,
                acceptStatus: false,
                startStatus: false,
                appointmentType: 'instant',
                dispatch: dispatch,
              }),
            );
            dispatch(
              postNotificationAsync({
                to: userId,
                content: now,
                type: 'appointment',
              }),
            );
            navigation.navigate('AppointmentWaiting');
          }}
          style={styles.btnOnboard}
          disabled={availSessions === 0}>
          <Text style={styles.btnText}>Book an instant appointment</Text>
        </Button>
      </View>
      <View style={styles.appointmentType}>
        <Image source={advancebooking} style={styles.appointmentImage} />
        <Text style={styles.heading}>Advance Booking</Text>
        <Text style={styles.subheading}>
          Book a session with the doctor in advance
        </Text>
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => {
            navigation.navigate('ConfirmSlot');
          }}
          style={styles.btnOnboard}
          disabled={disableBookLater}>
          <Text style={styles.btnText}>Book an advance appointment</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#33475B',
    marginTop: 10,
  },
  subheading: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#5C6C7C',
    marginTop: 5,
  },
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  btnOnboard: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    width: '90%',
    marginTop: 20,
  },
  appointmentType: {
    height: 277,
    width: '100%',
    backgroundColor: '#FDFDFD',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E9F0',
    marginTop: 10,
    marginBottom: 10,
  },
  appointmentImage: {
    width: 100,
    height: 100,
    marginTop: 4,
  },
});

export default ChooseAppointmentScreen;

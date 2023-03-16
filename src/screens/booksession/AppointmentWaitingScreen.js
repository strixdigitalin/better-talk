import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import moment from 'moment';
import io from 'socket.io-client';
import {useCountdown} from '../../hooks/useCountdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  cancleAppointment,
  getAppointmentAsync,
} from '../../store/services/services';
import {useTimer, useStopwatch} from 'react-timer-hook';
import notifee from '@notifee/react-native';

const windowHeight = Dimensions.get('window').height;
const date1 = moment().add(5, 'minutes');
export const socketbase = 'https://hungry-skate-production.up.railway.app';
const AppointmentWaitingScreen = ({navigation, route}) => {
  const userId = useSelector(state => state.user.userId);
  // const appointmentId = useSelector(state => state.chat.appointmentId);
  console.log(route.params, '<<< this is parameter route');
  const appointmentId = route.params.data._id;
  // const [days, hours, minutes, seconds] = useCountdown(date1);
  const [reqAccepted, setReqAccepted] = useState(false);
  const dispatch = useDispatch();
  const expiryTimestamp = moment().add(5, 'minutes');

  const socket = io(socketbase, {
    query: {userId: userId, appointmentId: appointmentId},
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  async function onDisplayNotification(reqAccepted) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: userId,
      name: 'Default Channel',
    });

    // Display a notification
    if (reqAccepted) {
      await notifee.cancelDisplayedNotification(userId);
      await notifee.displayNotification({
        id: userId,
        title: 'Request Accepted',
        body: 'Click to resume session.',
        android: {
          channelId,
          pressAction: {
            id: userId,
            launchActivity: 'default',
          },
          actions: [
            {
              title: 'Open',
              pressAction: {
                id: userId,
                launchActivity: 'default',
              },
            },
          ],
        },
      });
    } else {
      await notifee.displayNotification({
        id: userId,
        title: 'Request Pending',
        body: 'Waiting for the doctor to join the chat.',
        android: {
          channelId,
          pressAction: {
            id: userId,
          },
          showChronometer: true,
          chronometerDirection: 'down',
          timestamp: Date.now() + 300000, // 5 minutes
        },
      });
    }
  }

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.on('disconnect', () => {});
    socket.on('connect_error', e => {});
    onDisplayNotification(false);
  }, []);

  useEffect(() => {
    console.log('socket');
    socket.on('accept', ({message, from, to, fromDoc}) => {
      console.log('accept appointment');
      setReqAccepted(true);
    });
  }, [socket]);
  useEffect(() => {
    socket.on('disconnect', ({message, from, to, fromDoc}) => {
      console.log('disconnect');
      // setReqAccepted(true);
    });
  }, [socket]);

  useEffect(() => {
    if (reqAccepted) {
      onDisplayNotification(true);
      navigation.navigate('StartAppointment', {appointmentId: appointmentId});
    }
  }, [reqAccepted]);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      restart;
    },
  });

  useEffect(() => {
    start;
    console.log('timer in appointment start');
  }, []);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.timerContainer}>
        <Text style={styles.totalTime}>
          {minutes}:{String(seconds).padStart(2, '0')}
        </Text>
        <Text style={styles.totalText}>
          Is the waiting time for the {'\n'} doctor to join the chat
        </Text>
      </View>
      <Button
        mode="contained"
        uppercase={false}
        onPress={() => {
          cancleAppointment(appointmentId, res => {
            console.log('cancel appoitment', res, '<<<<cancel appointment');
            if (res.success) {
              Alert.alert('Appointment Canceled');
              navigation.goBack();
            }
          });
        }}
        style={styles.btnOnboard}>
        <Text style={styles.btnText}>Cancel Appointment</Text>
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
  timerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 10,
    borderColor: '#CDE1F6',
  },
  totalTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 32,
    lineHeight: 48,
    color: '#33475B',
  },
  totalText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#85919D',
  },
  btnOnboard: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    width: '80%',
    marginTop: 20,
  },
});

export default AppointmentWaitingScreen;

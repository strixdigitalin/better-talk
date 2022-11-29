import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Modal, Portal, Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {useTimer, useStopwatch} from 'react-timer-hook';
import lowbal from '../../assets/lowbal.png';
import { setSessionEnd } from '../../store/reducers/chatReducer';
import moment from 'moment';

export default function BalanceLowModal(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const {expiryTimestamp, offsetTimestamp, navigation} = props;
  const sessionType = useSelector(state => state.pay.sessionType);
  const balance = useSelector(state => state.pay.balance);
  const availMin = useSelector(state => state.pay.availMin);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: '#FDFDFD',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 324,
    height: 403,
    marginLeft: '5%',
    justifyContent: 'space-evenly',
    borderRadius: 16,
  };

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
      if (sessionType === 'persession') {
        setVisible(true);
        const temp = availMin + 5;
        const now = moment().add(temp, 'minutes');
        dispatch(setSessionEnd(now));
      }
    },
  });

  useEffect(() => {
    if (sessionType === 'persession') {
      start;
      console.log('timer start');
    }
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <>
      {balance < 3 ? (
        <>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Image source={lowbal} style={styles.imgModal} />
            <Text style={styles.titleModal}>
              You are running low on balance!
            </Text>
            <Text style={styles.subtitleModal}>
              Please recharge or buy a session to continue with the appointment.
            </Text>
            <Button
              mode="contained"
              uppercase={false}
              onPress={() => {
                navigation.navigate('Packs', {screen: 'Pay'});
              }}
              style={styles.btnModal}>
              <Text style={styles.btnModalText}>Recharge</Text>
            </Button>
            <TouchableOpacity style={styles.cancelModal} onPress={hideModal}>
              <Text style={styles.cancelModalText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Image source={lowbal} style={styles.imgModal} />
            <Text style={styles.titleModal}>
              You are running low on balance!
            </Text>
            <Text style={styles.subtitleModal}>
              Do you want to use your available balance Rs. {balance} from your
              account?
            </Text>
            <Button
              mode="contained"
              uppercase={false}
              onPress={() => {
                setVisible(false);
              }}
              style={styles.btnModal}>
              <Text style={styles.btnModalText}>Use Balance</Text>
            </Button>
            <TouchableOpacity style={styles.cancelModal}  onPress={hideModal}>
              <Text style={styles.cancelModalText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Modal>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleModal: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
    color: '#33475B',
  },
  subtitleModal: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    color: '#85919D',
  },
  btnModal: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    width: '90%',
    marginTop: 15,
  },
  btnModalText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  cancelModalText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
    color: '#056AD0',
  },
  cancelModal: {
    textAlign: 'center',
    marginTop: 5,
  },
  imgModal: {
    width: 100,
    height: 100,
  },
});

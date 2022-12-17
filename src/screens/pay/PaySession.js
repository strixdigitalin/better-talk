import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSessionType,
  setBalance,
  setAvailMin,
  setAvailSessions,
} from '../../store/reducers/payReducer';
import PaySessionCarousel from '../../components/PaySessionCarousel';
import tick from '../../assets/tick.png';
import star from '../../assets/star.png';
import Modal from 'react-native-modal';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import {postPurchaseAsync} from '../../store/services/payServices';
import {postNotificationAsync} from '../../store/services/notificationservices';
// import {UserJoined} from 'agora-rn-uikit/src/Reducer';
import {updateSessionsAsync} from '../../store/services/userServices';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function PaySession({navigation}) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [active, setActive] = useState(1);
  const balance = useSelector(state => state.pay.balance);
  const availMin = useSelector(state => state.pay.availMin);
  const chatOngoing = useSelector(state => state.chat.chatOngoing);
  const availSessions = useSelector(state => state.pay.availSessions);
  const name = useSelector(state => state.user.name);
  const userId = useSelector(state => state.user.userId);

  const data = [
    {
      title: 'Prime Pack',
      sessions: 1,
      mins: 60,
      price: 1200,
    },
    {
      title: 'Trio Pack',
      sessions: 3,
      mins: 180,
      price: 3600,
    },
    {
      title: 'Quinary Pack',
      sessions: 5,
      mins: 300,
      price: 6000,
    },
  ];

  const availSessionUpdater = () => {
    dispatch(setSessionType('persession'));
    let temp;
    temp = parseInt(availSessions) + parseInt(sessions);
    console.log('sessions: ', sessions);
    console.log('availSessions: ', availSessions);
    console.log('temp: availSessions', temp);
    dispatch(setAvailSessions(temp));
    dispatch(updateSessionsAsync({id: userId, sessions: temp}));
    dispatch(
      postPurchaseAsync({name: name, appType: 'persession', type: amount}),
    );
  };

  return (
    <View style={styles.rootContainer}>
      <Divider style={{marginTop: 10}} />
      <View style={styles.availBal}>
        <View
          style={{
            width: '60%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View>
            <Text style={styles.availText}>Available Sessions</Text>
          </View>
          <View style={styles.verticalDivider} />
        </View>
        <View style={styles.verticalDivider} />
        <View style={{width: '40%'}}>
          <Text
            style={{
              ...styles.boldText,
              // ...styles.availText,
              // flexDirection: 'row',
              // justifyContent: 'center',
              // textAlign: 'center',
              // color: '#000',
            }}>
            {availSessions}
          </Text>
        </View>
        {/* <Text
          style={{
            ...styles.boldText,
            // ...styles.availText,
            // flexDirection: 'row',
            // justifyContent: 'center',
            // textAlign: 'center',
            // color: '#000',
          }}>
          {availSessions}
        </Text> */}
      </View>
      <Divider />
      <View style={styles.scrollContainer}>
        <PaySessionCarousel
          navigation={navigation}
          setModalVisible={setModalVisible}
          setOrderId={setOrderId}
          setAmount={setAmount}
          setSessions={setSessions}
          setActive={setActive}
        />
        <ScrollView style={{height: 400}}>
          <View style={styles.boxRoot}>
            <View style={[styles.boxDetails]}>
              <Image source={star} style={styles.img} />
              <View style={styles.textDetails}>
                <Text style={styles.textNumber}>4.4</Text>
                <Text style={styles.textType}>Rating</Text>
              </View>
            </View>
            <View style={[styles.boxDetails, styles.flexRow]}>
              <Image source={tick} style={styles.img} />
              <View style={styles.textDetails}>
                <Text style={styles.textNumber}>3000+</Text>
                <Text style={styles.textType}>Purchases</Text>
              </View>
            </View>
          </View>
          <Text style={styles.subheading}>How it works</Text>
          <Text style={styles.detailsPack}>
            Prime pack gives a user &nbsp;{data[active].sessions}&nbsp;sessions/
            {data[active].mins}&nbsp; mins of session/appointment time with
            their preferred doctor.
          </Text>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={modalVisible}
          onBackdropPress={() => {
            setModalVisible(!modalVisible);
          }}
          onBackButtonPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.modalStyle}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>Order Summary</Text>
              <View style={styles.modalDetails}>
                <Text style={styles.item}>Prime Pack * 1</Text>
                <Text style={styles.amt}>{amount}</Text>
              </View>
              <View style={styles.modalDetails}>
                <Text style={styles.item}>GST 18%</Text>
                <Text style={styles.amt}>{(amount / 100) * 18}</Text>
              </View>
              <View style={styles.modalDetails}>
                <Text style={styles.item}>TOTAL</Text>
                <Text style={styles.amt}>{amount + (amount / 100) * 18}</Text>
              </View>
              <Button
                mode="contained"
                uppercase={false}
                loading={false}
                onPress={() => {
                  var options = {
                    description: 'Credits towards consultation',
                    currency: 'INR',
                    key: 'rzp_test_QKNnJJd7t0TF4N',
                    amount: (amount + (amount / 100) * 18) * 100,
                    name: 'Better Talk',
                    order_id: orderId,
                    prefill: {
                      email: 'test.test@test.com',
                      contact: '9191919191',
                      name: 'Test Test',
                    },
                    theme: {color: '#056AD0'},
                  };
                  setModalVisible(false);
                  RazorpayCheckout.open(options)
                    .then(data => {
                      // handle success
                      //alert(`Success: ${data.razorpay_payment_id}`);
                      availSessionUpdater();
                      dispatch(
                        postNotificationAsync({
                          id: userId,
                          content: amount,
                          type: 'payment',
                        }),
                      );
                      if (chatOngoing) {
                        navigation.navigate('MyHome', {screen: 'ChatDoctor'});
                      } else {
                        navigation.navigate('MyHome', {screen: 'DoctorsList'});
                      }
                    })
                    .catch(error => {
                      // handle failure
                      alert(`Error: ${error.code} | ${error.description}`);
                    });
                }}
                style={styles.btnPay}>
                <Text style={styles.btnText}>Proceed To Pay</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
  },
  scrollContainer: {
    paddingHorizontal: 25,
    position: 'relative',
  },
  availBal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2,
    // paddingHorizontal: 15,
    height: 48,
  },
  availText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
  },
  verticalDivider: {
    height: '100%',
    // width: '100%',
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E9F0',
    // borderLeftColor: '#000',
    // marginHorizontal: 25,
    // textAlign: 'center',
    // margin: 'auto',
  },
  boldText: {
    fontFamily: 'Inter-Medium',
    fontSize: 25,
    // width: '40%',
    lineHeight: 26,
    textAlign: 'center',
    // borderWidth: 1,

    color: '#056AD0',
    // margin: 'auto',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  lightText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#85919D',
  },
  subheading: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 24,
    marginTop: 10,
    color: '#33475B',
  },
  boxRoot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  boxDetails: {
    backgroundColor: '#F9FDFF',
    width: 154,
    height: 86,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0,
  },
  textNumber: {
    color: '#056AD0',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  textType: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#5C6C7C',
  },
  img: {},
  detailsPack: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 28,
    color: '#5C6C7C',
  },
  modalStyle: {
    // position: 'absolute',
    bottom: -18,
    // left: -18,
    // justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: windowWidth,
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    height: 400,
  },
  modalHeader: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
  },
  modalDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnPay: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    left: 20,
    width: 320,
    position: 'absolute',
    bottom: 20,
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

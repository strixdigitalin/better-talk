import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import {Divider, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSessionType,
  setBalance,
  setAvailMin,
} from '../../store/reducers/payReducer';
import wallet from '../../assets/wallet.png';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import {create} from 'react-test-renderer';
import {setMinsRem} from '../../store/reducers/chatReducer';
import {postPurchaseAsync} from '../../store/services/payServices';
import {postNotificationAsync} from '../../store/services/notificationservices';
import {STRIX_URL} from '../../store/services/services';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function PayPerMin({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [amtToPay, setAmtToPay] = useState(0);
  const [amountPayed, setAmountPayed] = useState(0);
  const [packSelected, setPackSelected] = useState(0);
  const balance = useSelector(state => state.pay.balance);
  const availMin = useSelector(state => state.pay.availMin);
  const chatOngoing = useSelector(state => state.chat.chatOngoing);
  const minsRem = useSelector(state => state.chat.minsRem);
  const name = useSelector(state => state.user.name);
  const mobile = useSelector(state => state.user.mobile);
  const userId = useSelector(state => state.user.userId);
  console.log('name: ', name);
  console.log('minsRem: in paypermin ', minsRem);
  const dispatch = useDispatch();
  const appType = 'permins';

  function payMinBalUpdater() {
    console.log(' payMinBalUpdater balance: ', balance);
    console.log('amtToPay: ', amtToPay);
    let temp = balance + packSelected;
    console.log(' dispatch(setBalance temp: ', temp);
    dispatch(setBalance(temp));
    dispatch(
      postPurchaseAsync({name: name, appType: appType, type: packSelected}),
    );
  }

  function availMinUpdater() {
    console.log('availMin: ', availMin);
    console.log('minsRem: ', minsRem);
    let temp = minsRem + amountPayed / 2000;
    dispatch(setAvailMin(temp));
    dispatch(setMinsRem(temp));
  }

  async function createOrder(amt) {
    dispatch(setSessionType('permins'));
    try {
      const result = await axios.post(STRIX_URL + '/api/razorpay/createOrder', {
        amount: amt + (amt / 100) * 18,
      });
      console.log(result.data, '<<<<this is payment order');
      const {amount, id, currency} = result.data;
      setOrderId(id);
      setAmountPayed(amount);
      setAmtToPay(amt / 100);
      setPackSelected(amt / 100);
      setModalVisible(true);
    } catch (err) {
      alert(err);
    }
  }

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
          <Image source={wallet} style={styles.image} />
          <View>
            <Text style={styles.availText}>Available Balance</Text>
            <Text style={styles.lightText}>Cost - {'\u20B9'}20/min</Text>
          </View>
        </View>
        <View style={{...styles.verticalDivider}} />
        <View style={{width: '40%', alignItems: 'center'}}>
          <Text style={styles.boldText}>
            {'\u20B9'}
            {balance}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={styles.payCards}>
        <View style={styles.flexRow}>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(10000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 100</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(20000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 200</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(30000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 300</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(50000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 500</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(80000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 800</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(100000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 1000</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(150000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 1500</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(200000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 2000</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(250000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 2500</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(300000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 3000</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(400000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 4000</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payItem}
            onPress={() => {
              createOrder(500000);
            }}>
            <Text style={styles.boldText}>{'\u20B9'} 5000</Text>
            <Text style={styles.lightText}>10% Extra</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.tip}>
        Tip - Buy more to get <Text style={styles.boldText}>Extra Minutes</Text>
      </Text>
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
              <Text style={styles.amt}>{amtToPay}</Text>
            </View>
            {/* <View style={styles.modalDetails}>
              <Text style={styles.item}>GST 18%</Text>
              <Text style={styles.amt}>{(amtToPay / 100) * 18}</Text>
            </View> */}
            <View style={styles.modalDetails}>
              <Text style={styles.item}>TOTAL</Text>
              <Text style={styles.amt}>{amtToPay}</Text>
            </View>
            <Button
              mode="contained"
              uppercase={false}
              loading={false}
              onPress={() => {
                var options = {
                  description: 'Credits towards consultation',
                  currency: 'INR',
                  // key: 'rzp_test_QKNnJJd7t0TF4N',
                  key: 'rzp_live_gdgVvyvbg35IvZ',
                  // key: 'c3QXdMz8PREfSQCNCP6laNk5',
                  // amount: amountPayed,
                  amount: 1,
                  name: 'Better Talk',
                  order_id: orderId,
                  prefill: {
                    // email: 'test.test@test.com',
                    contact: mobile,
                    name: name,
                  },
                  theme: {color: '#056AD0'},
                };
                setModalVisible(false);
                RazorpayCheckout.open(options)
                  .then(data => {
                    // handle success
                    // alert(`Success: ${data.razorpay_payment_id}`);
                    payMinBalUpdater();
                    availMinUpdater();
                    dispatch(
                      postNotificationAsync({
                        id: userId,
                        content: amountPayed,
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
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    position: 'relative',
  },
  image: {
    width: 35.3,
    height: 34.5,
  },
  availBal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 78,
  },
  availText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
  },
  verticalDivider: {
    height: '100%',
    width: 1,
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E9F0',
    // marginHorizontal: 25,
  },
  boldText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 26,
    color: '#056AD0',
  },
  lightText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#85919D',
  },
  payCards: {
    paddingHorizontal: 20,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  payItem: {
    backgroundColor: '#F9FDFF',
    borderColor: '#E5E9F0',
    width: 93,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tip: {
    textAlign: 'center',
    marginTop: 10,
  },
  modalStyle: {
    position: 'absolute',
    bottom: -18,
    left: -18,
    justifyContent: 'flex-end',
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

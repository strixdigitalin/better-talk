import React, {useState, useEffect} from 'react';
import notificationimage from '../../assets/notificationimage.jpg';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {getNotificationsAsync} from '../../store/services/notificationservices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function NotificationsScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.notification.notifications);
  const userId = useSelector(state => state.user.userId);
  console.log('data: ', data);
  useEffect(() => {
    dispatch(getNotificationsAsync({id: userId, dispatch: dispatch}));
  }, []);
  const renderItem = ({item}) => (
    <View>
      <View style={styles.box}>
        <View style={styles.box1}>
          <View style={[styles.iconCont, {backgroundColor: item.type === "lowbalance" ? "#FFC3C3" : "#BEEDE7"}]}>
            {item.type === 'appointment' ? (
              <MaterialCommunityIcons
                name="medical-bag"
                size={21}
                color="#00BDA5"
                onPress={() => {}}
              />
            ) : null}
            {item.type === 'payment' ? (
              <Ionicon
                name="checkmark"
                size={21}
                color="#056AD0"
                onPress={() => {}}
              />
            ) : null}
            {item.type === 'comment' ? (
              <Ionicon
                name="chatbox-ellipses-sharp"
                size={21}
                color="#00BDA5"
                onPress={() => {}}
              />
            ) : null}
            {item.type === 'like' ? (
              <AntDesign
                name="like1"
                size={21}
                color="#00BDA5"
                onPress={() => {}}
              />
            ) : null}
            {item.type === 'lowbalance' ? (
              <Ionicon
                name="warning"
                size={21}
                color="#ED0000"
                onPress={() => {}}
              />
            ) : null}
            {item.type === 'giftfriend' ? (
              <MaterialCommunityIcons
                name="gift"
                size={21}
                color="#00BDA5"
                onPress={() => {}}
              />
            ) : null}
          </View>
          <Text style={styles.description}>
            {item.type === 'appointment' ? (
              <Text>You have a new upcoming appointment at &nbsp;{item.content}.&nbsp;</Text>
            ) : null}
            {item.type === 'payment' ? (
              <Text>
                A successful payment of Rs. &nbsp;{item.content}&nbsp; has been
                made.
              </Text>
            ) : null}
            {item.type === 'comment' ? (
              <Text>&nbsp;{item.content}&nbsp; has commented on your post</Text>
            ) : null}
            {item.type === 'like' ? (
              <Text>&nbsp;{item.content}&nbsp; has liked your post</Text>
            ) : null}
            {item.type === 'lowbalance' ? (
              <Text>&nbsp;Your account is running low on balance.</Text>
            ) : null}
            {item.type === 'giftfriend' ? (
              <Text>&nbsp;Gift a session to a loved on during this valentine's day.</Text>
            ) : null}
          </Text>
        </View>
        <Text>1h</Text>
      </View>
      <Divider />
    </View>
  );
  return (
    <View style={styles.rootCont}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  rootCont: {
    backgroundColor: '#FDFDFD',
    height: windowHeight,
    position: 'relative',
  },
  iconCont: {
   width: 56,
   height: 56,
   borderRadius: 28,
   padding: 17
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
    order: 0,
    flexGrow: 0,
  },
  box: {
    marginHorizontal: 24,
    marginVertical: 16,
    width: 327,
    height: 64,
    flexDirection: 'row',
  },
  description: {
    width: 191,
    height: 50,
    fontFamily: 'Inter Regular',
    fontSize: 14,
    lineHeight: 28,
    marginLeft: 12,
    marginRight: 68,
    marginVertical: 3,
    color: '#33475B',
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    gap: 12,
    width: 259,
    height: 56,
    marginBottom: 8,
    marginRight: 53,
  },
});

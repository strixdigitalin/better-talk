import React, {useState, useEffect, useRef} from 'react';
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
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';
import {Header} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
const windowHeight = Dimensions.get('window').height;
const chatHeight = Dimensions.get('window').height;

const ChatBox = ({msgsToRender, typing, whoTyping, Link}) => {
  const userId = useSelector(state => state.user.userId);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (scrollViewRef) {
      console.log('scrollViewRef: ', scrollViewRef);
      scrollViewRef?.current?.scrollToEnd({x: 0, y: 0, animated: true});
    }
  }, [msgsToRender]);

  // <View style={{bottom: 70}}>
  return (
    <View style={{position: 'absolute', bottom: 70}}>
      {msgsToRender.length !== 0 &&
        msgsToRender.map(item => {
          return (
            <ScrollView
              contentContainerStyle={styles.chatContainer}
              ref={scrollViewRef}>
              <View
                style={
                  item.from === userId
                    ? styles.msgContainerUser
                    : styles.msgContainer
                }>
                {item.from === userId ? null : (
                  <Image source={avatar1} style={styles.imgAvatar} />
                )}
                <View
                  style={
                    item.from === userId
                      ? styles.contentContainerUser
                      : styles.contentContainer
                  }>
                  <Text
                    style={
                      item.from === userId ? styles.msgTextUser : styles.msgText
                    }>
                    {item.message}
                  </Text>
                </View>
                {item.from === userId ? (
                  <Image source={avatar1} style={styles.imgAvatarUser} />
                ) : null}
              </View>

              {/* {typing && whoTyping !== userId ? (
              <View style={styles.typingCont}>
                <Text style={styles.isTyping}>Dr. Murphy is Typing</Text>
                <LottieView
                  source={require('../assets/typing.json')}
                  autoPlay
                  style={styles.lottieTyping}
                />
              </View>
            ) : null} */}
            </ScrollView>
          );
        })}
      {Link != '' && (
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            // position:"f",
            // bottom: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              height: '100%',
              height: 40,
              // paddingVertical: 25,
              width: '100%',
              fontSize: 18,
              backgroundColor: Link != '' ? '#96ffae' : '#e2e2e2',
              // borderWidth: 2,
              // position: 'absolute',
              // top: 20,
            }}
            onPress={() => {
              if (Link != '') {
                // Alert.alert('clicked');
                // joinMeet(Link);
                Linking.openURL(Link);
              }
            }}>
            Join on a call with doctor now
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    // marginBottom: 40,
    height: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    position: 'relative',
    //backgroundColor: "blue",
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F5F8FA',
    height: 48,
    alignItems: 'center',
    width: '95%',
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#E5E9F0',
  },
  msgContainer: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  contentContainer: {
    backgroundColor: '#056AD0',
    borderWidth: 1,
    borderColor: '#F5F8FA',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: 250,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  msgText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  msgContainerUser: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  contentContainerUser: {
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#DFE3EB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: 250,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  msgTextUser: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
  },
  typingCont: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  lottieTyping: {
    width: 30,
    height: 30,
  },
  isTyping: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#b0b9c0',
  },
  input: {
    backgroundColor: '#F5F8FA',
    width: '75%',
    marginLeft: 5,
  },
  imgAvatar: {
    marginRight: 5,
  },
  imgAvatarUser: {
    marginLeft: 5,
  },
});

export default ChatBox;

import React, {useState, useEffect, useRef, useCallback} from 'react';
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
import ChatBox from '../../components/ChatBox';
import {Header} from '@react-navigation/stack';
import {useImmer} from 'use-immer';
import useSocket from '../../hooks/useSocket';
import {Modal, Portal, Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {setSessionEnd, setChatOngoing} from '../../store/reducers/chatReducer';
import BalanceLowModal from './BalanceLowModal';
import useChat from '../../hooks/useChatRoom';
import VoiceCallScreen from './VoiceCallScreen';
import VideoCallScreen from './VideoCallScreen';
import {
  setAvailMin,
  setAvailSessions,
  setBalance,
} from '../../store/reducers/payReducer';
import {
  updateSessionsAsync,
  updateMinsAsync,
} from '../../store/services/userServices';
const windowHeight = Dimensions.get('window').height - 60;
const windowWidth = Dimensions.get('window').width;

const ChatScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [pvtMsg, setPvtMsg] = useState(null);
  const {messages, typing, whoTyping, sendMessage, sendTyping, Link} =
    useChat();
  const mode = useSelector(state => state.chat.mode);
  const sessionType = useSelector(state => state.pay.sessionType);
  const userId = useSelector(state => state.user.userId);
  const availSessions = useSelector(state => state.pay.availSessions);
  const now = moment();
  const sessionEnd = moment().add(60, 'minutes');
  const sessionLow = moment().add(55, 'minutes');

  useEffect(() => {
    dispatch(setSessionEnd(sessionEnd));
    dispatch(setChatOngoing(true));
    return () => {
      dispatch(
        updateSessionsAsync({
          sessions: availSessions === 0 ? 0 : availSessions - 1,
          id: userId,
        }),
      );
      dispatch(setAvailSessions(availSessions === 0 ? 0 : availSessions - 1));
    };
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => navigation.getParent()?.setOptions({tabBarStyle: undefined});
  }, [navigation]);

  const sendMsgHandler = () => {
    if (pvtMsg !== '') {
      sendMessage(pvtMsg);
      setPvtMsg('');
    }
    sendTyping(false);
  };

  const changeTxtHandler = text => {
    setPvtMsg(text);
    let temp = text.length > 0 ? true : false;
    sendTyping(temp);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior="height"
        style={styles.rootContainer}
        keyboardVerticalOffset={Header.HEIGHT}>
        {mode === 'chat' ? (
          <ScrollView>
            <View style={styles.msgs}>
              {/* <ScrollView> */}

              <ChatBox
                msgsToRender={messages}
                Link={Link}
                typing={typing}
                whoTyping={whoTyping}
              />
              {/* </ScrollView> */}

              <View style={styles.inputContainer}>
                <TouchableOpacity>
                  <Feather name="smile" size={20} color="#7C98B6" />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  color="#7C98B6"
                  placeholder="Write a message...2"
                  value={pvtMsg}
                  onChangeText={text => {
                    changeTxtHandler(text);
                  }}
                />
                <TouchableOpacity>
                  <Ionicon name="attach" size={20} color="#7C98B6" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    sendMsgHandler();
                    setPvtMsg('');
                  }}>
                  <Ionicon
                    name="send"
                    size={20}
                    color="#7C98B6"
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : mode === 'audio' ? (
          <VoiceCallScreen />
        ) : (
          <VideoCallScreen />
        )}
        <BalanceLowModal
          expiryTimestamp={sessionLow}
          offsetTimestamp={sessionEnd}
          sessionType={sessionType}
          navigation={navigation}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    //backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    positon: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    position: 'relative',
    //marginTop: 10,
  },
  msgs: {
    position: 'relative',
    //bottom: 20,
    height: windowHeight,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    paddingBottom: 20,
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
    position: 'absolute',
    bottom: 20,
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
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  btnModal: {
    marginTop: 210,
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
  },
  btnModalText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  cancelModalText: {},
  cancelModal: {},
});

export default ChatScreen;

import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import requestCameraAndAudioPermission from '../../components/RequestCameraAudioPermission';
import RtcEngine from 'react-native-agora';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function VoiceCallScreen() {
  const userId = useSelector(state => state.user.userId);
  const uid = 123456;
  // 4a0f852637d545ac9db1c2dac82b0e67
  const appId = '3cb214e173be4d919267a4d4f2074f32';
  const [micOn, setMicOn] = useState(true);
  const [onHold, setOnHold] = useState(false);
  const channelName = useSelector(state => state.chat.appointmentId);
  const tokenUrl = 'https://reactfeagora.herokuapp.com';
  const expiryTimestamp = moment().add(60, 'minutes');
  const [token, setToken] = useState('');
  const [joinSucceed, setJoinSucceed] = useState(false);
  const engine = useRef(null);

  useEffect(() => {
    fetchToken(uid, channelName, 1);
    requestCameraAndAudioPermission().then(() => {
      initEngine().then(() => {});
    });
  }, []);

  const initEngine = async () => {
    engine.current = await RtcEngine.create(appId);
    engine.current.enableAudio();
    engine.current.disableVideo();
    engine.current.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
    });

    engine.current.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
    });

    engine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        setJoinSucceed(true);
      },
    );
  };

  async function fetchToken(uid, channelName, tokenRole) {
    fetch(`${tokenUrl}/rtc/${channelName}/publisher/uid/${uid}`)
      .then(function (response) {
        response.json().then((data) => {
          setToken(data.rtcToken);
          console.log('data.rtcToken: ', data.rtcToken);
        });

      })
      .catch(function (error) {
        console.log('fetchToken', error);
      });
  }

  const startCall = async () => {
    console.log('engine: at start ', engine);
    console.log('token', token);
    await engine.current
      .joinChannel(token, channelName, null, uid)
      .then(res => {
        console.log('res: start', res);
      })
      .catch(e => {
        console.log('e:message ', e.message);
        console.log('error start call: ', e);
      });
  };

  const endCall = async () => {
    console.log('engine: leave ', engine);
    await engine.current
      .leaveChannel()
      .then(res => {
        console.log('res: end ', res);
        setJoinSucceed(false);
      })
      .catch(e => {
        console.log('error end call: ', e);
      });
  };

  return (
    <View style={styles.rootContainer}>
      <LottieView
        source={require('../../assets/talkingmic.json')}
        autoPlay
        style={styles.lottieBG}
      />
      <View style={styles.iconCont}>
        {joinSucceed ? (
          <TouchableOpacity onPress={endCall} style={styles.callIcon}>
            <MaterialIcons name="call-end" size={40} color={'#D2042D'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startCall} style={styles.callIcon}>
            <MaterialIcons name="call" size={40} color={'#056AD0'} />
          </TouchableOpacity>
        )}
        {micOn ? (
          <TouchableOpacity onPress={() => {}} style={styles.callIcon}>
            <Ionicons name="mic-off-outline" size={40} color={'#056AD0'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => {}} style={styles.callIcon}>
            <Ionicons name="mic-outline" size={40} color={'#056AD0'} />
          </TouchableOpacity>
        )}
        {onHold ? (
          <TouchableOpacity onPress={() => {}} style={styles.callIcon}>
            <Ionicons name="call-outline" size={40} color={'#056AD0'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => {}} style={styles.callIcon}>
            <Ionicons name="pause-circle-outline" size={40} color={'#056AD0'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#FFFFFF',
    height: windowHeight,
    paddingHorizontal: 15,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCont: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  callIcon: {
    marginTop: 50,
  },
  lottieBG: {
    width: 137,
    height: 137,
  },
});

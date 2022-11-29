import React, {useState, useEffect} from 'react';
// import AgoraUIKit from 'agora-rn-uikit';
import {Text, Dimensions, View} from 'react-native';
import RateSessionScreen from './RateSessionScreen';
import {setMode} from '../../store/reducers/chatReducer';
import {useDispatch} from 'react-redux';

const windowHeight = Dimensions.get('window').height;

export default function VideoCallScreen({navigation}) {
  const [videoCall, setVideoCall] = useState(true);
  const dispatch = useDispatch();
  //4a0f852637d545ac9db1c2dac82b0e67
  const connectionData = {
    appId: '3cb214e173be4d919267a4d4f2074f32',
    channel: 'test',
    tokenUrl: 'https://reactfeagora.herokuapp.com',
  };

  useEffect(() => {}, [videoCall]);
  const rtcCallbacks = {
    EndCall: () => {
      dispatch(setMode('chat'));
      setVideoCall(false);
    },
  };
  return videoCall ? (
    <View style={{height: windowHeight}}>
      {/* <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} /> */}
    </View>
  ) : null;
}

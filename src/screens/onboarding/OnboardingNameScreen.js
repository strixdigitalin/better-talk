import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {HelperText, TextInput, Button} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {setName} from '../../store/reducers/userReducer';
import {setLoaded} from '../../store/reducers/appReducer';
import {useDispatch} from 'react-redux';
import {Header} from '@react-navigation/stack';
import {getDoctorsAsync} from '../../store/services/services';

const windowHeight = Dimensions.get('window').height;

const OnboardingNameScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focussed, setFocussed] = useState(false);
  const onChangeText = text => {
    setText(text);
    if (!(text.length === 0)) {
      setVisible(false);

      dispatch(setLoaded(true));
    }
  };

  const onNavigate = () => {
    if (text.length === 0) {
      setVisible(true);
    } else {
      dispatch(setName(text));
      navigation.navigate('OnboardingAbout');
    }
    setTimeout(() => {
      setVisible(false);
    }, 400);
  };

  useEffect(() => {
    dispatch(getDoctorsAsync({dispatch: dispatch}));
  }, []);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.containerRoot}
      keyboardVerticalOffset={Header.HEIGHT + 10}>
      <ProgressBar
        progress={0.2}
        color="#00BDA5"
        style={{backgroundColor: '#F4FFF6'}}
      />
      <ScrollView>
        <View style={styles.containerName}>
          <View style={styles.containerLottie}>
            <View style={styles.lottieHorizontal}>
              <LottieView
                source={require('../../assets/background.json')}
                autoPlay
                style={styles.lottieBG}
              />
              <LottieView
                source={require('../../assets/hello-bubble.json')}
                autoPlay
                style={styles.lottiebubble}
              />
              <LottieView
                source={require('../../assets/background.json')}
                autoPlay
                style={styles.lottieBG}
              />
            </View>
            <View style={styles.lottieHorizontal}>
              <LottieView
                source={require('../../assets/background.json')}
                autoPlay
                style={styles.lottieBG}
              />
              <LottieView
                source={require('../../assets/poodle-waving.json')}
                autoPlay
                style={styles.lottiepoodle}
              />
              <LottieView
                source={require('../../assets/background.json')}
                autoPlay
                style={styles.lottieBG}
              />
            </View>
          </View>
          <Text style={styles.welcomeText}>
            Hi! Welcome to
            <Text style={styles.highlightText}>Better Talk</Text>, Please
            introduce yourself.
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Type here.."
            value={text}
            onChangeText={text => {
              onChangeText(text);
            }}
            style={styles.nameInput}
            outlineColor={
              !focussed ? (visible ? '#9BC3EC' : '#CCD6E0') : '#323F4D'
            }
            placeholderTextColor="#85919D"
            isFocused={x => {
              setFocussed(x);
            }}
            maxLength={24}
            style={{
              backgroundColor: visible ? '#CDE1F6' : '#FBFBFB',
              height: 44,
              marginTop: 10,
              color: '#85919D',
              fontFamily: 'Inter-Regular',
              lineHeight: 24,
              fontSize: 14,
            }}
          />
          <Button
            mode="contained"
            uppercase={false}
            onPress={onNavigate}
            style={styles.btnOnboard}>
            <Text style={styles.btnText}>That's me!</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerRoot: {
    flex: 1,
  },
  containerName: {
    height: windowHeight,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  containerLottie: {marginTop: 10},
  lottieHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lottieBG: {
    width: 97,
    height: 97,
  },
  lottiepoodle: {
    position: 'absolute',
    top: -20,
    left: 50,
    width: 137,
    height: 137,
  },
  lottiebubble: {
    position: 'absolute',
    top: 10,
    left: 30,
    width: 82,
    height: 60,
  },
  welcomeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 26,
    color: '#33475B',
    marginTop: 30,
  },
  highlightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    lineHeight: 26,
    color: '#056AD0',
  },
  nameInput: {
    marginTop: 20,
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  btnOnboard: {
    width: '100%',
    position: 'absolute',
    bottom: 100,
    left: 15,
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default OnboardingNameScreen;

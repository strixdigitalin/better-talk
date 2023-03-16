import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {TextInput, Button, List} from 'react-native-paper';
import onboardingmedical from '../../assets/onboardingmedical.webp';
import {Header} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {setiIsLoggedIn, setMedHistory} from '../../store/reducers/userReducer';
import {postUserAsync} from '../../store/services/services';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const OnboardingMedicalScreen = ({navigation}) => {
  const name = useSelector(state => state.user.name);
  const gender = useSelector(state => state.user.gender);
  const mobile = useSelector(state => state.user.mobile);
  const qualification = useSelector(state => state.user.qualification);
  const location = useSelector(state => state.user.location);
  const age = useSelector(state => state.user.age);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.containerRoot}
      keyboardVerticalOffset={Header.HEIGHT + 20}>
      <ProgressBar
        progress={1}
        color="#00BDA5"
        style={{backgroundColor: '#F4FFF6'}}
      />
      <ScrollView>
        <View style={styles.containerMedical}>
          <Image source={onboardingmedical} style={styles.imgOnboard} />
          <Text style={styles.welcomeText}>
            Are you having or had any past{' '}
            <Text style={styles.highlightText}>Medical Issues</Text>?
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Please type here..."
            value={text}
            onChangeText={text => setText(text)}
            multiline={true}
            numberOfLines={5}
            outlineColor="#CCD6E0"
            style={{
              backgroundColor: '#FBFBFB',
              marginTop: 10,
              color: '#85919D',
              fontFamily: 'Inter-Regular',
              fontSize: 12,
              padding: 0,
            }}
          />
          <Button
            mode="contained"
            uppercase={false}
            loading={false}
            onPress={() => {
              dispatch(setiIsLoggedIn(true));
              dispatch(setMedHistory(text));
              dispatch(
                postUserAsync({
                  name: name,
                  age: age,
                  gender: gender,
                  location: location,
                  qualification: qualification,
                  medHistory: text,
                  mobile: mobile,
                  upcomingApp: [],
                  freeSession: false,
                  minutes: 0,
                  sessions: 0,
                  dispatch: dispatch,
                }),
              );
            }}
            style={styles.btnOnboard}>
            <Text style={styles.btnText}>Next</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerRoot: {
    flex: 1,
    height: windowHeight,
  },
  containerMedical: {
    height: windowHeight,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  imgOnboard: {
    width: 200,
    height: 200,
    marginLeft: windowWidth / 2 - 130,
  },
  welcomeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 26,
    color: '#33475B',
    marginTop: 20,
  },
  highlightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    lineHeight: 26,
    color: '#056AD0',
  },
  inputStyle: {
    marginTop: 5,
  },
  btnOnboard: {
    position: 'absolute',
    width: '100%',
    bottom: 100,
    left: 10,
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

export default OnboardingMedicalScreen;

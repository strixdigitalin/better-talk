import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {TextInput, Button} from 'react-native-paper';
import LandingCarousel from '../../components/LandingCarousel';
import {useSelector} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const OnboardingLandingScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const name = useSelector(state => state.user.name);
  const loaded = useSelector(state => state.app.loaded);
  const [interactionsComplete, setInteractionsComplete] = useState(false);
  let VeryExpensive = loaded
    ? require('../../components/LandingCarousel').default
    : null;

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setInteractionsComplete(true);
    });
  }, []);

  return (
    <View style={styles.containerRoot}>
      <ProgressBar
        progress={0.4}
        color="#00BDA5"
        style={{backgroundColor: '#F4FFF6'}}
      />

      <View style={styles.containerLanding}>
        <Text style={styles.welcomeText}>
          Hello <Text style={styles.highlightText}>{name}</Text>, Glad to see
          you here.
        </Text>
        <Text style={styles.bodyText}>
          We're glad to see you join our 200+ member family of healthcare heros
          grow.
        </Text>
        {interactionsComplete ? (
          <VeryExpensive />
        ) : (
          <View>
            <ActivityIndicator />
          </View>
        )}
        <Button
          mode="contained"
          uppercase={false}
          loading={false}
          onPress={() => navigation.navigate('OnboardingAbout')}
          style={styles.btnOnboard}>
          <Text style={styles.btnText}>Next</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRoot: {
    flex: 1,
  },
  containerLanding: {
    height: windowHeight,
    width: windowWidth,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 0,
    position: 'relative',
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
  bodyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 24,
  },
  btnOnboard: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    left: 20,
    width: 320,
    position: 'absolute',
    bottom: 97,
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default OnboardingLandingScreen;

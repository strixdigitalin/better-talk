import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import splashlogo from '../../assets/splashlogo.png';
import {useDispatch, useSelector} from 'react-redux';
import {getUserIdAsync, getDoctorsAsync, getUserByIdAsync} from '../../store/services/services';
import SplashScreen from 'react-native-splash-screen';
import { setiIsLoggedIn } from '../../store/reducers/userReducer';

const windowHeight = Dimensions.get('window').height;

export default function SplashLoadScreen({navigation}) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const userId = useSelector(state => state.user.userId);
  useEffect(() => {
    dispatch(getUserIdAsync({dispatch: dispatch}));
    dispatch(getDoctorsAsync({dispatch: dispatch}));
  }, []);

  useEffect(() => {
    if (loading) {
    } else {
      if (userId) {
        console.log(' dispatch(getUserByIdAsync userId: ', userId);
        dispatch(getUserByIdAsync({id: userId, dispatch: dispatch}));
        dispatch(setiIsLoggedIn(true));
        SplashScreen.hide();
      } else {
        navigation.navigate('Login');
        SplashScreen.hide();
      }
    }
  }, [loading, userId]);
  return null;
  // <View style={styles.rootContainer}>
  //   <Image source={splashlogo} style={styles.splashLogo} />
  // </View>
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

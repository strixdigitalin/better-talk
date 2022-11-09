import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { Appbar } from 'react-native-paper';

export default function BackButton() {
    const navigation = useNavigation();
    return <Appbar.BackAction onPress={() => navigation.goBack()} style={styles.btnBack} size={17}/>;
};
  
const styles = StyleSheet.create({
  btnBack: {
      width: 28,
      height: 28,
      borderRadius: 50,
      backgroundColor: "#F5F8FA",
      padding: 0,
  },
});

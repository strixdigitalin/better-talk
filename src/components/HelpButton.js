import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {StyleSheet, Text} from 'react-native';

export default function HelpButton() {
  return (
    <Button
      icon="chat-outline"
      uppercase={false}
      onPress={() => {}}
      style={styles.btnHelp}
      color="#33475B"
      >
      <Text style={styles.btnText}>Help</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  btnHelp: {
    backgroundColor: '#F5F8FA',
    paddingHorizontal: 1,
    borderRadius: 8,
    width: 90,
    marginRight: 10,
    height: 35,
    fontFamily: "Inter-SemiBold"
  },
  btnText: {
    fontSize: 12,
    marginLeft: -4,
    color: "#33475B",
    fontFamily: "Inter-SemiBold"
  },
});

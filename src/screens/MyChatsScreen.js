import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default function MyChatsScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>MyChatsScreen Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 15,
  },
});

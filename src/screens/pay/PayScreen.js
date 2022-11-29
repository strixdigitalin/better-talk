import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Toggle from '../../components/ToggleElement';
import PayPerMin from './PayPerMin';
import PaySession from './PaySession';

const windowHeight = Dimensions.get('window').height;

export default function PayScreen({navigation}) {
  const [toggleValue, setToggleValue] = useState(true);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.toggleContainer}>
        <Toggle
          value={toggleValue}
          onPress={newState => setToggleValue(newState)}
          leftTitle="Pay Per Min"
          rightTitle="Sessions"
          trackBarStyle={{
            borderColor: '#E5E9F0',
            width: 320,
            height: 36,
            radius: 18,
          }}
          trackBar={{
            borderWidth: 2,
          }}
          thumbButton={{
            width: 160,
            height: 36,
            radius: 18,
            activeBackgroundColor: '#056AD0',
            inActiveBackgroundColor: '#F5F8FA',
          }}
          thumbStyle={{}}
        />
      </View>
      {toggleValue ? (
        <PayPerMin navigation={navigation} />
      ) : (
        <PaySession navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
  },
  toggleContainer: {
    paddingHorizontal: 15,
    marginLeft: "auto",
  },
});

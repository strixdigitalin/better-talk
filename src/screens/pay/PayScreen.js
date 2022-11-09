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
            activeBackgroundColor: '#056AD0',
            inActiveBackgroundColor: '#F5F8FA',
            width: 300,
            textAlign: 'center',
            height: 36,
            paddingHorizontal: 15,

            radius: 18,
          }}
          trackBar={{
            borderWidth: 2,
          }}
          thumbButton={{
            width: 160,
            paddingHorizontal: 15,
            height: 36,
            radius: 18,
            activeBackgroundColor: '#056AD0',
            inActiveBackgroundColor: '#F5F8FA',
            textAlign: 'center',
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
    textAlign: 'center',
  },
  toggleContainer: {
    paddingHorizontal: 15,
    marginLeft: 'auto',
    textAlign: 'center',
  },
});

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
      {/* <View style={styles.toggleContainer}> */}
      <View style={styles.toggleOuter}>
        <View
          style={
            toggleValue
              ? {...styles.firstTab, borderWidth: 0, borderLeftWidth: 1}
              : {...styles.secondTab, borderWidth: 0, borderLeftWidth: 1}
          }>
          <Text
            style={{
              textAlign: 'center',
              color: toggleValue ? '#fff' : '#000',
            }}
            onPress={() => {
              setToggleValue(true);
            }}>
            Pay Per Min
          </Text>
        </View>
        <View
          style={
            toggleValue
              ? {...styles.secondTab, borderWidth: 0, borderRightWidth: 1}
              : {...styles.firstTab}
          }>
          <Text
            style={{
              color: !toggleValue ? '#fff' : '#000',
            }}
            onPress={() => {
              setToggleValue(false);
            }}>
            Sessions
          </Text>
        </View>
      </View>
      {/* <Toggle
          value={toggleValue}
          onPress={newState => {
            console.log(newState, '<<<this is newState');
            setToggleValue(newState);
          }}
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
        /> */}
      {/* </View> */}
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
  toggleOuter: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 'auto',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 20,
    alignSelf: 'center',
  },
  firstTab: {
    backgroundColor: '#056AD0',
    color: '#fff',
    width: '50%',
    borderRadius: 20,
    height: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondTab: {
    backgroundColor: '#fff',
    color: '#000',
    width: '50%',
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    paddingHorizontal: 15,
    marginLeft: 'auto',
    textAlign: 'center',
  },
});

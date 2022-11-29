import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updateMedHistoryAsync  } from '../../store/services/userServices';

const windowHeight = Dimensions.get('window').height;

export default function MedDetailsScreen() {
  const textInit = useSelector(state => state.user.medHistory);
  const [text, setText] = useState(textInit);
  const userId = useSelector(state => state.user.userId);
  const dispatch = useDispatch();
  return (
    <View style={styles.rootContainer}>
      <TextInput
        mode="outlined"
        placeholder="Please type here..."
        value={text}
        onChangeText={text => {
          setText(text);
          dispatch(updateMedHistoryAsync({id: userId, medHistory: text, dispatch: dispatch}));
          }}
        multiline={true}
        numberOfLines={5}
        outlineColor="#CCD6E0"
        style={{
          backgroundColor: '#FBFBFB',
          marginTop: 20,
          color: '#85919D',
          fontFamily: 'Inter-Regular',
          fontSize: 12,
          padding: 0,
        }}
      />
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

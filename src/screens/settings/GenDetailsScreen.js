import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { updateAgeAsync, updateGenderAsync } from '../../store/services/userServices';

const windowHeight = Dimensions.get('window').height;

export default function GenDetailsScreen() {
  const [showAgeDropDown, setShowAgeDropDown] = useState(false);
  const genderInit = useSelector(state => state.user.gender);
  console.log('genderInit: ', genderInit);
  const [gender, setGender] = useState("");
  console.log('gender: ', gender);
  const [showGenderDropDown, setGenderDropDown] = useState(false);
  const ageInit = useSelector(state => state.user.age);
  const [age, setAge] = useState(ageInit);
  const genderList = ['Female', 'Male', 'Other'];
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  return (
    <View style={styles.rootContainer}>
      <TextInput
        mode="outlined"
        placeholder="Your Age"
        value={age.toString()}
        onChangeText={text => {
          setAge(text);
          dispatch(updateAgeAsync({id: userId, age: text, dispatch: dispatch}));
        }}
        style={styles.nameInput}
        outlineColor="#CCD6E0"
        placeholderTextColor="#85919D"
        maxLength={24}
        style={{
          backgroundColor: '#FBFBFB',
          height: 44,
          marginTop: 10,
          color: '#85919D',
          fontFamily: 'Inter-Regular',
          lineHeight: 24,
          fontSize: 14,
        }}
      />
      <View style={styles.spacerStyle} />
      <SelectDropdown
        data={genderList}
        onSelect={(selectedItem, index) => {
          dispatch(updateGenderAsync({id: userId, gender: selectedItem, dispatch: dispatch}));
        }}
        defaultButtonText={genderInit}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return (
            <MaterialCommunityIcons
              name={isOpened ? 'menu-up' : 'menu-down'}
              size={24}
              color="#7C98B6"
            />
          );
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 44,
    backgroundColor: '#FBFBFB',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCD6E0',
    marginTop: 7,
  },
  dropdown1BtnTxtStyle: {
    color: '#85919D',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    fontSize: 14,
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  spacerStyle: {
    marginTop: 5,
  },
});

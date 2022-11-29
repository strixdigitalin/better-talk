import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import {TextInput} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocationAsync, updateQualificationAsync } from '../../store/services/userServices';

const windowHeight = Dimensions.get('window').height;

export default function ProfDetailsScreen() {
  const [showLocationDropDown, setshowLocationDropDown] = useState(false);
  const locationInit = useSelector(state => state.user.location);
  const [location, setLocation] = useState(locationInit);
  const [showProfessionDropDown, setShowProfessionDropDown] = useState(false);
  const profInit = useSelector(state => state.user.qualification);
  const [profession, setProfession] = useState(profInit);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);

  const locationList = [
    'Hyderabad',
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
  ];
  const professionList = [
    'Engineer',
    'Student',
    'Self-Employed',
    'Homemaker',
    'Professor',
    'Public Service',
    'Corporate Professional',
    'Tradesman',
  ];
  return (
    <View style={styles.rootContainer}>
       <SelectDropdown
          data={locationList}
          onSelect={(selectedItem, index) => {
            dispatch(updateLocationAsync({id: userId, location: selectedItem, dispatch: dispatch}));
          }}
          defaultButtonText={location}
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
        <View style={styles.spacerStyle} />
        <SelectDropdown
          data={professionList}
          onSelect={(selectedItem, index) => {
            dispatch(updateQualificationAsync({id: userId, qualification: selectedItem, dispatch: dispatch}));
          }}
          defaultButtonText={profession}
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
    paddingTop: 20,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 44,
    backgroundColor: '#FBFBFB',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCD6E0',
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
    marginTop: 15,
  },
});

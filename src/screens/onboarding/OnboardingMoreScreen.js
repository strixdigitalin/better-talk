import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {TextInput, Button, List} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import onboardingmore from '../../assets/onboardingmore.webp';
import {setLocation, setQualification} from '../../store/reducers/userReducer';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const OnboardingMoreScreen = ({navigation}) => {
  const name = useSelector(state => state.user.name);
  const gender = useSelector(state => state.user.gender);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const [showLocationDropDown, setshowLocationDropDown] = useState(false);
  const [locationTemp, setLocationTemp] = useState('');
  const [showProfessionDropDown, setShowProfessionDropDown] = useState(false);
  const [profession, setProfession] = useState('');
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
  console.log('thisisgender', gender);

  return (
    <View style={styles.containerRoot}>
      <ProgressBar
        progress={0.8}
        color="#00BDA5"
        style={{backgroundColor: '#F4FFF6'}}
      />
      <View style={styles.containerMore}>
        <Image source={onboardingmore} style={styles.imgOnboard} />
        <Text style={styles.welcomeText}>
          Tell us a little bit more about{' '}
          <Text style={styles.highlightText}>yourself</Text> {name}!
        </Text>
        <SelectDropdown
          data={locationList}
          onSelect={(selectedItem, index) => {
            setLocationTemp(selectedItem);
          }}
          defaultButtonText={'Your Location'}
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
            setProfession(selectedItem);
          }}
          defaultButtonText={'Your Profession'}
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
        <Button
          mode="contained"
          uppercase={false}
          loading={false}
          onPress={() => {
            dispatch(setLocation(locationTemp));
            dispatch(setQualification(profession));
            navigation.navigate('OnboardingMedical');
          }}
          style={styles.btnOnboard}>
          <Text style={styles.btnText}>Next</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRoot: {
    flexGrow: 1,
  },
  containerMore: {
    height: windowHeight,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    postion: 'relative',
  },
  imgOnboard: {
    width: 200,
    height: 200,
    marginLeft: windowWidth / 2 - 130,
  },
  welcomeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 26,
    color: '#33475B',
    marginTop: 20,
    marginBottom: 10,
  },
  highlightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    lineHeight: 26,
    color: '#056AD0',
  },
  spacerStyle: {
    marginTop: 5,
  },
  btnOnboard: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    left: 20,
    width: '100%',
    position: 'absolute',
    bottom: 97,
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
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
});

export default OnboardingMoreScreen;

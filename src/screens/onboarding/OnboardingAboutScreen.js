import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {TextInput, Button} from 'react-native-paper';
import onboardingabout from '../../assets/onboardingabout.webp';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import {Header} from '@react-navigation/stack';
import {setGender, setAge} from '../../store/reducers/userReducer';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const OnboardingAboutScreen = ({navigation}) => {
  const name = useSelector(state => state.user.name);
  const [showAgeDropDown, setShowAgeDropDown] = useState(false);
  const [genderTemp, setGenderTemp] = useState('');
  const [showGenderDropDown, setGenderDropDown] = useState(false);
  const [ageTemp, setAgeTemp] = useState('');
  const genderList = ['Female', 'Male', 'Other'];
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.containerRoot}
      keyboardVerticalOffset={Header.HEIGHT + 10}>
      <ProgressBar
        progress={0.6}
        color="#00BDA5"
        style={{backgroundColor: '#F4FFF6'}}
      />
      <ScrollView>
        <View style={styles.containerAbout}>
          <Image source={onboardingabout} style={styles.imgOnboard} />
          <Text style={styles.welcomeText}>
            Tell us about <Text style={styles.highlightText}>yourself</Text>{' '}
            {name}!
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Your Age"
            value={ageTemp}
            onChangeText={text => {
              setAgeTemp(text);
            }}
            style={styles.nameInput}
            outlineColor="#CCD6E0"
            placeholderTextColor="#85919D"
            maxLength={3}
            keyboardType={'number-pad'}
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
              setGenderTemp(selectedItem);
              console.log(selectedItem, '<<<selecteditem');
            }}
            defaultButtonText={'Gender'}
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
              navigation.navigate('OnboardingMore');
              dispatch(setAge(ageTemp));
              dispatch(setGender(genderTemp));
            }}
            style={styles.btnOnboard}>
            <Text style={styles.btnText}>Next</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerRoot: {
    flex: 1,
  },
  containerAbout: {
    height: windowHeight,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    position: 'relative',
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
    position: 'absolute',
    width: '100%',
    bottom: 100,
    left: 10,
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
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
});

export default OnboardingAboutScreen;

import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, Switch} from 'react-native';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Divider} from 'react-native-paper';
import userprofile from '../../assets/userprofile.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {updateImage} from '../../store/services/StrixAPI/USerAPI';
import {setImage} from '../../store/reducers/userReducer';

const windowHeight = Dimensions.get('window').height;
// console.log(result);
export default function SettingsScreen({navigation}) {
  const [avatar, setavatar] = useState('');
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.name);
  const image = useSelector(state => state.user.image);
  const userId = useSelector(state => state.user.userId);

  openGalery = () => {
    var options = {
      title: 'Select Image',

      customButtons: [
        {
          name: 'customOptionKey',

          title: 'Choose file from Custom Option',
        },
      ],

      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    const requestCameraPermission = async () => {
      try {
        launchImageLibrary(options, res => {
          console.log('Response = ', res);

          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            let source = res;
            const payload = {
              ...res.assets[0],
              filename: res.assets[0].fileName,
            };
            setavatar(res.assets[0].uri);
            updateImage(userId, payload, res => {
              console.log(res.data, '\n\n<<<<<Image\n\n');
              dispatch(setImage(res.data.profile));
            });
            console.log(res.assets[0].uri, '<<<<res', payload);
          }
        });
        // const granted = await PermissionsAndroid.request(
        //   PermissionsAndroid.PERMISSIONS.CAMERA,
        //   {
        //     title: 'App Camera Permission',
        //     message: 'App needs access to your camera ',
        //     buttonNeutral: 'Ask Me Later',
        //     buttonNegative: 'Cancel',
        //     buttonPositive: 'OK',
        //   },
        // );
        // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //   console.log('Camera permission given');

        // } else {
        //   console.log('Camera permission denied');
        // }
      } catch (err) {
        console.warn(err);
      }
    };

    requestCameraPermission();
  };
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <View style={styles.profContainer}>
          <View style={styles.imgContainer}>
            <Image source={{uri: image}} style={styles.prof} />
            <View style={styles.iconCon}>
              <MaterialCommunityIcons
                name="camera"
                size={16}
                onPress={openGalery}
                color={'#33475B'}
                style={styles.camera}
              />
            </View>
          </View>
          <View style={styles.det}>
            <View style={styles.nameCont}>
              <Text style={styles.name}>{name}</Text>
              <MaterialIcons
                name="edit"
                size={16}
                color={'#056AD0'}
                style={{marginLeft: 5, marginTop: 3}}
              />
            </View>
            <Text style={styles.mail}>Alexcosta@gmail.com</Text>
          </View>
        </View>
        <View style={styles.flexRow}>
          <FontAwesome name="user" size={24} color={'#28323E'} />
          <Text style={styles.heading}>Account</Text>
        </View>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GenDetails');
          }}>
          <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
            <Text style={styles.subheading}>General Details</Text>
            <MaterialIcons name="chevron-right" size={24} color={'#6E7781'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfDetails');
          }}>
          <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
            <Text style={styles.subheading}>Professional Details</Text>
            <MaterialIcons name="chevron-right" size={24} color={'#6E7781'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MedDetails');
          }}>
          <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
            <Text style={styles.subheading}>Medical Details</Text>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={'#6E7781'}
              onPress={() => {
                navigation.navigate('MedDetails');
              }}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.flexRow}>
          <MaterialCommunityIcons name="bell" size={24} color={'#28323E'} />
          <Text style={styles.heading}>Notifications</Text>
        </View>
        <Divider />
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <Text style={styles.subheading}>Notifications</Text>
          <Switch
            trackColor={{false: '#767577', true: '#056AD0'}}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.flexRow}>
          <FontAwesome name="gear" size={24} color={'#28323E'} />
          <Text style={styles.heading}>General</Text>
        </View>
        <Divider />
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <Text style={styles.subheading}>Your Balance</Text>
          <Text style={styles.bold}>{'\u20B9'}67/-</Text>
        </View>
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <Text style={styles.subheading}>Gift a friend</Text>
          <MaterialIcons name="chevron-right" size={24} color={'#6E7781'} />
        </View>
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <Text style={styles.subheading}>Your Accomplishments</Text>
          <MaterialIcons name="chevron-right" size={24} color={'#6E7781'} />
        </View>
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <Text style={styles.subheading}>Your Purchases</Text>
          <MaterialIcons name="chevron-right" size={24} color={'#6E7781'} />
        </View>
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <Text style={styles.subheading}>About Us</Text>
          <MaterialIcons name="chevron-right" size={24} color={'#6E7781'} />
        </View>
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <Text style={styles.subheading}>Log Out</Text>
          <MaterialIcons name="chevron-right" size={24} color={'#6E7781'} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 15,
  },
  profContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  imgContainer: {
    position: 'relative',
    borderRadius: '50%',
  },
  heading: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 28,
    color: '#33475B',
    marginLeft: 10,
  },
  subheading: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
    marginLeft: 10,
  },
  bold: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#056AD0',
    marginLeft: 10,
  },
  iconCon: {
    position: 'absolute',
    top: 40,
    right: 10,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#E5E5E5',
    padding: 2,
  },
  prof: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
  nameCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#33475B',
  },
  mail: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#85919D',
  },
  det: {
    marginLeft: 15,
    marginTop: 5,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
});

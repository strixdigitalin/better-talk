import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TurboModuleRegistry,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import {AirbnbRating} from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dummydoc from '../../assets/dummydoc.png';
import {
  setDoctorEnquired,
  setDocSelectedObj,
} from '../../store/reducers/bookReducer';
import {setDocSelected} from '../../store/reducers/chatReducer';
import {useDispatch, useSelector} from 'react-redux';
import {getDoctorsAsync} from '../../store/services/services';
import {getNotificationsAsync} from '../../store/services/notificationservices';
import {selectDoctors} from '../../store/reducers/docReducer';
import LinearGradient from 'react-native-linear-gradient';
const windowHeight = Dimensions.get('window').height;

const doctorsList = [
  {
    id: 1,
    name: 'Dr. Murphy',
    rating: 5,
    designation: 'Endocrinologist',
    available: '5 mins',
  },
  {
    id: 2,
    name: 'Dr. Steve',
    rating: 3,
    designation: 'Endocrinologist',
    available: '5 mins',
  },
  {
    id: 3,
    name: 'Dr. Arnold',
    rating: 5,
    designation: 'Endocrinologist',
    available: '5 mins',
  },
  {
    id: 4,
    name: 'Dr. Winter',
    rating: 4,
    designation: 'Endocrinologist',
    available: '5 mins',
  },
  {
    id: 5,
    name: 'Dr. Rachel',
    rating: 3,
    designation: 'Endocrinologist',
    available: '5 mins',
  },
];

const DoctorsListScreen = ({navigation}) => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const userId = useSelector(state => state.user.userId);
  const loading = useSelector(state => state.doc.loading);
  const displayDoctors = useSelector(state => state.doc.doctors);
  const [itemsToRender, setItemsToRender] = useState(displayDoctors);
  const freeUsed = useSelector(state => state.book.freeUsed);
  const scrollLength = itemsToRender.length * 100 + 100;
  const dispatch = useDispatch();
  const appointmentsList = [
    {
      id: 1,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Murphy',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 2,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Steve',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 3,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Arnold',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 4,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Winter',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 5,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Murphy',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 6,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Murphy',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 7,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Murphy',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 8,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Murphy',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 9,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Murphy',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 10,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Murphy',
      doctorDes: 'Endocrinologist',
    },
  ];

  function onSearchText(searchtext) {
    if (searchtext === '') {
      setItemsToRender(displayDoctors);
    } else {
      let temp = displayDoctors.filter(function (el) {
        const text1 = el.name.toLowerCase();
        if (text1.includes(searchtext.toLowerCase())) return el;
      });
      console.log('temp: ', temp);
      setItemsToRender(temp);
    }
  }

  useEffect(() => {
    dispatch(getNotificationsAsync({id: userId, dispatch: dispatch}));
    console.log('loading: ', loading);
    console.log('displayDoctors: ', displayDoctors);
    setItemsToRender(displayDoctors);
  }, [loading, displayDoctors]);

  const showRating = arr => {
    let rating = 0;
    arr.map(item => {
      rating = +rating + +item.rating;
    });
    console.log('\n\n\n Ratings \n', rating, '<<<<for rating');

    return parseInt(rating / arr.length);
  };
  return (
    <View style={styles.listContainer}>
      <Text style={styles.subTitle}>Hope you are doing well today</Text>
      <Searchbar
        placeholder="Search a doctor"
        style={{
          height: 40,
          backgroundColor: '#FBFBFB',
          borderWidth: 0.5,
          borderColor: '#CCD6E0',
          borderRadius: 4,
        }}
        inputStyle={{fontSize: 14, color: '#7C98B6'}}
        iconColor="#7C98B6"
        onChangeText={text => {
          onSearchText(text);
        }}
      />
      <View style={styles.flexRow}>
        <Text style={styles.welcomeText}>Upcoming Appointments (2)</Text>
        <TouchableOpacity>
          <Text style={styles.highlightText}>View All</Text>
        </TouchableOpacity>
      </View>
      {freeUsed ? (
        <View style={styles.appointContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>Tue</Text>
            <Text style={styles.date}>23</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.heading}>Your Appointment</Text>
            <Text style={styles.subheading}>{appointmentsList[0].time}</Text>
            <Text style={styles.heading}>{appointmentsList[0].doctor}</Text>
            <Text style={styles.subheading}>
              {appointmentsList[0].doctorDes}
            </Text>
          </View>
          <View style={styles.arrContainer}>
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="#FFFFFF"
              onPress={() => {
                navigation.navigate('Appointments');
              }}
            />
          </View>
        </View>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#E6F2FF', '#FBFAFC', '#FFFFFF']}
          style={styles.freeContainer}>
          <View style={styles.trialContainer}>
            <View style={styles.trialHeader}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="medical-bag"
                  size={20}
                  color="#056AD0"
                />
              </View>
              <Text style={styles.trial}>Book a trial session</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.trialContent}>
                You can now book{' '}
                <Text style={styles.trialBold}>15mins&nbsp;</Text>
                sessions with our doctors daily for&nbsp;
                <Text style={styles.trialBold}>free of cost</Text>
              </Text>
            </View>
          </View>
          <View style={styles.arrFreeContainer}>
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="#33475B"
              onPress={() => {
                navigation.navigate('AvailableDoctors');
              }}
            />
          </View>
        </LinearGradient>
      )}

      <View style={styles.flexRow}>
        <Text style={styles.welcomeText}>Our Doctors</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="sort-variant"
            size={24}
            color="#5C6C7C"
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{height: scrollLength}}>
          {itemsToRender.map(doctor => {
            console.log(
              '\n\n\nall doctors --->,',
              doctor,
              '<<< these are doctors',
            );
            return (
              <TouchableOpacity
                style={styles.docContainer}
                key={doctor._id}
                onPress={() => {
                  navigation.navigate('DoctorDetails', {
                    disableBookLater: false,
                  });
                  console.log('doctor: ', doctor);
                  dispatch(setDoctorEnquired(doctor.name));
                  dispatch(setDocSelected(doctor._id));
                  dispatch(setDocSelectedObj(doctor));
                }}>
                {/* <ImageBackground source={doctor} resizeMode="cover" style={styles.doctorImage} /> */}
                <Image
                  source={doctor.profile ? doctor.profile : dummydoc}
                  style={styles.doctorImage}
                />
                <View style={styles.detailsContainer}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={styles.heading2}>{doctor.name}</Text>
                    <AirbnbRating
                      // count={+doctor.rating}
                      count={5}
                      defaultRating={showRating(doctor.rating)}
                      showRating={false}
                      size={14}
                      isDisabled={true}
                      ratingColor="#DE8B0E"
                    />
                  </View>
                  <Text style={styles.subheading2}>{doctor.qualification}</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View
                      style={
                        doctor.isAvailable ? styles.greendot : styles.reddot
                      }></View>
                    <Text style={styles.subheading2}>Available </Text>
                    <Text style={styles.subheading3}>
                      {!doctor.isAvailable && (
                        <Text> in {doctor.minutes} mins</Text>
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.arrContainer2}>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={24}
                    color="#7C98B6"
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    height: windowHeight,
  },
  subTitle: {
    fontFamily: 'Inter-Normal',
    fontSize: 14,
    lineHeight: 24,
    color: '#85919D',
    marginBottom: 10,
  },
  appointContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#056AD0',
    borderRadius: 12,
    marginTop: 10,
  },
  freeContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E9F0',
    elevation: 3,
  },
  trialHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    paddingBottom: 2,
    paddingLeft: 4,
    paddingTop: 2,
  },
  trial: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
    marginLeft: 8,
  },
  contentContainer: {
    width: 231,
    height: 48,
  },
  trialContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#5C6C7C',
  },
  trialBold: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    lineHeight: 24,
    color: '#33475B',
  },
  arrFreeContainer: {
    marginLeft: 35,
    paddingVertical: 25,
  },
  docContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 4,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    position: 'relative',
    width: '98%',
    marginHorizontal: 2,
  },
  dateContainer: {
    backgroundColor: '#FFFFFF',
    width: 51,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
    marginTop: 10,
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#33475B',
  },
  heading: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  subheading: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  arrContainer: {
    marginLeft: 88,
    paddingVertical: 35,
  },
  doctorImage: {
    width: 64,
    height: 80,
    marginRight: 10,
  },
  arrContainer2: {
    paddingTop: 30,
    position: 'absolute',
    right: 20,
  },
  heading2: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
  },
  subheading2: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#5C6C7C',
  },
  subheading3: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#33475B',
  },
  btnBook: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    textAlign: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  welcomeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#33475B',
  },
  highlightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    lineHeight: 28,
    color: '#056AD0',
  },
  greendot: {
    backgroundColor: '#00BDA5',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 9,
    marginRight: 8,
  },
  reddot: {
    backgroundColor: 'red',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 9,
    marginRight: 8,
  },
});

export default DoctorsListScreen;

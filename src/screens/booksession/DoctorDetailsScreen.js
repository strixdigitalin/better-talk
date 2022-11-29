import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dummyuser from '../../assets/dummyuser.png';
import profilepicreview from '../../assets/profilepicreview.png';
import moment from 'moment';
import {AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowHeight = Dimensions.get('window').height + 30;
const windowWidth = Dimensions.get('window').width;
const date1 = moment().add(5, 'minutes');
const date2 = moment().add(2, 'minutes');
const date3 = moment().add(1, 'minutes');

const reviewersList = [
  {
    id: 1,
    name: 'Chandler Bing',
    rating: 5,
    time: date1,
    content:
      'Folks who fell off roofs trying to chisel ice dams are still hopping around on crutches.',
  },
  {
    id: 2,
    name: 'Chandler Bing',
    rating: 4,
    time: date2,
    content:
      'Folks who fell off roofs trying to chisel ice dams are still hopping around on crutches.',
  },
  {
    id: 3,
    name: 'Chandler Bing',
    rating: 4,
    time: date2,
    content:
      'Folks who fell off roofs trying to chisel ice dams are still hopping around on crutches.',
  },
  {
    id: 4,
    name: 'Chandler Bing',
    rating: 5,
    time: date1,
    content:
      'Folks who fell off roofs trying to chisel ice dams are still hopping around on crutches.',
  },
  {
    id: 5,
    name: 'Chandler Bing',
    rating: 5,
    time: date1,
    content:
      'Folks who fell off roofs trying to chisel ice dams are still hopping around on crutches.',
  },
];

export default function DoctorDetailsScreen({route, navigation}) {
  const dispatch = useDispatch();
  const docEnquired = useSelector(state => state.book.doctorEnquired);
  const docSelectedObj = useSelector(state => state.book.docSelectedObj);
  console.log('doctorSelectedObj: ', docSelectedObj);
  console.log('doctorSelectedObj: ', docSelectedObj.rating);
  console.log('docEnquired: ', docEnquired);
  let now = moment();
  const {disableBookLater} = route.params;
  function timer(date, now) {
    return date.diff(now, 'minutes', true).toFixed(2);
  }
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          height: windowHeight,
        },
      ]}>
      <LinearGradient
        colors={['#E6F2FF', '#AED6FF', '#2D8AE9']}
        style={styles.linearGradient}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color="#28323E"
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-start', marginTop: 45, marginLeft: 20}}
        />
        <View style={styles.userContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>Dr. {docEnquired} </Text>
            <Text style={styles.qualification}>
              {docSelectedObj.qualification}
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <AirbnbRating
                count={5}
                defaultRating={5}
                showRating={false}
                size={14}
                isDisabled={true}
                ratingColor="#DE8B0E"
              />
              <Text style={styles.noofRevs}>(1000+)</Text>
            </View>
          </View>
          <Image source={dummyuser} style={styles.userImage} />
        </View>
        <ScrollView style={styles.medicalContainer}>
          <Text style={styles.subheading}>About</Text>
          <Text style={styles.body}>{docSelectedObj.about}</Text>
          <View style={styles.boxRoot}>
            <View style={[styles.boxDetails]}>
              <Icon name="group" size={28} color="#69A6E3" />
              <View style={styles.textDetails}>
                <Text style={styles.textNumber}>{docSelectedObj.patients}</Text>
                <Text style={styles.textType}>Patients</Text>
              </View>
            </View>
            <View style={[styles.boxDetails, styles.flexRow]}>
              <Icon name="suitcase" size={28} color="#69A6E3" />
              <View style={styles.textDetails}>
                <Text style={styles.textNumber}>
                  {docSelectedObj.experience}
                </Text>
                <Text style={styles.textType}>Experience</Text>
              </View>
            </View>
          </View>
          <Text style={styles.subheading}>Qualifications</Text>
          <Text style={styles.body}>
            Folks who fell off roofs trying to chisel ice dams are still hopping
            around on crutches.
          </Text>
          <Text style={styles.subheading}>Description</Text>
          <Text style={styles.body}>{docSelectedObj.description}</Text>
          <Text style={styles.subheading}>Reviews</Text>
          {docSelectedObj.rating.map(review => {
            return (
              <View style={styles.reviewsList}>
                <View style={styles.reviewContainer}>
                  <View style={styles.profileDetails}>
                    <Image
                      source={profilepicreview}
                      style={styles.profilepicrev}
                    />
                    <Text style={styles.reviewerName}>{review.from}</Text>
                    <AirbnbRating
                      count={5}
                      defaultRating={review.rating}
                      showRating={false}
                      size={14}
                      isDisabled={true}
                      ratingColor="#DE8B0E"
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        right: 5,
                        fontSize: 12,
                        fontFamily: 'Inter-Regular',
                        lineHeight: 24,
                      }}>
                      1h ago
                    </Text>
                  </View>
                  <Text style={styles.revContent}>{review.feedback}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => {
            navigation.navigate('ChooseAppointment', {
              disableBookLater: disableBookLater,
            });
          }}
          style={styles.btnOnboard}>
          <Text style={styles.btnText}>Book a session</Text>
        </Button>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    flex: 1,
  },
  linearGradient: {
    height: windowHeight,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  btnOnboard: {
    position: 'absolute',
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    bottom: 20,
    width: '90%',
    left: 20,
  },
  userContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    marginBottom: 25,
  },
  detailsContainer: {
    width: 183,
    height: 100,
    padding: 5,
  },
  medicalContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#FDFDFD',
    elevation: 2,
    width: windowWidth,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
  },
  userImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#E5E9F0',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    lineHeight: 26,
  },
  qualification: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  details: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 28,
  },
  subheading: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 24,
    marginTop: 10,
    color: '#33475B',
  },
  body: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 28,
    marginTop: 10,
  },
  emphasis: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    lineHeight: 28,
    color: '#33475B',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  boxRoot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  boxDetails: {
    backgroundColor: '#F9FDFF',
    width: 154,
    height: 86,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0,
  },
  textNumber: {
    color: '#056AD0',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  textType: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#5C6C7C',
  },
  reviewsList: {
    marginTop: 20,
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  reviewerName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 12,
    color: '#33475B',
    marginHorizontal: 5,
  },
  revContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#5C6C7C',
  },
});

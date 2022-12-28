import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dummydoc from '../../assets/dummydoc.png';

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


export default function AvailableDoctorsScreen({navigation}) {
  const [itemsToRender, setItemsToRender] = useState(doctorsList);
  return (
    <View style={styles.rootContainer}>
   {itemsToRender.map(doctor => {
        return (
          <View style={styles.docContainer} key={doctor.id}>
            {/* <ImageBackground source={doctor} resizeMode="cover" style={styles.doctorImage} /> */}
            <Image source={dummydoc} style={styles.doctorImage} />
            <View style={styles.detailsContainer}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={styles.heading2}>{doctor.name}</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={doctor.rating}
                  showRating={false}
                  size={14}
                  isDisabled={true}
                  ratingColor="#DE8B0E"
                />
              </View>

              <Text style={styles.subheading2}>{doctor.designation}</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={styles.greendot}></View>
                <Text style={styles.subheading2}>Available in &nbsp;</Text>
                <Text style={styles.subheading3}>{doctor.available}</Text>
              </View>
            </View>
            <View style={styles.arrContainer2}>
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color="#7C98B6"
                onPress={() => {
                  navigation.navigate('DoctorDetails', {disableBookLater: true});
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 15,
  },
  greendot: {
    backgroundColor: '#00BDA5',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 9,
    marginRight: 8,
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
  },
});

import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('window').height;

const AppointmentsScreen = () => {
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
      time: '03.00 am - 04.00 am',
      doctor: 'Dr. Murphy',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 3,
      day: 'Wed',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Murphy',
      doctorDes: 'Endocrinologist',
    },
    {
      id: 4,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      doctor: 'Dr. Murphy',
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
  return (
    <View style={styles.listContainer}>
      <Searchbar
        placeholder="Search an appointment"
        style={{height: 40, marginTop: 10}}
        inputStyle={{fontSize: 14, color: '#7C98B6'}}
        iconColor="#7C98B6"
      />
      <Text style={styles.welcomeText}>Today</Text>
      <View style={styles.appointContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Tue</Text>
          <Text style={styles.date}>23</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.heading}>Your Appointment</Text>
          <Text style={styles.subheading}>{appointmentsList[0].time}</Text>
          <Text style={styles.heading}>{appointmentsList[0].doctor}</Text>
          <Text style={styles.subheading}>{appointmentsList[0].doctorDes}</Text>
        </View>
        <View style={styles.arrContainer}>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color="#FFFFFF"
          />
        </View>
      </View>
      <View style={styles.appointContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Tue</Text>
          <Text style={styles.date}>23</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.heading}>Your Appointment</Text>
          <Text style={styles.subheading}>{appointmentsList[1].time}</Text>
          <Text style={styles.heading}>{appointmentsList[1].doctor}</Text>
          <Text style={styles.subheading}>{appointmentsList[1].doctorDes}</Text>
        </View>
        <View style={styles.arrContainer}>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color="#FFFFFF"
          />
        </View>
      </View>
      <Text style={styles.welcomeText}>Tomorrow</Text>
      <View style={styles.appointContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Wed</Text>
          <Text style={styles.date}>23</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.heading}>Your Appointment</Text>
          <Text style={styles.subheading}>{appointmentsList[2].time}</Text>
          <Text style={styles.heading}>{appointmentsList[2].doctor}</Text>
          <Text style={styles.subheading}>{appointmentsList[2].doctorDes}</Text>
        </View>
        <View style={styles.arrContainer}>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    height: windowHeight,
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
  arrContainer: {
    marginLeft: 78,
    paddingVertical: 35,
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
  welcomeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#33475B',
    marginTop: 10,
  },
});

export default AppointmentsScreen;

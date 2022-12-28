import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {postAppointmentAsync, STRIX_URL} from '../../store/services/services';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ConfirmSlotScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [daySelected, setDaySelected] = useState(0);
  const [dateSelected, setDateSelected] = useState('');
  const now = moment();
  const [timestamp, setTimestamp] = useState(now);
  const currDoc = useSelector(state => state.book.docSelectedObj);
  const userId = useSelector(state => state.user.userId);
  const name = useSelector(state => state.user.name);
  console.log('currDoc: ', currDoc);
  const docSelected = useSelector(state => state.chat.docSelected);
  console.log('docSelected: ', docSelected);
  const [slotsToRender, setSlotsToRender] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [slotSelected, setSlotSelected] = useState();
  const [availability2dMatrix, setAvailability2dMatrix] = useState([]);
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const slots = [
    '9:00AM',
    '10:00AM',
    '11:00AM',
    '12:00PM',
    '1:00PM',
    '2:00PM',
    '3:00PM',
    '4:00PM',
    '5:00PM',
    '6:00PM',
    '7:00PM',
    '8:00PM',
    '9:00PM',
    '10:00PM',
    '11:00PM',
  ];

  useEffect(() => {
    setAvailability2dMatrix(currDoc.availability);
  }, []);
  function getDates(startDate, daysToAdd) {
    let aryDates = [];
    for (var i = 0; i <= daysToAdd; i++) {
      var currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      aryDates.push({
        timestamp: currentDate,
        date: currentDate.getDate(),
        day: currentDate.getDay(),
      });
    }
    return aryDates;
  }

  function updateSlots(day, data) {
    console.log('data: ', data);
    console.log('day: ', day);
    setSlotsToRender(data[day]);
  }

  function updateAvailability(slotindex) {
    console.log('slotindex: ', slotindex);
    setSlotSelected(slotindex);
    setSelectedIndex(daySelected + ' ' + slotindex);
    console.log('selectedIndex: ', selectedIndex);
  }

  function confirmSlot() {
    let temp = availability2dMatrix;
    temp[daySelected][slotSelected] = true;
    console.log('temp: post', temp);
    axios
      .put(`${STRIX_URL}/api/doctors/availability/${docSelected}`, {
        availability: temp,
      })
      .then(function (response) {
        console.log('response: ', response);
        dispatch(
          postAppointmentAsync({
            from: userId,
            to: docSelected,
            fromName: name,
            time: now,
            acceptStatus: false,
            startStatus: false,
            appointmentType: 'advance',
            dispatch: dispatch,
          }),
        );
        navigation.navigate('SlotConfirmed', {
          timestamp: timestamp,
          slot: slots[slotSelected],
        });
      })
      .catch(function (error) {
        console.log('doctors/postDoctorsAvaialibility error', error);
      });
  }

  var startDate = new Date();
  let aryDates = getDates(startDate, 5);
  return (
    <View>
      <View style={[styles.datesList, styles.flexRow]}>
        {aryDates.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                setDaySelected(item.day);
                setDateSelected(item.date);
                console.log('item.timestamp: ', item.timestamp);
                setTimestamp(item.timestamp);
                console.log('item.date: ', item.date);
                console.log('item: ', item);
                updateSlots(item.day, currDoc.availability);
                setAvailability2dMatrix(currDoc.availability);
              }}
              style={
                item.date === dateSelected
                  ? styles.dateContainerActive
                  : styles.dateContainer
              }>
              <Text style={styles.dateDay}>{item.date}</Text>
              <Text style={styles.dateDay}>{day[item.day]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.rootContainer}>
        <Text style={styles.heading}>9AM-12PM</Text>
        <View style={styles.sessionList}>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(0);
            }}
            disabled={!currDoc.availability[daySelected][0]}
            style={
              currDoc.availability[daySelected][0]
                ? selectedIndex === daySelected + ' ' + 0
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][0]
                  ? selectedIndex === daySelected + ' ' + 0
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              {' '}
              9:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(1);
            }}
            disabled={!currDoc.availability[daySelected][1]}
            style={
              currDoc.availability[daySelected][1]
                ? selectedIndex === daySelected + ' ' + 1
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][1]
                  ? selectedIndex === daySelected + ' ' + 1
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              10:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(2);
            }}
            disabled={!currDoc.availability[daySelected][2]}
            style={
              currDoc.availability[daySelected][2]
                ? selectedIndex === daySelected + ' ' + 2
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][2]
                  ? selectedIndex === daySelected + ' ' + 2
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              11:00
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>12PM-3PM</Text>
        <View style={styles.sessionList}>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(3);
            }}
            disabled={!currDoc.availability[daySelected][3]}
            style={
              currDoc.availability[daySelected][3]
                ? selectedIndex === daySelected + ' ' + 3
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][3]
                  ? selectedIndex === daySelected + ' ' + 3
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              12:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(4);
            }}
            disabled={!currDoc.availability[daySelected][4]}
            style={
              currDoc.availability[daySelected][4]
                ? selectedIndex === daySelected + ' ' + 4
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][4]
                  ? selectedIndex === daySelected + ' ' + 4
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              1:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(5);
            }}
            disabled={!currDoc.availability[daySelected][5]}
            style={
              currDoc.availability[daySelected][5]
                ? selectedIndex === daySelected + ' ' + 5
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][5]
                  ? selectedIndex === daySelected + ' ' + 5
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              2:00
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>3PM-6PM</Text>
        <View style={styles.sessionList}>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(6);
            }}
            disabled={!currDoc.availability[daySelected][6]}
            style={
              currDoc.availability[daySelected][6]
                ? selectedIndex === daySelected + ' ' + 6
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][6]
                  ? selectedIndex === daySelected + ' ' + 6
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              3:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(7);
            }}
            disabled={!currDoc.availability[daySelected][7]}
            style={
              currDoc.availability[daySelected][7]
                ? selectedIndex === daySelected + ' ' + 7
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][7]
                  ? selectedIndex === daySelected + ' ' + 7
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              4:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(8);
            }}
            disabled={!currDoc.availability[daySelected][8]}
            style={
              currDoc.availability[daySelected][8]
                ? selectedIndex === daySelected + ' ' + 8
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][8]
                  ? selectedIndex === daySelected + ' ' + 8
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              5:00
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>6PM-9PM</Text>
        <View style={styles.sessionList}>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(9);
            }}
            disabled={!currDoc.availability[daySelected][9]}
            style={
              currDoc.availability[daySelected][9]
                ? selectedIndex === daySelected + ' ' + 9
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][9]
                  ? selectedIndex === daySelected + ' ' + 9
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              {' '}
              6:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(10);
            }}
            disabled={!currDoc.availability[daySelected][10]}
            style={
              currDoc.availability[daySelected][10]
                ? selectedIndex === daySelected + ' ' + 10
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][10]
                  ? selectedIndex === daySelected + ' ' + 10
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              7:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(11);
            }}
            disabled={!currDoc.availability[daySelected][11]}
            style={
              currDoc.availability[daySelected][11]
                ? selectedIndex === daySelected + ' ' + 11
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][11]
                  ? selectedIndex === daySelected + ' ' + 11
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              8:00
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>9PM-12AM</Text>
        <View style={styles.sessionList}>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(12);
            }}
            disabled={!currDoc.availability[daySelected][12]}
            style={
              currDoc.availability[daySelected][12]
                ? selectedIndex === daySelected + ' ' + 12
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][12]
                  ? selectedIndex === daySelected + ' ' + 12
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              9:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(13);
            }}
            disabled={!currDoc.availability[daySelected][13]}
            style={
              currDoc.availability[daySelected][13]
                ? selectedIndex === daySelected + ' ' + 13
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][13]
                  ? selectedIndex === daySelected + ' ' + 13
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              10:00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateAvailability(14);
            }}
            disabled={!currDoc.availability[daySelected][14]}
            style={
              currDoc.availability[daySelected][14]
                ? selectedIndex === daySelected + ' ' + 14
                  ? styles.timePillSelected
                  : styles.timePillActive
                : styles.timePill
            }>
            <Text
              style={
                currDoc.availability[daySelected][14]
                  ? selectedIndex === daySelected + ' ' + 14
                    ? styles.dateTextSelected
                    : styles.dateTextActive
                  : styles.dateText
              }>
              11:00
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => {
            confirmSlot();
          }}
          style={styles.btnOnboard}
          disabled={dateSelected === ''}>
          <Text style={styles.btnText}>Confirm Slot</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#5C6C7C',
    marginTop: 20,
  },
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    position: 'relative',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  datesList: {
    width: windowWidth,
    height: 120,
    backgroundColor: '#F5F8FA',
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  dateContainer: {
    backgroundColor: '#FFFFFF',
    width: 51,
    height: 80,
    borderRadius: 8,
    borderColor: '#E5E9F0',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dateContainerActive: {
    backgroundColor: '#FFFFFF',
    width: 51,
    height: 80,
    borderRadius: 8,
    borderColor: '#056AD0',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  timePill: {
    width: 88,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#E5E9F0',
    marginRight: 2,
  },
  timePillActive: {
    width: 88,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#69A6E3',
  },
  timePillSelected: {
    width: 88,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#056AD0',
    borderWidth: 1,
    borderColor: '#69A6E3',
  },
  dateDay: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#5C6C7C',
  },
  dateDayActive: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#5C6C7C',
  },
  dateText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#E5E9F0',
    marginTop: 2,
    textAlign: 'center',
  },
  dateTextActive: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#056AD0',
    marginTop: 2,
    textAlign: 'center',
  },
  dateTextSelected: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
    marginTop: 2,
    textAlign: 'center',
  },
  sessionList: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-around',
    width: '100%',
  },
  btnOnboard: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    width: '100%',
    marginTop: 40,
  },
});

export default ConfirmSlotScreen;

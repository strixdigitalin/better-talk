import React, {useState} from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Modal, Portal, Text, Button, TextInput} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import feedback from '../../assets/feedback.png';
import { useSelector, useDispatch } from 'react-redux';
import { postRatingAsync } from '../../store/services/services';
import { useImmerReducer } from 'use-immer';
import moment from 'moment';

export default function RateSessionScreen({navigation}) {
  const [visible, setVisible] = React.useState(true);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const name = useSelector(state => state.user.name);
  const docSelected = useSelector(state => state.chat.docSelected);
  const now = moment();
  const dispatch = useDispatch();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: '#FDFDFD',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 324,
    height: 403,
    marginLeft: "5%",
    justifyContent: "space-evenly",
    borderRadius: 16,
  };

  return (
    <>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Image source={feedback} style={styles.imgModal} />
        <Text style={styles.titleModal}>Rate Your Session</Text>
        <AirbnbRating
          count={5}
          defaultRating={0}
          showRating={false}
          size={14}
          ratingColor="#DE8B0E"
          onFinishRating={(rating)=>{
             console.log('rating: ', rating);
             setRating(rating); 
          }}
        />
        <TextInput
          mode="outlined"
          placeholder="Type in your feedback"
          value={text}
          onChangeText={text => setText(text)}
          multiline={true}
          numberOfLines={3}
          outlineColor="#CCD6E0"
          style={{
            backgroundColor: '#FBFBFB',
            marginTop: 10,
            color: '#85919D',
            fontFamily: 'Inter-Regular',
            fontSize: 12,
            padding: 0,
            width: "90%",
            borderRadius: 8,
          }}
        />
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => {
            dispatch(postRatingAsync({id: docSelected, rating: rating, from: name, date: now}))
            navigation.navigate('DoctorsList');
          }}
          style={styles.btnModal}>
          <Text style={styles.btnModalText}>Submit Feedback</Text>
        </Button>
        <TouchableOpacity style={styles.cancelModal}>
          <Text style={styles.cancelModalText} onPress={hideModal}>
            Gift a session
          </Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  imgModal: {
    width: 100,
    height: 100,
  },
  titleModal: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    lineHeight: 24,
    color: "#33475B",
  },
  btnModal: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    width: '90%',
    marginTop: 15,
  },
  btnModalText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: "white",
  },
  cancelModalText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: "Inter-Medium",
    lineHeight: 24,
    color: "#056AD0",
  },
  cancelModal: {
    textAlign: 'center',
    marginTop: 5,
  },
});

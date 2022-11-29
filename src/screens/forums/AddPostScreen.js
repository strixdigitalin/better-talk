import React, {useState, useEffect} from 'react';
import profileimage from '../../assets/profilepic.png';
import tripledot from '../../assets/Tripledot.png';
import {Button} from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  useColorScheme,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {postForumPostAsync} from '../../store/services/forumServices';
import moment from 'moment';

const windowHeight = Dimensions.get('window').height;

export default function AddPostScreen({navigation}) {
  const [text, setText] = React.useState('');
  const name = useSelector(state => state.user.name);
  const userId = useSelector(state => state.user.userId);  
  const dispatch = useDispatch();
  const now = moment();
  const addPost = () => {
    dispatch(
      postForumPostAsync({
        content: text,
        date: now,
        name: name,
        comments: [],
        likes: 0,
        userId: userId
      }),
    );
  };
  return (
    <View style={styles.rootCont}>
      <View style={styles.innerCont}>
        <View style={styles.header}>
          <Image source={profileimage} style={styles.image} />
          <Text style={styles.name}>{name}</Text>
          <Image source={tripledot} style={styles.tripledot} />
        </View>
        <TextInput
          placeholder="Type something here..."
          multiline={true}
          numberOfLines={5}
          style={styles.input}
          onChangeText={text => setText(text)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addPost();
          Alert.alert('Success!', 'Post Created Successfully', [
            {
              text: 'Close',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Go To Posts', onPress: () => {navigation.goBack();}},
          ]);
        }}>
        <Text style={styles.buttontext}>Post Forum</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  rootCont: {
    backgroundColor: '#FDFDFD',
    height: windowHeight,
    paddingHorizontal: 20,
    position: 'relative',
  },
  innerCont: {
    marginTop: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 32,
    position: 'relative',
  },
  image: {
    width: 32,
    height: 32,
    backgroundColor: '#C4C4C4',
    borderWidth: 1,
    borderColor: '#E5E9F0',
    borderRadius: 8,
  },
  name: {
    width: 73,
    height: 28,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 28,
    color: '#33475B',
    order: 1,
    flexGrow: 0,
    marginLeft: 10,
  },
  time: {
    marginTop: 1,
    fontSize: 12,
  },
  tripledot: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontWeight: 'bold',
    width: 24,
    height: 24,
  },
  input: {
    width: 327,
    // boxSizing: 'border-box',
    // marginHorizontal: 24,
    // marginVertical: 16,
    fontFamily: 'Inter-Regular',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 28,
    color: '#85919D',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: 'absolute',
    bottom: 100,
    left: 20,
    width: '100%',
    height: 46,
    backgroundColor: '#323F4D',
    borderRadius: 8,
  },
  buttontext: {
    width: 177,
    height: 18,
    fontFamily: 'Inter-Bold',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: '#FBFAFC',
  },
});

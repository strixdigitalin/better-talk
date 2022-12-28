import React, {useState, useEffect} from 'react';
import profileimage from '../../assets/profilepic.png';
import like from '../../assets/Like.png';
import comment from '../../assets/Comment.png';
import tripledot from '../../assets/Tripledot.png';
import vector from '../../assets/Vector.png';
import comments from '../../assets/Comments.png';
import fluentcomment from '../../assets/fluentcomment.png';
import emoji from '../../assets/emoji.png';
import Group from '../../assets/Group.png';
import media from '../../assets/media.png';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  useColorScheme,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Divider} from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {
  getForumPostsAsync,
  updatePostLikesAsync,
  postCommentAsync,
} from '../../store/services/forumServices';
import {postNotificationAsync} from '../../store/services/notificationservices';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function PostListScreen({navigation}) {
  const [text, setText] = useState('');
  const [toggle, setToggle] = useState(false);
  const name = useSelector(state => state.user.name);
  const userId = useSelector(state => state.user.userId);
  const [comments, setComments] = useState([]);
  const [postSelectedId, setPostSelectedId] = useState('');
  const [postSelectedUserId, setPostSelectedUserId] = useState('');
  const [comment, setComment] = useState('');
  const [data, setData] = useState();
  const now = moment();
  const posts = useSelector(state => state.forum.posts);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForumPostsAsync({dispatch: dispatch}));
  }, [toggle, useDispatch]);

  const sendMsgHandler = id => {
    console.log('comment: ', comment);
    dispatch(
      postCommentAsync({
        name: name,
        content: comment,
        id: postSelectedId,
      }),
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.renderItem}>
      <Divider />
      <View style={styles.innerRender}>
        <View style={styles.header}>
          <Image source={profileimage} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
          <Image source={tripledot} style={styles.tripledot} />
        </View>
        <Text style={styles.description}>{item.content}</Text>
        <View style={styles.footer}>
          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row'}}
            onPress={() => {
              dispatch(updatePostLikesAsync(item._id));
              setToggle(!toggle);
            }}>
            <AntDesign
              name="like2"
              size={20}
              color="#7C98B6"
              style={{marginLeft: 5}}
            />
            <Text style={styles.likes}>{item.likes}&nbsp;likes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row'}}
            onPress={() => {
              setModalVisible(true);
              setComments(item.comments);
              setPostSelectedId(item._id);
              setPostSelectedUserId(userId);
            }}>
            <Image source={comment} size={20} style={styles.comment} />
            <Text style={{marginLeft: 10}}>
              {item.comments.length}&nbsp;comments
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    dispatch(getForumPostsAsync({dispatch: dispatch}));
  }, []);
  return (
    <View style={styles.rootCont}>
      <Text style={styles.subTitle}>Hope you are doing well today</Text>
      <View>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          scrollEnabled={true}
        />
      </View>
      <TouchableOpacity
        style={styles.addPost}
        onPress={() => {
          navigation.navigate('AddPost');
        }}>
        <Image source={fluentcomment} style={styles.imgAdd} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
        onBackButtonPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.modalStyle}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Comments</Text>
            <ScrollView style={styles.scrollComments}>
              {comments.map(item => {
                return (
                  <View style={styles.innerRender2} key={item._id}>
                    <View style={styles.header}>
                      <Image source={profileimage} style={styles.image} />
                      <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View>
                      <Text style={styles.description}>{item.content}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TouchableOpacity>
                <Feather name="smile" size={20} color="#7C98B6" />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                color="#7C98B6"
                value={comment}
                placeholder="Write a message..."
                onChangeText={text => {
                  setComment(text);
                }}
              />
              <TouchableOpacity>
                <Ionicon name="attach" size={20} color="#7C98B6" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendMsgHandler();
                  setComment('');
                  dispatch(
                    postNotificationAsync({
                      to: postSelectedUserId,
                      content: ' ',
                      type: 'comment',
                      date: now,
                    }),
                  );
                  setToggle(!toggle);
                }}>
                <Ionicon
                  name="send"
                  size={20}
                  color="#7C98B6"
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  rootCont: {
    backgroundColor: '#FDFDFD',
    height: windowHeight,
    position: 'relative',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    gap: 8,
    width: 163,
    height: 32,
  },
  subTitle: {
    fontFamily: 'Inter-Normal',
    fontSize: 14,
    lineHeight: 24,
    color: '#85919D',
    marginBottom: 10,
    marginLeft: 15,
  },
  image: {
    marginHorizontal: 12,
    width: 32,
    height: 32,
    backgroundColor: '#C4C4C4',
    borderWidth: 1,
    borderColor: '#E5E9F0',
    borderRadius: 8,
    order: 0,
    flexGrow: 0,
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
  },
  time: {
    fontSize: 12,
  },
  tripledot: {
    marginLeft: 150,
    fontWeight: 'bold',
    width: 24,
    height: 24,
  },
  description: {
    width: 327,
    flex: 1,
    marginVertical: 16,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 28,
    marginLeft: 24,
    color: '#5C6C7C',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 28,
    width: 217,
    height: 24,
    marginHorizontal: 24,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F5F8FA',
    height: 48,
    alignItems: 'center',
    width: '95%',
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#E5E9F0',
  },
  input: {
    backgroundColor: '#F5F8FA',
    width: '75%',
    marginLeft: 5,
  },
  likes: {
    width: 55,
    height: 24,
    fontFamily: 'Inter-Regular',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 24,
    marginLeft: 10,
    marginRight: 28,
    color: '#5C6C7C',
    order: 1,
    flexGrow: 0,
  },
  comment: {
    marginLeft: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#5C6C7C',
    order: 1,
    flexGrow: 0,
  },
  modalStyle: {
    position: 'absolute',
    bottom: -18,
    left: -18,
    justifyContent: 'flex-end',
    width: '100%',
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    height: '100%',
  },
  modalHeader: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
  },
  renderItem: {
    backgroundColor: '#FDFDFD',
    marginBottom: 10,
  },
  innerRender: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  innerRender2: {
    paddingHorizontal: 2,
    marginTop: 15,
  },
  scrollComments: {
    marginLeft: -15,
  },
  addPost: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#056AD0',
    padding: 16,
    position: 'absolute',
    right: 10,
    bottom: 150,
  },
});

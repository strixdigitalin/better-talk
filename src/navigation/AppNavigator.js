import React, {useState, useEffect, useMemo} from 'react';
import {View, Text} from 'react-native';
import io from 'socket.io-client';
import {
  NavigationContainer,
  useNavigation,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyChatsScreen from '../screens/MyChatsScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import DoctorsListScreen from '../screens/booksession/DoctorsListScreen';
import AppointmentsScreen from '../screens/booksession/AppointmentsScreen';
import LoginScreen from '../screens/login/LoginScreen';
import SignupScreen from '../screens/login/SignupScreen';
import LoginOtpScreen from '../screens/login/LoginOtpScreen';
import SignupOtpScreen from '../screens/login/SignupOtpScreen';
import SplashLoadScreen from '../screens/login/SplashLoadScreen';
import OnboardingNameScreen from '../screens/onboarding/OnboardingNameScreen';
import OnboardingLandingScreen from '../screens/onboarding/OnboardingLandingScreen';
import OnboardingMedicalScreen from '../screens/onboarding/OnboardingMedicalScreen';
import OnboardingMoreScreen from '../screens/onboarding/OnboardingMoreScreen';
import OnboardingAboutScreen from '../screens/onboarding/OnboardingAboutScreen';
import AppointmentFailScreen from '../screens/booksession/AppointmentFailScreen';
import ChooseAppointmentScreen from '../screens/booksession/ChooseAppointmentScreen';
import ConfirmSlotScreen from '../screens/booksession/ConfirmSlotScreen';
import DoctorDetailsScreen from '../screens/booksession/DoctorDetailsScreen';
import StartAppointmentScreen from '../screens/booksession/StartAppointmentScreen';
import AppointmentWaitingScreen from '../screens/booksession/AppointmentWaitingScreen';
import AvailableDoctorsScreen from '../screens/booksession/AvailableDoctorsScreen';
import SlotConfirmedScreen from '../screens/booksession/SlotConfirmedScreen';
import RateSessionScreen from '../screens/chat/RateSessionScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import GenDetailsScreen from '../screens/settings/GenDetailsScreen';
import ProfDetailsScreen from '../screens/settings/ProfDetailsScreen';
import MedDetailsScreen from '../screens/settings/MedDetailsScreen';
import GiftFriendScreen from '../screens/settings/GiftFriendScreen';
import VoiceCallScreen from '../screens/chat/VoiceCallScreen';
import VideoCallScreen from '../screens/chat/VideoCallScreen';
import BalanceLowModal from '../screens/chat/BalanceLowModal';
import PayScreen from '../screens/pay/PayScreen';
import PostsListScreen from '../screens/forums/PostsListScreen';
import AddPostScreen from '../screens/forums/AddPostScreen';
import BackButton from '../components/BackButton';
import HelpButton from '../components/HelpButton';
import {Button, Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useCountdown} from '../hooks/useCountdown';
import {useTimer} from 'react-timer-hook';
import {useStopWatch} from '../hooks/useStopWatch';
import {setMinsRem, setMode} from '../store/reducers/chatReducer';
import {
  setAvailMin,
  setAvailSessions,
  setBalance,
} from '../store/reducers/payReducer';
import moment from 'moment';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function StopWatch() {
  const [firstLoad, setFirstLoad] = useState(null);
  const [days, hours, minutes, seconds] = useStopWatch(firstLoad);
  const availMin = useSelector(state => state.pay.availMin);

  useEffect(() => {
    console.log('stopwatch start');
    const temp = new Date();
    setFirstLoad(temp);
  }, []);

  return (
    <Text
      style={{
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        lineHeight: 12,
        color: '#85919D',
      }}>
      Running Time-
      <Text
        style={{
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          lineHeight: 24,
          color: '#33475B',
        }}>
        {minutes}:{String(seconds).padStart(2, '0')}
      </Text>
    </Text>
  );
}

const HeaderTitleChat = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.book.doctorEnquired);
  const sessionEnd = useSelector(state => state.chat.sessionEnd);
  //console.log('sessionEnd: in HeaderTitleChat ', sessionEnd);
  const sessionType = useSelector(state => state.pay.sessionType);
  //console.log('sessionType: ', sessionType);
  const [days, hours, minutes, seconds] = useCountdown(sessionEnd);
  const availMin = useSelector(state => state.pay.availMin);
  const availSessions = useSelector(state => state.pay.availSessions);
  const chatOngoing = useSelector(state => state.chat.chatOngoing);
  useEffect(() => {
    return () => {
      console.log('minutesrem: in app navigator', minutes);
      dispatch(setMinsRem(minutes));
    };
  }, [minutes]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Inter-Medium',
          fontSize: 18,
          lineHeight: 26,
          color: '#33475B',
        }}>
        {name}
      </Text>
      {/* <Text
        style={{
          fontFamily: 'Inter-Regular',
          fontSize: 12,
          lineHeight: 12,
          color: '#85919D',
        }}>
        Running Time-
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: 12,
            lineHeight: 24,
            color: '#33475B',
          }}>
          {minutes}:{String(seconds).padStart(2, '0')}
        </Text>
      </Text> */}
      {sessionType === 'permins' && !chatOngoing ? (
        <StopWatch />
      ) : (
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 12,
            lineHeight: 12,
            color: '#85919D',
          }}>
          Running Time-
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: 12,
              lineHeight: 24,
              color: '#33475B',
            }}>
            {minutes}:{String(seconds).padStart(2, '0')}
          </Text>
        </Text>
      )}
    </View>
  );
};

const HeaderTitleVoice = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.book.doctorEnquired);
  const sessionEnd = useSelector(state => state.chat.sessionEnd);
  //console.log('sessionEnd: in HeaderTitleChat ', sessionEnd);
  const sessionType = useSelector(state => state.pay.sessionType);
  //console.log('sessionType: ', sessionType);
  const [days, hours, minutes, seconds] = useCountdown(sessionEnd);
  const availMin = useSelector(state => state.pay.availMin);
  const availSessions = useSelector(state => state.pay.availSessions);
  const chatOngoing = useSelector(state => state.chat.chatOngoing);
  useEffect(() => {
    return () => {
      console.log('minutesrem: in app navigator', minutes);
      dispatch(setMinsRem(minutes));
    };
  }, [minutes]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Inter-Medium',
          fontSize: 18,
          lineHeight: 26,
          color: '#33475B',
        }}>
        {name}
      </Text>
      {sessionType === 'permins' && !chatOngoing ? (
        <StopWatch />
      ) : (
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 12,
            lineHeight: 12,
            color: '#85919D',
          }}>
          Running Time-
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: 12,
              lineHeight: 24,
              color: '#33475B',
            }}>
            {minutes}:{String(seconds).padStart(2, '0')}
          </Text>
        </Text>
      )}
    </View>
  );
};

function HomeNavigator({navigation}) {
  const name = useSelector(state => state.user.name);
  const qty = useSelector(state => state.notification.quantity);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DoctorsList"
        component={DoctorsListScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Hello&nbsp;
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: 18,
                    lineHeight: 26,
                    color: '#056AD0',
                  }}>
                  {name}
                </Text>
                !
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 20,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <View style={{position: 'relative'}}>
                <Icon
                  name="notifications"
                  size={24}
                  onPress={() => {
                    navigation.navigate('Notifications');
                  }}
                />
                <Badge
                  visible={qty !== 0}
                  style={{
                    position: 'absolute',
                    top: -7,
                    left: 10,
                    backgroundColor: '#00BDA5',
                  }}>
                  {qty}
                </Badge>
              </View>
              <Icon name="chatbox-ellipses-outline" size={24} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MyChatsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <HeaderLeft />,
      }}>
      <Stack.Screen name="MyChats" component={MyChatsScreen} />
    </Stack.Navigator>
  );
}

function PayNavigator({navigation}) {
  const name = useSelector(state => state.user.name);
  const qty = useSelector(state => state.notification.quantity);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pay"
        component={PayScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Hello
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: 18,
                    lineHeight: 26,
                    color: '#056AD0',
                  }}>
                  {name}
                </Text>
                !
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 20,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <View style={{position: 'relative'}}>
                <Icon
                  name="notifications"
                  size={24}
                  onPress={() => {
                    navigation.navigate('Notifications');
                  }}
                />
                <Badge
                  visible={qty !== 0}
                  style={{
                    position: 'absolute',
                    top: -7,
                    left: 10,
                    backgroundColor: '#00BDA5',
                  }}>
                  {qty}
                </Badge>
              </View>
              <Icon name="chatbox-ellipses-outline" size={24} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ForumsNavigator() {
  const name = useSelector(state => state.user.name);
  const qty = useSelector(state => state.notification.quantity);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsList"
        component={PostsListScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Hello
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: 18,
                    lineHeight: 26,
                    color: '#056AD0',
                  }}>
                  {name}
                </Text>
                !
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 20,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <View style={{position: 'relative'}}>
                <Icon
                  name="notifications"
                  size={24}
                  onPress={() => {
                    navigation.navigate('Notifications');
                  }}
                />
                <Badge
                  visible={qty !== 0}
                  style={{
                    position: 'absolute',
                    top: -7,
                    left: 10,
                    backgroundColor: '#00BDA5',
                  }}>
                  {qty}
                </Badge>
              </View>
              <Icon name="chatbox-ellipses-outline" size={24} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function TabsNavigator({route}) {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#056AD0',
        tabBarInactiveTintColor: '#28323E',
      }}>
      <Tabs.Screen
        name="MyHome"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={focused ? '#056AD0' : '#28323E'}
            />
          ),
        }}
        component={HomeNavigator}
      />
      <Tabs.Screen
        name="Packs"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="card"
              // name="inventory"
              size={24}
              color={focused ? '#056AD0' : '#28323E'}
            />
          ),
        }}
        component={PayNavigator}
      />
      <Tabs.Screen
        name="Forums"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="groups"
              size={24}
              color={focused ? '#056AD0' : '#28323E'}
            />
          ),
        }}
        component={ForumsNavigator}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="settings"
              size={24}
              color={focused ? '#056AD0' : '#28323E'}
            />
          ),
        }}
        component={SettingsNavigator}
      />
    </Tabs.Navigator>
  );
}

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Better Talk" component={TabsNavigator} />
//       <Drawer.Screen name="My Chats" component={MyChatsNavigator} />
//     </Drawer.Navigator>
//   );
// }

function MainApp({navigation}) {
  const name = useSelector(state => state.book.doctorEnquired);
  const qty = useSelector(state => state.notification.quantity);
  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.userId);
  const appointmentId = useSelector(state => state.chat.appointmentId);
  
  const socket = io('https://socketrahilbe.herokuapp.com/', {
    query: {userId: userId, appointmentId: appointmentId},
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });



  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabsNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Upcoming Appointments(2)
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="DoctorDetails"
        component={DoctorDetailsScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ChooseAppointment"
        component={ChooseAppointmentScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Book a session
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ConfirmSlot"
        component={ConfirmSlotScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Book a session
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AppointmentWaiting"
        component={AppointmentWaitingScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                {name}
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 30,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <MaterialCommunityIcons
                name="video"
                size={24}
                color="#056AD0"
                onPress={() => {}}
              />
              <Icon name="call" size={24} color="#056AD0" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="StartAppointment"
        component={StartAppointmentScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                {name}
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 30,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <MaterialCommunityIcons
                name="video"
                size={24}
                color="#056AD0"
                onPress={() => {}}
              />
              <Icon name="call" size={24} color="#056AD0" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ChatDoctor"
        component={ChatScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => <HeaderTitleChat />,
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 30,
                width: 110,
                justifyContent: 'space-between',
              }}>
              <MaterialIcons
                name="call-end"
                size={24}
                color={'#990b19'}
                onPress={() => {
                  socket.emit('disconnect', {
                    status: true,
                    from: 456,
                    to: 123,
                    id: 123,
                  });
                  navigation.navigate('RateSession');
                }}
              />
              <MaterialCommunityIcons
                name="video"
                size={24}
                color="#056AD0"
                onPress={() => {
                  dispatch(setMode('video'));
                  //navigation.navigate('VideoCall');
                }}
              />
              <Icon
                name="call"
                size={24}
                color="#056AD0"
                onPress={() => {
                  dispatch(setMode('audio'));
                  //navigation.navigate('VoiceCall');
                }}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="VoiceCall"
        component={VoiceCallScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoCall"
        component={VideoCallScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RateSession"
        component={RateSessionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Notifications
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AppointmentFail"
        component={AppointmentFailScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                {name}
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 30,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <MaterialCommunityIcons
                name="video"
                size={24}
                color="#056AD0"
                onPress={() => {}}
              />
              <Icon name="call" size={24} color="#056AD0" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AvailableDoctors"
        component={AvailableDoctorsScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Available Doctors
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="SlotConfirmed"
        component={SlotConfirmedScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BalanceLow"
        component={BalanceLowModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pay"
        component={PayScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Hello
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: 18,
                    lineHeight: 26,
                    color: '#056AD0',
                  }}>
                  {name}
                </Text>
                !
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 20,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <View style={{position: 'relative'}}>
                <Icon
                  name="notifications"
                  size={24}
                  onPress={() => {
                    navigation.navigate('Notifications');
                  }}
                />
                <Badge
                  visible={qty !== 0}
                  style={{
                    position: 'absolute',
                    top: -7,
                    left: 10,
                    backgroundColor: '#00BDA5',
                  }}>
                  {qty}
                </Badge>
              </View>
              <Icon name="chatbox-ellipses-outline" size={24} />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ProfDetails"
        component={ProfDetailsScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Professional Details
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MedDetails"
        component={MedDetailsScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Medical Details
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GenDetails"
        component={GenDetailsScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                General Details
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                New Post
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const name = useSelector(state => state.book.doctorEnquired);
  const qty = useSelector(state => state.notification.quantity);
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardShadowEnabled: false,
          cardOverlayEnabled: false,
          animationEnabled: false,
        }}>
        {isLoggedIn ? (
          <Stack.Screen
            name="mainApp"
            component={MainApp}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Splash"
              component={SplashLoadScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LoginOtp"
              component={LoginOtpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignupOtp"
              component={SignupOtpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OnboardingName"
              component={OnboardingNameScreen}
              options={{
                headerLeft: () => <BackButton />,
                headerTitle: 'Better Talk',
                headerRight: () => <HelpButton />,
              }}
            />
            <Stack.Screen
              name="OnboardingLanding"
              component={OnboardingLandingScreen}
              options={{
                headerLeft: () => <BackButton />,
                headerTitle: 'Better Talk',
                headerRight: () => <HelpButton />,
              }}
            />
            <Stack.Screen
              name="OnboardingAbout"
              component={OnboardingAboutScreen}
              options={{
                headerLeft: () => <BackButton />,
                headerTitle: 'Better Talk',
                headerRight: () => <HelpButton />,
              }}
            />

            <Stack.Screen
              name="OnboardingMore"
              component={OnboardingMoreScreen}
              options={{
                headerLeft: () => <BackButton />,
                headerTitle: 'Better Talk',
                headerRight: () => <HelpButton />,
              }}
            />
            <Stack.Screen
              name="OnboardingMedical"
              component={OnboardingMedicalScreen}
              options={{
                headerLeft: () => <BackButton />,
                headerTitle: 'Better Talk',
                headerRight: () => <HelpButton />,
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

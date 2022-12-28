import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {AirbnbRating} from 'react-native-ratings';
import prime from '../assets/prime.png';
import trio from '../assets/trio.png';
import quinary from '../assets/quinary.png';
import {FlipInEasyX} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setSessionType, setAvailSessions} from '../store/reducers/payReducer';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import {STRIX_URL} from '../store/services/services';

const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const windowHeight = Dimensions.get('window').height;

const PaySessionCarousel = ({
  navigation,
  setModalVisible,
  setAmount,
  setOrderId,
  setSessions,
  setActive,
}) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const dispatch = useDispatch();

  const data = [
    {
      title: 'Prime Pack',
      sessions: 1,
      mins: 60,
      price: 1200,
      imgUrl: prime,
    },
    {
      title: 'Trio Pack',
      sessions: 3,
      mins: 180,
      price: 3600,
      imgUrl: trio,
    },
    {
      title: 'Quinary Pack',
      sessions: 5,
      mins: 300,
      price: 6000,
      imgUrl: quinary,
    },
  ];

  const CarouselCardItem = ({item, index}) => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#E6F2FF', '#FBFAFC', '#FFFFFF']}
        style={styles.linearGradient}
        key={index}>
        <View style={styles.packContainer}>
          <Image source={item.imgUrl} style={styles.image} />
          <Text style={styles.header}>{item.title}</Text>
        </View>
        <Text style={styles.price}>
          {'\u20B9'}
          {item.price} per session
        </Text>
        <Text style={styles.body}>
          Prime pack gives a user&nbsp;
          <Text style={styles.boldText}>{item.sessions}</Text> sessions/
          <Text style={styles.boldText}>{item.mins}</Text>&nbsp;mins of
          session/appointment time.
        </Text>
        <Button
          mode="contained"
          uppercase={false}
          onPress={async () => {
            setModalVisible(true);
            setAmount(item.price);
            setSessions(item.sessions);
            dispatch(setSessionType('persession'));
            try {
              const result = await axios.post(
                STRIX_URL + '/api/razorpay/createOrder',
                {
                  amount: (item.price + (item.price / 100) * 18) * 100,
                },
              );
              console.log(result.data);
              const {amount, id, currency} = result.data;
              setOrderId(id);
            } catch (err) {
              alert(err);
            }
          }}
          style={styles.btnCarousel}>
          <Text style={styles.btnCarouselText}>Buy Now</Text>
        </Button>
      </LinearGradient>
    );
  };
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        layout="default"
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onBeforeSnapToItem={slideIndex => {
          setActiveSlide(slideIndex);
          setActive(slideIndex);
        }}
        firstItem={1}
        activeSlideAlignment="start"
        activeSlideOffset={10}
      />
      <Pagination
        dotsLength={3}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#69A6E3',
        }}
        inactiveDotStyle={{
          backgroundColor: '#99ACC2',
        }}
        animatedDuration={100}
        containerStyle={{marginTop: -15}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: 320,
    marginTop: 20,
  },
  linearGradient: {
    height: 216,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E9F0',
  },
  outerContainer: {
    marginTop: 10,
    height: 216,
    width: 294,
    borderRadius: 12,
  },
  packContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  header: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 28,
    color: '#5C6C7C',
    marginLeft: 5,
    marginTop: -2,
  },
  price: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#056AD0',
  },
  boldText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 28,
    color: '#33475B',
  },
  image: {
    width: 20,
    height: 20,
  },
  body: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 28,
    color: '#5C6C7C',
  },
  btnCarousel: {
    marginTop: 20,
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    width: '100%',
  },
  btnCarouselText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default PaySessionCarousel;

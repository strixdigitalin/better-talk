import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {AirbnbRating} from 'react-native-ratings';
import rachel from '../assets/rachel.webp';
import quote from '../assets/quote.webp';
import { FlipInEasyX } from 'react-native-reanimated';

const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);


const LandingCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const data = [
    {
      title: 'Rachel Green',
      body: `"A life support when I didnt know where to turn and helped when needed it."`,
      imgUrl: rachel,
    },
    {
      title: 'Rachel Green',
      body: `"A life support when I didnt know where to turn and helped when needed it."`,
      imgUrl: rachel,
    },
    {
      title: 'Lorem Ipsum',
      body: `"A life support when I didnt know where to turn and helped when needed it."`,
      imgUrl: rachel,
    },
  ];

  const CarouselCardItem = ({item, index}) => {
    return (
      <View style={styles.outerContainer}>
        <Image source={quote} style={styles.imageQuote} />
        <View style={styles.innerContainer} key={index}>
          <Image source={item.imgUrl} style={styles.image} />
          <View style={styles.contentContainer}>
            <Text style={styles.header}>{item.title}</Text>
            <AirbnbRating
              count={5}
              defaultRating={5}
              showRating={false}
              size={14}
              isDisabled={true}
              ratingColor="#DE8B0E"
            />
            <Text style={styles.body}>{item.body}</Text>
          </View>
        </View>
      </View>
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
        onBeforeSnapToItem={(slideIndex)=>{setActiveSlide(slideIndex)}}	
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
        inactiveDotStyle={
          {
            backgroundColor: '#99ACC2',
          }
        }
        animatedDuration={100}
        containerStyle={{marginTop: -15}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: 320,
    marginTop: 10,
  },
  outerContainer: {
    marginTop: 10,
    height: 240,
    paddingTop: 40,
    position: 'relative',
  },
  imageQuote: {
    position: 'absolute',
    left: 30,
    top: 20,
    zIndex: 3,
  },
  innerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 327,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    paddingHorizontal: 10,
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    left: 5,
    zIndex: 1,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 50,
    top: -30,
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Inter-Medium',
    color: '#5C6C7C',
    fontSize: 16,
  },
  body: {
    marginTop: 10,
    fontFamily: 'Inter-Medium',
    color: '#33475B',
    fontSize: 14,
    lineHeight: 28,
  },
});

export default LandingCarousel;

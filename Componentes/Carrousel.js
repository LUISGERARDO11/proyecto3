import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Image, Dimensions } from 'react-native';
import { estilos } from './Estilos';

const Carrousel = () => {
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carrouselData.length - 1) {
        flatListRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
        setActiveIndex(0);
      } else {
        flatListRef.current.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const carrouselData = [
    {
      id: '01',
      image: require('../assets/srcImagesHome/aspiradoraHome1.jpg'),
    },
    {
      id: '02',
      image: require('../assets/srcImagesHome/aspiradoraHome2.jpg'),
    },
    {
      id: '03',
      image: require('../assets/srcImagesHome/aspiradoraHome3.jpg'),
    },
  ];

  const renderItem = ({ item, index }) => {
    return <Image source={item.image} style={{ height: 200, width: screenWidth }} />;
  };

  const getItemLayout = (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screenWidth); // Redondear hacia abajo al número entero más cercano
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return carrouselData.map((dot, index) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#FF6600',
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          />
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#043464',
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          />
        );
      }
    });
  };

  return (
    <View>
      <FlatList
        data={carrouselData}
        ref={flatListRef}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Carrousel;
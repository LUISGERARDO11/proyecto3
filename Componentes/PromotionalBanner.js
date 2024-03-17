import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const PromotionalBanner = ({ imageUrl, title, description, onPress }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Animated.Image source={imageUrl} style={[styles.image, { opacity: fadeAnim }]} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Animated.Text style={[styles.description, { opacity: fadeAnim, marginTop: 5 }]}>{description}</Animated.Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 3, // Adjust this value to control the aspect ratio of the image
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
});

export default PromotionalBanner;

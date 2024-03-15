import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { estilos } from './Estilos'
import {Dimensions, StyleSheet} from 'react-native';
import Carrousel from './Carrousel';
import Footer from './Footer';

const Home = () => {
  return (
    <ScrollView style={estilos.container}>
      <SafeAreaView>
        <Carrousel/>
      </SafeAreaView>
      <Footer/>
    </ScrollView>
  )
}

export default Home;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});

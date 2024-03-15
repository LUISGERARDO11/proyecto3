import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { estilos } from './Estilos';
import { Dimensions, StyleSheet } from 'react-native';
import Carrousel from './Carrousel';
import Footer from './Footer';


const Home = () => {
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { nombre_completo } = JSON.parse(userData); // Suponiendo que el nombre del usuario está almacenado como 'nombre'
          setUserName(nombre_completo);
        }
      } catch (error) {
        console.error('Error al recuperar los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.bigTextTitle}>¡Hola, {userName}!</Text>
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

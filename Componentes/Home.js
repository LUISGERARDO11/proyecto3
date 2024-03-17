import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { estilos } from './Estilos';
import { Dimensions, StyleSheet } from 'react-native';
import Carrousel from './Carrousel';
import Footer from './Footer';
import CardHome from './CardHome';
import SocialMediaLinks from './SocialMediLinks';
import PromotionalBanner from './PromotionalBanner';
import ProductList from './ProductListFirs';
import { AppStack } from './Navegacion';



const Home = () => {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  const handleProductPress = () => {
    navigation.navigate('ProductDetail'); // Navega a ProductDetail cuando se presiona un producto
  };
  
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
      
      <SafeAreaView style={{paddingBottom:15}}>
        <Carrousel/>
      </SafeAreaView>
      <PromotionalBanner style={{paddingBottom:35}}
        imageUrl={require('../assets/srcImagesHome/banner.png')}
        title="¡Gran oferta!"
        description="Obtén un descuento del 20% en tu próxima compra."
      />
      <ProductList onProductPress={handleProductPress} label={"Novedades"} url={"https://apismartsweepers.vercel.app/api/productos/ultimos"} />
      <ProductList onProductPress={handleProductPress} label={"También puede interesarte"} url={"https://apismartsweepers.vercel.app/api/productos/primeros"} />
      <Text style={styles.textSubtitle}>Nuestros clientes</Text>
      <CardHome
          nombre="Juan Rodriguez" 
          foto="https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2598&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          descripcion='"¡Increíblemente eficiente! La aspiradora ha transformado la forma en que limpio mi hogar. Su capacidad para limpiar sin problemas es asombrosa"'
      />
      <CardHome
          nombre="Maria Perez" 
          foto="https://images.unsplash.com/photo-1526449870103-234e4c371681?q=80&w=1707&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          descripcion='"¡Increíblemente eficiente! La aspiradora ha transformado la forma en que limpio mi hogar. Su capacidad para limpiar sin problemas es asombrosa"'
      />
      <CardHome
          nombre="Alberto Herrera" 
          foto="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D"
          descripcion='"¡Increíblemente eficiente! La aspiradora ha transformado la forma en que limpio mi hogar. Su capacidad para limpiar sin problemas es asombrosa"'
      />

      <SocialMediaLinks/>
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
  textSubtitle:{
    fontSize:20,
    fontWeight:'bold',
    paddingBottom:10,
    paddingTop:20,
    marginHorizontal: 10,
  }
});

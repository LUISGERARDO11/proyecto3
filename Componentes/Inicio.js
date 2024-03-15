import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import productImage from '../assets/play.png'; // Importa la imagen

export default function Inicio() {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={[styles.productName, {textAlign: 'center'}]}>Escaneando</Text>
        <Text style={[styles.productName, {textAlign: 'center'}]}>el estilo y la</Text>
        <Text style={[styles.productName, {textAlign: 'center'}]}>salud</Text>
        <Text style={[styles.productDescription, {textAlign: 'center'}]}>¡El hogar de las plateras deportivas mas modernas! 
        Diseñadas con estilo y
        comodidad en mente, para que puedas
        lucir y sentirte en tu mejor forma
        mientras practicas deporte.</Text>
      </View>
      
      <Image
        style={styles.productImage}
        source={productImage} // Usa la imagen importada
      />
      <View style={styles.buyButtonContainer}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  productImage: {
    width: 400,
    height: 400,
    marginTop: 50,
  },
  detailsContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto-Italic',
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 10,
    width:300,
  },
  buyButtonContainer: {
    width: '200%',
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#F4C430',
    width: '200%',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    padding: 125,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
  },
  videoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  video: {
    width: 300,
    height: 200,
  },
});
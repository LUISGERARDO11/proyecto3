import {  Pressable, StyleSheet, Text, Alert, TextInput, View, TouchableOpacity,Modal } from 'react-native';
import { estilos } from './Estilos';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';


export const DireccionProfile = ({calle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Información de Dirección</Text>
      {/* Agrega aquí la información de la dirección */}
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 20,
    },
    text: {
      fontSize: 24,
      marginBottom: 10,
    },
    buttonContainer: {
      marginTop: 20,
      width: '100%',
    },
  });
  

  
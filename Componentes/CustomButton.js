import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomButton = ({ icon, textLeft, textRight, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FontAwesome name={icon} size={24} color="black" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{textLeft}</Text>
        <Text style={[styles.text, styles.textRight]}>{textRight}</Text>
      </View>
      <FontAwesome name="angle-right" size={24} color="#777" style={styles.iconRight} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    height: '21%',
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 'auto', // Para que el icono se alinee a la derecha
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textRight: {
    color: '#777',
  },
});

export default CustomButton;

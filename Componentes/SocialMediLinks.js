import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa los iconos de Ionicons (necesitas instalarlo)

const SocialMediaLinks = () => {
  return (
    <View style={styles.container}>
      {/* Enlaces a las redes sociales */}
      <TouchableOpacity onPress={() => {/* Maneja el evento de presionar Facebook */}}>
        <Ionicons name="logo-facebook" size={32} color="#3b5998" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {/* Maneja el evento de presionar Twitter */}}>
        <Ionicons name="logo-twitter" size={32} color="#1da1f2" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {/* Maneja el evento de presionar Instagram */}}>
        <Ionicons name="logo-instagram" size={32} color="#c13584" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {/* Maneja el evento de presionar LinkedIn */}}>
        <Ionicons name="logo-linkedin" size={32} color="#0077b5" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default SocialMediaLinks;

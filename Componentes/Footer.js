
import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import {Dimensions, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'


const Footer = () => {
  return (
    <View style={styles.container}>
     <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="map-marker" size={30} color="#FFF" style={{ marginRight: 10 }} />
            <Text style={styles.textFootUbicacion}>México</Text>
        </View>
        <Text style={styles.textFoot}>@2024 Smart Homes Sweepers, Inc. Todos los derechos reservados</Text>
     </View>
    </View>
  )
}


export default Footer;

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:"#043464",
    marginTop:30,
    },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  textFoot:{
    color:"#FFF",
    fontSize:15,
  },
  textFootUbicacion:{
    color:"#FFF",
    fontSize:18,
  },

});

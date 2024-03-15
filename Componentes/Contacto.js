import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Contacto = () => {
  const [contacto, setContacto] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch('https://apismartsweepers.vercel.app/api/contacto')
      .then((res) => res.json())
      .then((obj) => {
        setContacto(obj);
        setLoad(true);
      })
      .catch((err) => Alert.alert('Ocurrió un error: ' + err));
  }, []);

  const UScreen = () => {
    return (
        <View>
            <ActivityIndicator color={'darkblue'} size={'large'} />
            <Text>Cargando datos...</Text>
        </View> 
    );
};
const LScreen = () => {
    return (
        <View>
            
            {contacto.map((contactoItem, index) => (
                <Text key={index}  style={styles.text}>Contacta a {contactoItem.nombre_empresa}</Text>
            ))}

            {contacto.map((contactoItem, index) => (
              <Text key={index} style={styles.textInfo}>{contactoItem.nombre_empresa}</Text>
            ))}
             {contacto.map((contactoItem, index) => (
              <Text key={index} style={styles.textInfo}>{contactoItem.direccion.estado}, {contactoItem.direccion.pais}.</Text>
            ))}
            {contacto.map((contactoItem, index) => (
              <Text key={index} style={styles.textInfo}>{contactoItem.direccion.calle}</Text>
            ))}
            {contacto.map((contactoItem, index) => (
              <Text key={index} style={styles.textInfo}>{contactoItem.direccion.colonia}</Text>
            ))}
            {contacto.map((contactoItem, index) => (
              <Text key={index} style={styles.textInfo}>C.P. {contactoItem.direccion.codigo_postal}</Text>
            ))}
             {contacto.map((contactoItem, index) => (
              <Text key={index} style={styles.textInfo}>{contactoItem.direccion.ciudad}</Text>
            ))}
            {contacto.map((contactoItem, index) => (
              <Text key={index} style={styles.textInfo}>Horario de atencion: {contactoItem.horario_atencion}</Text>
            ))}
            {contacto.map((contactoItem, index) => (
                <View key={index}>
                    <View style={styles.infoContainer}>
                        <FontAwesome name="phone" size={24} color="#043464" style={styles.icon} />
                        <Text style={styles.textInfo}>{contactoItem.telefono}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <FontAwesome name="envelope" size={24} color="#043464" style={styles.icon} />
                        <Text style={styles.textInfo}>{contactoItem.correo}</Text>
                    </View>
                </View>
            ))}
            
        </View>
    );
};

return (
    <View style={styles.container}>
        
        {load ? <LScreen /> : <UScreen />}
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    padding: 20,
    paddingTop:30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  preguntaContainer: {
    marginBottom: 20,
  },
  preguntaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  preguntaText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  respuestaText: {
    fontSize: 16,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom:15,
  },
  textInfo: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 7,
  },
  icon: {
    marginRight: 10,
    padding: 7
},
infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
});

export default Contacto;

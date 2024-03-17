import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image,ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const QuienesSomos = () => {
  const [politica, setPolitica] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch('https://apismartsweepers.vercel.app/api/politica')
      .then((res) => res.json())
      .then((obj) => {
        setPolitica(obj);
        setLoad(true);
      })
      .catch((err) => Alert.alert('Ocurrió un error: ' + err));
  }, []);

  const renderPoliticaItem = ({ item }) => (
    <View style={styles.politicaContainer}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.descripcion}>{item.descripcion}</Text>
    </View>
  );

  const UScreen = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={'darkblue'} size={'large'} />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  };

  const LScreen = () => {
    return (
      <View>
        <Text style={styles.title}>SMART HOMES SWEEPERS</Text>
        <FlatList
          data={politica}
          renderItem={renderPoliticaItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
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
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:"#043464"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  politicaContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5, 
  },
  descripcion: {
    fontSize: 17,
    textAlign: 'center',
  },
});

export default QuienesSomos;

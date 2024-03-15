import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PreguntasFrecuentes = () => {
  const [faq, setFaq] = useState([]);
  const [load, setLoad] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [pressedIndexes, setPressedIndexes] = useState([]);

  useEffect(() => {
    fetch('https://apismartsweepers.vercel.app/api/faq')
      .then((res) => res.json())
      .then((obj) => {
        setFaq(obj);
        setLoad(true);
      })
      .catch((err) => Alert.alert('Ocurrió un error: ' + err));
  }, []);

  const toggleExpansion = (index) => {
    const newExpandedIndexes = [...expandedIndexes];
    if (newExpandedIndexes.includes(index)) {
      newExpandedIndexes.splice(newExpandedIndexes.indexOf(index), 1);
    } else {
      newExpandedIndexes.push(index);
    }
    setExpandedIndexes(newExpandedIndexes);

    if (pressedIndexes.includes(index)) {
      setPressedIndexes(pressedIndexes.filter(item => item !== index));
    } else {
      setPressedIndexes([...pressedIndexes, index]);
    }
  };

const renderPregunta = ({ item, index }) => (
  <View style={styles.preguntaContainer}>
    <TouchableOpacity onPress={() => toggleExpansion(index)}>
      <View style={styles.preguntaHeader}>
        <Text style={[styles.preguntaText, { color: pressedIndexes.includes(index) ? '#FF6600' : '#043464' }]}>{item.pregunta}</Text>
        <FontAwesome name={expandedIndexes.includes(index) ? 'chevron-up' : 'chevron-down'} size={20} color={pressedIndexes.includes(index) ? 'red' : 'black'} />
      </View>
    </TouchableOpacity>
    {expandedIndexes.includes(index) && (
      <Text style={styles.respuestaText}>{item.respuesta}</Text>
    )}
  </View>
);


  return (
    <View style={styles.container}>
      
      {load ? (
        <FlatList
          data={faq}
          renderItem={renderPregunta}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.loadingText}>Cargando datos...</Text>
      )}
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
});

export default PreguntasFrecuentes;

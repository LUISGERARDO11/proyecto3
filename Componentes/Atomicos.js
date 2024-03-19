import {  Pressable, StyleSheet, Text, Alert, TextInput, View, TouchableOpacity,Modal } from 'react-native';
import { estilos } from './Estilos';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';


export const BotonNum = ({ texto, estiloTexto, accion }) => {
    return (
        <Pressable style={({ pressed }) => [{
        }, estilos.botonNum]}

            onPress={accion}
        >
            <Text style={StyleSheet.compose(estilos.textoBoton, { fontWeight: estiloTexto, })}>{texto}</Text>
        </Pressable>
    )
}
export const Boton = ({ texto, estiloTexto, accion }) => {
    return (
        <Pressable style={({ pressed }) => [{
        }, estilos.boton]}

            onPress={accion}
        >
            <Text style={StyleSheet.compose(estilos.textoBoton, { fontWeight: estiloTexto, })}>{texto}</Text>
        </Pressable>
    )
}

export const Caja=({valor})=>{
    return(
        <View style={estilos.estiloCaja}>
            <Text style={estilos.textoCaja}>{valor}</Text>
        </View>
    )
}
export const BotonMenu=({texto,accion,color1='#bb5',color2='#ac9'})=>{
    return(
      <Pressable 
      style={({pressed})=>[{
        backgroundColor:pressed? color1:color2,
        margin:pressed?6:3,
      }]}
      onPress={accion}
      >
        <Text style={{fontSize:18,fontWeight:'bold'}}>{texto}</Text>
      </Pressable>
    )
  } 

  export const BotonUni = ({
    onPress,
    text,
    textColor = '#043464',
    backgroundColor = '#ECF0F1',
    borderColor = '#043464',
    textSize = 16,
    customTextColor, // Nuevo prop para el color del texto personalizado
    customBackgroundColor, // Nuevo prop para el color de fondo personalizado
    customBorderColor // Nuevo prop para el color del borde personalizado
}) => {
    // Determina el color de fondo, texto y borde del botón
    const dynamicBackgroundColor = customBackgroundColor ? customBackgroundColor : backgroundColor;
    const dynamicTextColor = customTextColor ? customTextColor : textColor;
    const dynamicBorderColor = customBorderColor ? customBorderColor : borderColor;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                estilos.buttonUni,
                { backgroundColor: dynamicBackgroundColor, borderColor: dynamicBorderColor }
            ]}
        >
            <Text style={[estilos.buttonTextUni, { color: dynamicTextColor, fontSize: textSize }]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};


export const SelectOption = ({ options, onSelect, label, defaultOption }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption || null);

  const handleOptionSelect = (option) => {
      setSelectedOption(option);
      onSelect(option);
      setModalVisible(false);
  };

  return (
      <View style={styles.container}>
          <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{label}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.selectButton}>
                  <Text style={styles.selectButtonText}>{selectedOption ? selectedOption : 'Seleccionar'}</Text>
                  <FontAwesome name="chevron-down" size={20} color="black" />
              </View>
          </TouchableOpacity>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
          >
              <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                      {options.map((option, index) => (
                          <TouchableOpacity
                              key={index}
                              style={styles.option}
                              onPress={() => handleOptionSelect(option)}
                          >
                              <Text>{option}</Text>
                          </TouchableOpacity>
                      ))}
                  </View>
              </View>
          </Modal>
      </View>
  );
};

  
  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      paddingLeft:16,
    },
    selectButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: 'black',
      padding: 15,
      borderRadius: 10,
      height: 50,
      width: '90%', // Ajuste del ancho del botón de selección
    },
    selectButtonText: {
      fontSize: 16,
      color: 'black',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%', // Ajuste del ancho del modal
      maxHeight: '80%',
    },
    option: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
    },
    optionText: {
      fontSize: 16,
    },
  });
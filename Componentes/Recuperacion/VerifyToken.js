import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BotonUni } from '../Atomicos';

const VerifyToken = ({ route }) => {
  const [token, setToken] = useState('');
  const [tokenbd, setTokenbd] = useState('');
  const inputsRef = useRef([]);
  const navigation = useNavigation();
  const { id } = route.params;
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, value) => {
    // Eliminar cualquier caracter no permitido del input
    const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');

    setToken((prevToken) => {
      let newToken = prevToken.split('');

      // Si el valor actual está vacío, retrocede un input
      if (!sanitizedValue && index > 0) {
        inputsRef.current[index - 1].focus();
      }

      newToken[index] = sanitizedValue.charAt(0);
      return newToken.join('');
    });

    // Pasar el foco al siguiente input si el valor actual es válido
    if (sanitizedValue && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerifyToken = async () => {
    if (token.length !== 6) {
      Alert.alert('Token inválido', 'El token debe contener exactamente 6 caracteres.');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/' + id);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del servidor');
      }
      
      const data = await response.json();
      if (data && data.token_acceso) {
        setTokenbd(data.token_acceso);
        console.log(data.token_acceso);
        console.log(token);
  
        // Validar si los tokens son iguales
        if (token === data.token_acceso) {
          // Si los tokens son iguales, navegar a la ventana PasswordUpdateForm
          navigation.navigate('PasswordUpdateForm', {
            id: id
        });
        } else {
          // Si los tokens no son iguales, mostrar una alerta
          Alert.alert('Tokens no coinciden', 'Los tokens no son iguales. Por favor, verifica tu token e intenta de nuevo.');
        }
      } else {
        throw new Error('Token no encontrado');
      }
    } catch (error) {
      console.error('Error al verificar el correo electrónico:', error);
      Alert.alert('Error', 'No se pudo verificar el correo electrónico. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.textIndicaciones}>Valida tu identidad</Text>
      <Text style={styles.textPregunta}>Ingresa el token que se envió a tu correo</Text>
      <View style={styles.tokenInputsContainer}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputsRef.current[index] = ref)}
            style={styles.tokenInput}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            maxLength={1}
            value={token[index] || ''}
            onChangeText={(value) => handleInputChange(index, value)}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <BotonUni text="Verificar" onPress={handleVerifyToken} style={styles.btnVerificar} customTextColor="#ECF0F1" customBackgroundColor="#043464" customBorderColor="#ECF0F1" />
        {loading && <ActivityIndicator size="small" color="#043464" />}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.regresar}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textPregunta: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 20,
  },
  textIndicaciones: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tokenInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnVerificar: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  regresar: {
    fontSize: 16,
    color: '#043464',
    textDecorationLine: 'underline',
    margin: 20,
  },
});

export default VerifyToken;

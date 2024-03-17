import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { BotonUni, SelectOption } from './Atomicos';
import InputForm from './InputForm';
import { estilos } from './Estilos';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';

const TercerPasoForm = ({ route }) => {
  const [contra, setContra] = useState('');
  const [res, setRes] = useState('');
  const [selectedOption, setSelectedOption] = useState(null); // Nuevo estado para la opción seleccionada
  const [loading, setLoading] = useState(false); // Estado para mostrar el estado de carga
  const navigation = useNavigation();
  const { nombre, correo, numero, pais, estado, ciudad, colonia, calle, codigoPostal, referencia } = route.params;

  const handleBackToSecondStep = () => {
    navigation.navigate('SegundoPasoForm', {
        nombre: nombre,
        correo: correo,
        numero: numero,
        pais: pais,
        estado: estado,
        ciudad: ciudad,
        colonia: colonia,
        calle: calle,
        codigoPostal: codigoPostal,
        referencia: referencia,
    });
  };

  const generateRandomToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 6;
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
  };
  

  const handleNext = async () => {
    if (contra.trim() === '' || res.trim() === '' || !selectedOption) { // Añade la verificación de la opción seleccionada
      alert('Por favor, complete todos los campos y seleccione una opción.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(contra)) {
      alert('La contraseña debe tener al menos una minúscula, una mayúscula, un número, un carácter especial y al menos 8 caracteres.');
      return;
    }

    setLoading(true); // Activar el estado de carga

    try {
      const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_completo: nombre,
          correo: correo,
          tipo: 'cliente',
          contrasenia: contra,
          pregunta_secreta: selectedOption,
          respuesta_secreta: res,
          token_acceso: generateRandomToken(),
          fecha_registro: new Date(),
          direccion: {
            pais: pais,
            estado: estado,
            ciudad: ciudad,
            colonia: colonia,
            calle: calle,
            codigo_postal: codigoPostal,
            referencia: referencia
          },
          telefono: numero,
          dispositivos: []
        }),
      });
    
      const data = await response.json();
    
      if (response.ok) {
        // Verifica si data tiene un valor antes de guardarlo
        if (data) {
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          console.log('Datos guardados en AsyncStorage:', data);
          alert('Usuario registrado exitosamente');
          navigation.navigate('Home');
        } else {
          alert('Error al registrar el usuario: datos de sesión no encontrados en la respuesta');
          navigation.navigate('Registro');
        }
      } else {
        alert('Error al registrar el usuario');
        navigation.navigate('Registro');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
       <Text style={styles.bigTextTitle}>Registro</Text>
            <Text style={styles.bigTextSubTitle}>Informacion de acceso</Text>
            <Text style={styles.bigTextSuSubbTitle}>3 de 3</Text>
      <View style={estilos.bottomContainer}>
        <InputForm label="Contraseña" onInputChange={setContra} secureTextEntryValue={true}/>
        <SelectOption
          label="Pregunta de recuperación"
          options={['¿Cuál es el nombre de tu primera mascota?', '¿Cuál es tu canción favorita?', '¿En qué ciudad nació tu madre?','¿Cuál es tu comida favorita?','¿Cuál es el nombre de tu mejor amigo de la infancia?']}
          onSelect={(option) => setSelectedOption(option)} // Actualiza el estado cuando se selecciona una opción
        />
        <InputForm label="Respuesta" onInputChange={setRes} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <BotonUni text="Anterior" onPress={handleBackToSecondStep} />
        <View style={{ width: 30 }} />
        <BotonUni
          text="Registrar"
          customTextColor="#ECF0F1"
          customBackgroundColor="#043464"
          customBorderColor="#ECF0F1"
          onPress={handleNext}
          disabled={loading} // Deshabilitar el botón mientras se carga
        />
      </View>
    </View>
  );
};

export default TercerPasoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    marginTop: 40,
  },
  bigTextTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bigTextSubTitle: {
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
    paddingBottom: 15,
    fontWeight: 'bold',
  },
  bigTextSuSubbTitle:{
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 15,
    fontWeight: 'bold',
  }
});

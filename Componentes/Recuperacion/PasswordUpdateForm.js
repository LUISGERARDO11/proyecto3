import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { BotonUni } from '../Atomicos';
import InputForm from '../InputForm';
import { estilos } from '../Estilos';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PasswordUpdateForm = ({ route }) => {
  const [contra, setContra] = useState('');
  const [confirmContra, setConfirmContra] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar u ocultar la confirmación de la contraseña
  const [loading, setLoading] = useState(false); // Estado para mostrar el estado de carga
  const navigation = useNavigation();
  const { correo, id } = route.params;

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
    // Verificar si las contraseñas coinciden
    if (contra !== confirmContra) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Expresión regular para verificar que la contraseña cumple con los requisitos
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Verificar si la contraseña cumple con la expresión regular
    if (!passwordRegex.test(contra)) {
        alert('La contraseña debe contener al menos una mayúscula, una minúscula, un carácter especial y un número, y tener al menos 8 caracteres en total.');
        return;
    }

    // Realizar la lógica para actualizar la contraseña
    try {
        // Enviar la solicitud al servidor para actualizar la contraseña
        const response = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/actualizarcontrasena/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nuevaContrasena: contra,
                token_acceso: generateRandomToken(),
            }),
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            // Contraseña actualizada correctamente
            alert('Contraseña actualizada correctamente');
            navigation.navigate('Login'); // Redirigir a la pantalla de inicio de sesión
        } else {
            // Error al actualizar la contraseña
            alert('Error al actualizar la contraseña');
        }
    } catch (error) {
        // Error de red u otro error
        console.error('Error al actualizar la contraseña:', error);
        alert('Error al actualizar la contraseña. Por favor, inténtalo de nuevo más tarde.');
    }
  };



  const handleCancel = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textIndicaciones}>Restablece tu contraseña</Text>
      <View style={estilos.bottomContainer}>
        <InputForm 
          label="Contraseña" 
          onInputChange={setContra} 
          secureTextEntryValue={!showPassword} // Mostrar u ocultar la contraseña según el estado de showPassword
        />
        {/* Checkbox para mostrar/ocultar la contraseña */}
        <TouchableOpacity
          style={estilos.checkbox}
          onPress={() => setShowPassword(!showPassword)}
        >
          {/* Ícono para mostrar si la contraseña está visible o no */}
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color={showPassword ? '#FF6600' : '#043464'} />
        </TouchableOpacity>

        <InputForm 
          label="Confirmar Contraseña" 
          onInputChange={setConfirmContra} 
          secureTextEntryValue={!showConfirmPassword} // Mostrar u ocultar la confirmación de la contraseña según el estado de showConfirmPassword
        />
        {/* Checkbox para mostrar/ocultar la confirmación de la contraseña */}
        <TouchableOpacity
          style={estilos.checkbox}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {/* Ícono para mostrar si la confirmación de la contraseña está visible o no */}
          <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color={showConfirmPassword ? '#FF6600' : '#043464'} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <BotonUni text="Cancelar" onPress={handleCancel} />
        <View style={{ width: 30 }} />
        <BotonUni
          text="Restablecer"
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

export default PasswordUpdateForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    marginTop: 40,
  },
  textIndicaciones: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
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
  },
  checkbox:{
    paddingLeft:30,
  }
});

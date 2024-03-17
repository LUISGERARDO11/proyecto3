import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native'; // Importa Alert
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from './CustomButton';
import PerfilDir from './PerfilDir';
import PerfilDatosAcount from './PerfilDatosAcount';
import PerfilInfoPerso from './PerfilInfoPerso';

const UserProfile = ({ handleDirComponentPress, handleDatosComponentPress, handleInfoComponentPress }) => {
  const [userData, setUserData] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem('userData');
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          setUserData(userData);

          fetch('https://apismartsweepers.vercel.app/api/usuarios/' + userData._id)
            .then((res) => res.json())
            .then((obj) => {
              setUsuario(obj);
              setLoad(true);
            })
            .catch((err) => Alert.alert('Ocurrió un error: ' + err));
        }
      } catch (error) {
        console.error('Error al recuperar datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  // Validar si los datos del usuario están cargados antes de renderizar
  if (!load) {
    return <Text style={styles.text}>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      {usuario ? (
        <>
          <Text style={styles.text}>{usuario.nombre_completo}</Text>
          <Text style={styles.text}>{usuario.correo}</Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              icon="id-card"
              textLeft="Información Personal"
              onPress={() => handleInfoComponentPress()}
            />
            <CustomButton
              icon="user"
              textLeft="Datos de tu cuenta"
              onPress={() => handleDatosComponentPress()}
            />
            <CustomButton
              icon="map-marker"
              textLeft="Dirección"
              onPress={() => handleDirComponentPress()}
            />
          </View>
        </>
      ) : (
        <Text style={styles.text}>No hay información de usuario disponible</Text>
      )}
    </View>
  );
};


const ParentComponent = () => {
  const [showDirComponent, setShowDirComponent] = useState(false);
  const [showDatosComponent, setShowDatosComponent] = useState(false);
  const [showInfoComponent, setShowInfoComponent] = useState(false);

  const handleDirComponentPress = () => {
    setShowDirComponent(true);
  };

  const handleDatosComponentPress = () => {
    setShowDatosComponent(true);
  };

  const handleInfoComponentPress = () => {
    setShowInfoComponent(true);
  };

  if (!showDirComponent && !showDatosComponent && !showInfoComponent) {
    return (
      <UserProfile
        handleDirComponentPress={handleDirComponentPress}
        handleDatosComponentPress={handleDatosComponentPress}
        handleInfoComponentPress={handleInfoComponentPress}
      />
    );
  } else if (showDirComponent) {
    return <PerfilDir />;
  } else if (showDatosComponent) {
    return <PerfilDatosAcount />;
  } else {
    return <PerfilInfoPerso />;
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default ParentComponent;

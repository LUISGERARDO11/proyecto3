import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from './UserProfile';
import { BotonUni } from './Atomicos';
import EditComponent from './EdicionUser/DireccionForm'; // Importa el componente de edición aquí

const PerfilDir = () => {
    const [userData, setUserData] = useState(null);
    const [usuario,setUsuario]=useState(null);
    const [showUserProfileComponent, setShowUserProfileComponent] = useState(false);
    const [showEditComponent, setShowEditComponent] = useState(false);
    const [load, setLoad] = useState(false); // Nuevo estado para indicar si los datos del usuario han sido cargados

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userDataJson = await AsyncStorage.getItem('userData');
            if (userDataJson !== null) {
              const userData = JSON.parse(userDataJson);
              setUserData(userData);

                fetch('https://apismartsweepers.vercel.app/api/usuarios/'+userData._id)
                .then((res)=>res.json())
                .then((obj)=>{
                    setUsuario(obj);
                    setLoad(true); // Establecer load en verdadero después de obtener los datos del usuario
                })
                .catch((err)=>Alert.alert('Ocurrio un error : '+err))
            }
          } catch (error) {
            console.error('Error al recuperar datos del usuario:', error);
          }
        };
    
        fetchUserData();
      }, []);
    

    const handleUserProfileComponentPress = () => {
        setShowUserProfileComponent(true);
    };
    
    const handleEditPress = () => {
        setShowEditComponent(true);
    };
    
    if (showUserProfileComponent) {
        return <UserProfile />;
    }

    if (!load) { // Validar si los datos del usuario están cargados antes de renderizar
        return <Text style={styles.text}>Cargando...</Text>;
    }

    if (showEditComponent) {
        return <EditComponent userData={usuario} />;
    }

    return (
        <View style={styles.container}>
            {usuario ? (
                <>
                    <View style={styles.userInfo}>
                        <Text style={styles.userInfoText}>Direccion</Text>
                    </View>
                    <Card
                        nombre={usuario.nombre_completo}
                        telefono={usuario.telefono}
                        state={usuario.direccion.estado}
                        city={usuario.direccion.ciudad}
                        colony={usuario.direccion.colonia}
                        street={usuario.direccion.calle}
                        cp={usuario.direccion.codigo_postal}
                        onPressEdit={handleEditPress} // Llama a la función para mostrar el componente de edición
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:40 }}>
                        <BotonUni text="Regresar" onPress={handleUserProfileComponentPress} />
                    </View>
                </>
            ) : (
                <Text style={styles.text}>No hay información de usuario disponible</Text>
            )}
        </View>
    );
};

const Card = ({ nombre, telefono, state, city, colony, street, cp, onPressEdit }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardText1}>{street}</Text>
            <Text style={styles.cardText2}>Código postal {cp} - {state}</Text>
            <Text style={styles.cardText2}>{city}</Text>
            <Text style={styles.cardText2}>{colony}</Text>
            <Text style={styles.cardText2}>{nombre} - {telefono} </Text>
            <TouchableOpacity onPress={onPressEdit}>
                <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 40,
    },
    text: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    card: {
        borderWidth: 2,
        borderColor: '#FFF',
        borderRadius: 7,
        padding: 10,
        marginTop: 20,
        width: '80%',
        backgroundColor:'#FFF'
    },
    cardText1: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    cardText2: {
        fontSize: 20,
        marginBottom: 7,
    },
    editText: {
        color: '#FF6600',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center',
        margin:10,
    },
    userInfo: {
        alignSelf: 'flex-start',
        marginLeft: 40,
    },
    userInfoText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default PerfilDir;

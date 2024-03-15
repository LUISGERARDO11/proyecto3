import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from './LogoutButton';

const LogoutScreen = () => {
    const navigation = useNavigation();
    const [userDataExists, setUserDataExists] = useState(false);

    useEffect(() => {
        // Verificar si existen datos de usuario al cargar el componente
        const checkUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                // Actualizar el estado según si existen datos de usuario o no
                setUserDataExists(userData !== null);
            } catch (error) {
                console.error('Error al verificar los datos de usuario:', error);
            }
        };

        checkUserData(); // Llamar a la función de verificación al cargar el componente
    }, []);

    const handleLogout = async () => {
        try {
            if (userDataExists) {
                // Eliminar los datos de sesión almacenados si existen
                await AsyncStorage.removeItem('userData');
            }
            // Redirigir al usuario a la pantalla de inicio de sesión
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Manejo de errores aquí
        }
    };

    return <LogoutButton onPress={handleLogout} />;
};

export default LogoutScreen;

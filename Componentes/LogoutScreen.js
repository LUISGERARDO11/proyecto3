import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const logout = async () => {
            try {
                // Verificar si existen datos de usuario
                const userData = await AsyncStorage.getItem('userData');

                if (userData !== null) {
                    // Eliminar los datos de sesión almacenados si existen
                    await AsyncStorage.removeItem('userData');
                }

                // Redirigir al usuario a la pantalla de inicio de sesión
                navigation.navigate('Login');
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
                // Manejo de errores aquí
                // Puedes mostrar un mensaje al usuario informando del error
            }
        };

        logout(); // Llamar a la función de cierre de sesión al cargar el componente
    }, []);

    // No se necesita renderizar nada en este componente
    return null;
};

export default LogoutScreen;

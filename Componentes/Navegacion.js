import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para manejar la sesión local

import Home from "./Home";
import Login from "./Login";
import Catalogo from "./Catalogo";
import ProductDetail from "./ProductDetail";
import PreguntasFrecuentes from "./PreguntasFrecuentes";
import Registro from "./PrimerPasoForm";
import SegundoPasoForm from "./SegundoPasoForm";
import TercerPasoForm from "./TercerPasoForm";
import Contacto from "./Contacto";
import LogoutButton from './LogoutScreen';
import LogoutScreen from './LogoutScreen';

const Index = createNativeStackNavigator();
const Stackp = createNativeStackNavigator();
const TabsHome = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const StackHome = () => {
    const [userAuthenticated, setUserAuthenticated] = useState(false); // Estado para el estado de autenticación del usuario

    // Función para verificar si el usuario está autenticado
    const checkAuthentication = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData !== null) {
                // Si hay datos de sesión almacenados, el usuario está autenticado
                setUserAuthenticated(true);
            } else {
                // Si no hay datos de sesión almacenados, el usuario no está autenticado
                setUserAuthenticated(false);
            }
        } catch (error) {
            console.error('Error al verificar la autenticación:', error);
        }
    };

    useEffect(() => {
        // Verificar la autenticación al cargar la aplicación
        checkAuthentication();
    }, []);

    return (
        <Index.Navigator >
            {userAuthenticated ? (
                <>
                    <Index.Screen name="Home" component={MiDrawer} options={{ headerShown: false }} />
                    <Index.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Index.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
                    <Index.Screen name="SegundoPasoForm" component={SegundoPasoForm} options={{ headerShown: false }} />
                    <Index.Screen name="TercerPasoForm" component={TercerPasoForm} options={{ headerShown: false }} />
                </>
            ) : (
                <Index.Screen name="Login" component={Login} options={{ headerShown: false }} />
            )}
        </Index.Navigator>
    )
}

// Navegacion secundaria (tabs del home)
export const TabsH = () => {
    return (
        <TabsHome.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#FF6600',
                tabBarInactiveTintColor: '#043464',
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
                tabBarStyle: {
                    backgroundColor: '#ECF0F1',
                    borderTopWidth: 1,
                    borderTopColor: '#ECF0F1',
                },
            }}>
            <TabsHome.Screen
                name="Home2"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ), headerShown: false
                }}
            />
            <TabsHome.Screen
                name="Productos"
                component={StackProduc}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="heart" size={size} color={color} />
                    ), headerShown: false
                }}
            />
        </TabsHome.Navigator>
    );
};

// Navegacion de productos a detalle del producto
export const StackProduc = () => {
    return (
        <Stackp.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ECF0F1',
                },
                headerTintColor: '#ECF0F1',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stackp.Screen
                name="Productos2"
                component={Catalogo}
                options={{ headerShown: false }}
            />
            <Stackp.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{ headerShown: false }}
            />
        </Stackp.Navigator>
    );
};

export const MiDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="SMART HOMES SWEEPERS" component={TabsH} />
            <Drawer.Screen name="Preguntas Frecuentes" component={PreguntasFrecuentes} />
            <Drawer.Screen name="Contacto" component={Contacto} />
            <Drawer.Screen name="Cerrar Sesión" component={LogoutScreen} />
        </Drawer.Navigator>
    )
}

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
import QuienesSomos from './QuienesSomos';
import ParentComponent from './UserProfile';
import ProductList from './ProductListFirs';
import ForgotPasswordScreen from './Recuperacion/ForgotPasswordScreen';
import VerifyUserQuestion from './Recuperacion/VerifyUserQuestion';
import PasswordUpdateForm from './Recuperacion/PasswordUpdateForm';
import VerifyToken from './Recuperacion/VerifyToken';

const Index = createNativeStackNavigator();
const Stackp = createNativeStackNavigator();
const StackH = createNativeStackNavigator();
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
        <>
            {userAuthenticated ? <IndexLogIn /> : <IndexLogOut />}
        </>
    );
};


//Retorna un usuario  logeado
export const IndexLogIn=()=>{
    return(
        <Index.Navigator >
            <Index.Screen name="Home" component={MiDrawer} options={{ headerShown: false }} />
            <Index.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Index.Navigator>
    )
}
//Retorna un usuario sin logear
export const IndexLogOut=()=>{
    return(
        <Index.Navigator >
             <Index.Screen name="Login" component={Login} options={{ headerShown: false }} />
             <Index.Screen name="Home" component={MiDrawer} options={{ headerShown: false }} />
             <Index.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
             <Index.Screen name="VerifyToken" component={VerifyToken} options={{ headerShown: false }} />
            <Index.Screen name="PasswordUpdateForm" component={PasswordUpdateForm} options={{ headerShown: false }} />
            <Index.Screen name="VerifyUserQuestion" component={VerifyUserQuestion} options={{ headerShown: false }} />
            <Index.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
            <Index.Screen name="SegundoPasoForm" component={SegundoPasoForm} options={{ headerShown: false }} />
            <Index.Screen name="TercerPasoForm" component={TercerPasoForm} options={{ headerShown: false }} />
        </Index.Navigator>
    )
}






// Navegacion secundaria (tabs del home)
export const TabsH = () => {
    return (
        <TabsHome.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#FF6600',
                tabBarInactiveTintColor: '#ECF0F1',
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
                tabBarStyle: {
                    backgroundColor: '#043464',
                    borderTopWidth: 1,
                    borderTopColor: '#043464',
                    height: 70, // Ajusta la altura según sea necesario
                },
            }}>
            <TabsHome.Screen
                name="Home2"
                component={AppStack}
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
                        <FontAwesome name="shopping-bag" size={size} color={color} />
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
        <Drawer.Navigator
            screenOptions={{
                drawerActiveTintColor: '#043464',
                drawerActiveBackgroundColor: '#ECF0F1',
                drawerInactiveTintColor: '#ECF0F1',
                drawerInactiveBackgroundColor: '#043464',
                drawerStyle: {
                    backgroundColor: '#043464',
                },
                headerStyle: {
                    backgroundColor: '#043464',
                },
                headerTintColor: '#ECF0F1',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            drawerContentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 50, // Espacio adicional al final del drawer
            }}
        >
            <Drawer.Screen
                name="SMART HOMES SWEEPERS"
                component={TabsH}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="shopping-bag" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Perfil"
                component={ParentComponent}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={size} color={color} /> // Icono del componente seleccionado
                    ),
                }}
            />
            <Drawer.Screen
                name="Preguntas Frecuentes"
                component={PreguntasFrecuentes}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="question-circle" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Quienes somos"
                component={QuienesSomos}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="info-circle" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Contacto"
                component={Contacto}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="envelope" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Cerrar Sesión"
                component={LogoutScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="sign-out" size={size} color="#FF6600" />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};
export const AppStack = () => {
    return (
      <StackH.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ECF0F1',
        },
        headerTintColor: '#ECF0F1',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }}>
        
        <StackH.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <StackH.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }}/>
      </StackH.Navigator>
    );
  };
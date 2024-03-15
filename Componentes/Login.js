import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import { estilos } from './Estilos';
import { useNavigation } from '@react-navigation/native';
import InputForm from './InputForm'; 
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el ícono de FontAwesome
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para almacenar los datos de sesión

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para manejar si se debe mostrar la contraseña
    const [formValid, setFormValid] = useState(false);
    const nav = useNavigation();

    useEffect(() => {
        if (email.trim() !== '' && password.trim() !== '') {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [email, password]);


    const handleLogin = async () => {
        // Validación para verificar si el campo de contraseña está vacío
        if (password.trim() === '') {
            Alert.alert('Error', 'Por favor, completa el campo de contraseña.');
            return; // Sale de la función si la contraseña está vacía
        }

        try {
            const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: email,
                    contrasenia: password
                })
            });
            const data = await response.json();
            if (response.ok) {
                // Inicio de sesión exitoso, guarda los datos de sesión en AsyncStorage
                // Inicio de sesión exitoso, guarda los datos de sesión en AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(data.usuario));
                 // Navega a la pantalla de inicio
                nav.navigate('Home');
            } else {
                // Inicio de sesión fallido, muestra un mensaje de error
                Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
                console.error('Inicio de sesión fallido:', data.message);
            }
        } catch (error) {
            // Error de red, muestra un mensaje de error
            Alert.alert('Error', 'Hubo un problema de conexión. Por favor, inténtalo nuevamente más tarde.');
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <View style={{ backgroundColor: '#043464' }}>
            <View>
                <View style={estilos.topContainerLogin}></View>
                <View style={estilos.bottomContainerLogin}>
                    <Text style={estilos.bigTextTitle}>Bienvenido de nuevo</Text>
                    <Text style={estilos.bigTextSubTitle}>Inicia sesión en tu cuenta</Text>
                   
                    <InputForm
                        label="Correo electrónico"
                        onInputChange={setEmail}
                    />
                    {/* Input para la contraseña */}
                    <View style={estilos.inputContainer}>
                        <Text style={estilos.label}>Contraseña</Text>
                        <TextInput
                            style={estilos.input}
                            secureTextEntry={!showPassword} // Mostrar u ocultar la contraseña según el estado de showPassword
                            onChangeText={setPassword}
                            value={password}
                        />
                        {/* Checkbox para mostrar/ocultar la contraseña */}
                        <TouchableOpacity
                            style={estilos.checkbox}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {/* Ícono para mostrar si la contraseña está visible o no */}
                            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color={showPassword ? '#FF6600' : '#043464'} />
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity>
                        <Text style={estilos.textForget}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.btnLogin} onPress={handleLogin} disabled={!formValid}>
                        <Text style={[estilos.loginButton, !formValid && { opacity: 0.75 }]}>
                            Iniciar Sesión
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { nav.navigate('Registro') }}>
                        <Text style={estilos.createAccountText}>
                            No tienes una cuenta? <Text style={{ fontWeight: 'bold', color: "#043464" }}>Crear cuenta</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;

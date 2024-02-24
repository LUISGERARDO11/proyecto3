import { View, Text,TextInput, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { estilos } from './Estilos'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        // Verificar si ambos campos están llenos
        if (email.trim() !== '' && password.trim() !== '') {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [email, password]);

    const handleLogin = () => {
        // Aquí puedes manejar la lógica para iniciar sesión
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const validateEmail = () => {
        if (email.trim() === '') {
            setEmailError('Por favor, complete este campo');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (password.trim() === '') {
            setPasswordError('Por favor, complete este campo');
        } else {
            setPasswordError('');
        }
    };

    return (
        <View style={{ backgroundColor: '#f0c31f' }}>
            <View>
                <View style={estilos.topContainerLogin}>
                
                </View>
                <View style={estilos.bottomContainerLogin}>
                <Text style={estilos.bigTextTitle}>Bienvenido de nuevo</Text>
                    <Text style={estilos.bigTextSubTitle}>Inicia sesión en tu cuenta</Text>
                    <View style={estilos.inputContainer}>

                        <Text style={estilos.label}>Correo electrónico</Text>
                        <TextInput
                            style={estilos.input}
                            placeholder="Ingrese su correo electrónico"
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError('');
                            }}
                            onBlur={validateEmail}
                            value={email}
                        />
                        {emailError !== '' && <Text style={estilos.errorMessage}>{emailError}</Text>}
                    </View>
                    <View style={estilos.inputContainer}>
                        <Text style={estilos.label}>Contraseña</Text>
                        <TextInput
                            style={estilos.input}
                            placeholder="Ingrese su contraseña"
                            onChangeText={(text) => {
                                setPassword(text);
                                setPasswordError('');
                            }}
                            onBlur={validatePassword}
                            value={password}
                            secureTextEntry={true}
                        />
                        {passwordError !== '' && <Text style={estilos.errorMessage}>{passwordError}</Text>}
                    </View>
                    <TouchableOpacity>
                        <Text style={estilos.textForget}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.btnLogin} onPress={handleLogin} disabled={!formValid}>
                        <Text style={[estilos.loginButton, !formValid && { opacity: 0.5 }]}>
                            Iniciar Sesión
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { /* Aquí puedes manejar la navegación a la página de registro */ }}>
                        <Text style={estilos.createAccountText}>
                            No tienes una cuenta? <Text style={{ fontWeight: 'bold' }}>Crear cuenta</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};



export default Login
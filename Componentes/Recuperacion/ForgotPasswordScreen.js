import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import InputForm from '../InputForm';
import { BotonUni } from '../Atomicos';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [correo, setCorreo] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [loading, setLoading] = useState(false); // Nueva variable de estado
    const navigation = useNavigation();

    const handleCheckEmail = async () => {
        if (correo.trim() === '') {
            Alert.alert('Error', 'Por favor, completa el campo de correo.');
            return;
        }

        setLoading(true); // Establece loading a true mientras se verifica el correo electrónico

        try {
            const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/email/' + correo);
            const data = await response.json();

            if (data.exists) {
                setEmailExists(true);
            } else {
                Alert.alert('Correo electrónico no encontrado', 'No existe una cuenta asociada a este correo electrónico.');
            }
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
            Alert.alert('Error', 'No se pudo verificar el correo electrónico. Por favor, intenta de nuevo más tarde.');
        } finally {
            setLoading(false); // Establece loading a false una vez finaliza la verificación
        }
    };

    const handleResetByEmail = async () => {
        if (correo.trim() === '') {
            Alert.alert('Error', 'Por favor, completa el campo de correo.');
            return;
        }

        try {
            const response = await fetch('https://apismartsweepers.vercel.app/enviarcorreo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    destinatario: correo,
                    asunto: 'Recuperación de contraseña',
                    cuerpo: 'Aquí está tu enlace de recuperación de contraseña: [Enlace]'
                })
            });

            if (response.ok) {
                Alert.alert('Correo electrónico enviado', 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
            } else {
                Alert.alert('Error', 'Hubo un problema al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error al enviar solicitud POST:', error);
            Alert.alert('Error', 'Hubo un problema al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleNavigateToVerifyUserQuestion = () => {
        navigation.navigate('VerifyUserQuestion', { correo });
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator style={styles.activityIndicator} size="large" color="#043464" />} 
            <Text style={styles.textIndicaciones}>Para reestablecer tu contraseña, valida tu correo electrónico</Text>
            <InputForm
                label="Correo electrónico"
                onInputChange={setCorreo}
                style={styles.input}
            />
            <View style={styles.buttonContainer}>
                <BotonUni text="      Verificar correo electrónico      " onPress={handleCheckEmail} style={styles.btnVerificar} customTextColor="#ECF0F1" customBackgroundColor="#043464" customBorderColor="#ECF0F1"  />
            </View>
            {emailExists && (
                <View style={styles.buttonContainer}>
                    <BotonUni text="Recuperar contraseña por pregunta secreta" onPress={handleNavigateToVerifyUserQuestion} />
                    <BotonUni text="Recuperar contraseña por correo electrónico" onPress={handleResetByEmail} />
                </View>
            )}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.regresar}>Regresar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Establece la posición relativa para poder posicionar el ActivityIndicator absolutamente
        marginTop: 20,
        padding: 16,
        backgroundColor: '#ECF0F1',
        paddingTop: 30,
        alignItems: 'center',
    },
    activityIndicator: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        zIndex: 9999, // Asegura que el ActivityIndicator esté por encima de todos los demás elementos
    },
    buttonContainer: {
        marginTop: 20,
    },
    textIndicaciones:{
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:20,
        paddingBottom:20,
    },
    btnVerificar:{
        paddingLeft:10,
        paddingRight:10,
    },
    input:{
        paddingTop: 40 
    },
    regresar: {
        fontSize: 16,
        color: '#043464',
        textDecorationLine: 'underline',
        margin: 20,
    },
});

export default ForgotPasswordScreen;

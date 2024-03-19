import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import InputForm from '../InputForm';
import { BotonUni } from '../Atomicos';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [correo, setCorreo] = useState('');
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleCheckEmail = async () => {
        if (correo.trim() === '') {
            Alert.alert('Error', 'Por favor, completa el campo de correo.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/email/' + correo);
            const data = await response.json();

            if (data.exists) {
                setEmailExists(true);
                setToken(data.token);
                setId(data._id);
            } else {
                Alert.alert('Correo electrónico no encontrado', 'No existe una cuenta asociada a este correo electrónico.');
            }
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
            Alert.alert('Error', 'No se pudo verificar el correo electrónico. Por favor, intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetByEmail = async () => {
        if (!emailExists) {
            Alert.alert('Error', 'Por favor, primero verifica tu correo electrónico.');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('https://apismartsweepers.vercel.app/enviarcorreo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ destinatario: correo, token: token })
            });

            const responseData = await response.json();

            if (response.ok) {
                Alert.alert('Correo enviado', responseData.message);
                navigation.navigate('VerifyToken', {
                    id: id
                });
            } else {
                Alert.alert('Error al enviar correo', responseData.error);
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            Alert.alert('Error', 'No se pudo enviar el correo electrónico. Por favor, intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
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
                <BotonUni text="      Verificar correo electrónico      " onPress={handleCheckEmail} style={styles.btnVerificar} customTextColor="#ECF0F1" customBackgroundColor="#043464" customBorderColor="#ECF0F1" />
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
        position: 'relative',
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
        zIndex: 9999,
    },
    buttonContainer: {
        marginTop: 20,
    },
    textIndicaciones: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 20,
    },
    btnVerificar: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
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

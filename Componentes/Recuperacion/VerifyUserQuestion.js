import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import InputForm from '../InputForm';
import { BotonUni, SelectOption } from '../Atomicos';
import { useNavigation } from '@react-navigation/native';

const VerifyUserQuestion = ({ route }) => {

    const navigation = useNavigation();
    const { correo } = route.params;
    const [userData, setUserData] = useState(null);
    const [load, setLoad] = useState(false);
    const [res, setRes] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/email/${correo}`);
                const obj = await res.json();
                if (obj.exists) {
                    setUserData(obj.data);
                    setLoad(true);
                    setSelectedOption(obj.data.pregunta_secreta)
                    console.log('Usuario cargado');
                } else {
                    Alert.alert('Usuario no encontrado', 'No se encontró ningún usuario con este correo electrónico.');
                }
            } catch (error) {
                console.error('Error al recuperar datos del usuario:', error);
                Alert.alert('Ocurrió un error:', error.message);
            }
        };

        fetchUserData();
    }, [correo]);

    const handleCheckIdentity = async () => {
        if (!res || !selectedOption) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: correo,
                    pregunta_secreta: selectedOption,
                    respuesta_secreta: res
                })
            });

            const result = await response.json();
            if (result.exists) {
                navigation.navigate('PasswordUpdateForm', {
                    correo: correo,
                });
            } else {
                Alert.alert('Identidad no verificada', 'No se ha podido verificar la identidad del usuario.');
            }
        } catch (error) {
            console.error('Error al verificar la identidad:', error);
            Alert.alert('Error', 'Hubo un problema al verificar la identidad. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    if (!load) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={'darkblue'} size={'large'} />
                <Text>Cargando datos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textIndicaciones}>Valida tu identidad</Text>
            <SelectOption
                label="Pregunta de recuperación"
                options={userData ? [userData.pregunta_secreta] : []}
                defaultOption={userData ? userData.pregunta_secreta : ''}
                onSelect={(option) => setSelectedOption(option)}
            />

            <InputForm label="Respuesta" onInputChange={setRes} />
            <View style={styles.buttonContainer}>
                <BotonUni text="      Verificar       " onPress={handleCheckIdentity} style={styles.btnVerificar} customTextColor="#ECF0F1" customBackgroundColor="#043464" customBorderColor="#ECF0F1" />
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.regresar}>Regresar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        padding: 16,
        backgroundColor: '#ECF0F1',
        paddingTop: 30,
        alignItems: 'center',
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
        marginTop: 40,
    },
    regresar: {
        fontSize: 16,
        color: '#043464',
        textDecorationLine: 'underline',
        margin: 20,
    },
});

export default VerifyUserQuestion;

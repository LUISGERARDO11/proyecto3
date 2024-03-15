import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { estilos } from './Estilos';
import InputForm from './InputForm';
import { BotonUni } from './Atomicos';

const PrimerPasoForm = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [numero, setNumero] = useState('');

    const handleBackToLogin = () => {
        navigation.navigate('Login');
    };

    const handleNext = () => {
        if (nombre.trim() === '' || correo.trim() === '' || numero.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (!correo.includes('@')) {
            alert('Ingrese un correo electrónico válido.');
            return;
        }

        if (!/^[\d]{10}$/.test(numero)) {
            alert('Ingrese un número de teléfono válido (10 dígitos exactos).');
            return;
        }

        navigation.navigate('SegundoPasoForm', {
            nombre: nombre,
            correo: correo,
            numero: numero
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.bigTextTitle}>Registro</Text>
            <Text style={styles.bigTextSubTitle}>Crea una nueva cuenta</Text>
            
            <Text style={styles.bigTextSubTitle}>Información personal</Text>
            <Text style={styles.bigTextSuSubbTitle}>1 de 3</Text>
            <View style={estilos.bottomContainer}>
                <InputForm label="Nombre" onInputChange={setNombre} />
                <InputForm label="Correo electrónico" inputType="email" onInputChange={setCorreo} secureTextEntryValue={false} />
                <InputForm label="Número de teléfono" inputType="numeric" onInputChange={setNumero} secureTextEntryValue={false} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <BotonUni text="Cancelar" onPress={handleBackToLogin} />
                <View style={{ width: 30 }} />
                <BotonUni text="Siguiente >" customTextColor="#ECF0F1" customBackgroundColor="#043464" customBorderColor="#ECF0F1" onPress={handleNext} />
            </View>
        </ScrollView>
    );
};

export default PrimerPasoForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
        marginTop: 40,
    },
    bigTextTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bigTextSubTitle: {
        fontSize: 24,
        paddingTop: 10,
        textAlign: 'center',
        paddingBottom: 15,
        fontWeight: 'bold',
    },
    bigTextSuSubbTitle:{
        fontSize: 17,
        textAlign: 'center',
        paddingBottom: 15,
        fontWeight: 'bold',

    }
});

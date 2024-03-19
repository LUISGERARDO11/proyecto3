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

    const handleNext = async () => {
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
    
        try {
            // Realizar la solicitud al servidor para verificar si existe un usuario con el correo proporcionado
            const response = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/email/${correo}`);
            const data = await response.json();
    
            if (data.exists) {
                // Si existe un usuario con el correo proporcionado, mostrar una alerta y no permitir continuar
                alert('Ya existe un usuario con ese correo electrónico. Por favor, utilice otro correo electrónico.');
            } else {
                // Si no existe un usuario con el correo proporcionado, continuar al siguiente paso del formulario
                navigation.navigate('SegundoPasoForm', {
                    nombre: nombre,
                    correo: correo,
                    numero: numero
                });
            }
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
            alert('Error al verificar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
        }
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

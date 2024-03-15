import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { BotonUni } from './Atomicos';
import InputForm from './InputForm';
import { estilos } from './Estilos';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import DropdownOptions from './DropdownOptions';

const SegundoPasoForm = ({ route }) => {
    const navigation = useNavigation(); // Inicializa useNavigation para obtener el objeto de navegación
    const { nombre, correo, numero} = route.params;
    const [pais, setPais] = useState('');
    const [estado, setEstado] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [colonia, setColonia] = useState('');
    const [calle, setCalle] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [referencia, setReferencia] = useState('');

    const handleBackToFirstStep = () => {
        navigation.navigate('Registro', {
            nombre: nombre,
            correo: correo,
            numero: numero,
        });
    };

    const handleNext = () => {
        // Validar que todos los campos estén llenos
        if (pais.trim() === '' || estado.trim() === '' || ciudad.trim() === '' || colonia.trim() === '' || calle.trim() === '' || codigoPostal.trim() === '' || referencia.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }
         // Enviar los datos al tercer paso
         navigation.navigate('TercerPasoForm', {
            nombre: nombre,
            correo: correo,
            numero: numero,
            pais: pais,
            estado: estado,
            ciudad: ciudad,
            colonia: colonia,
            calle: calle,
            codigoPostal: codigoPostal,
            referencia: referencia,
        });

    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.bigTextTitle}>Registro</Text>
            <Text style={styles.bigTextSubTitle}>Direccion</Text>
            <Text style={styles.bigTextSuSubbTitle}>2 de 3</Text>

            <View style={styles.inputPairContainer}>
                <View style={[styles.inputColumn, { marginLeft: 18 }]}>
                    <InputForm label="Pais" onInputChange={setPais} inputContainerWidth={150} />
                    <InputForm label="Ciudad" onInputChange={setCiudad} inputContainerWidth={150} />
                    <InputForm label="Calle" onInputChange={setCalle} inputContainerWidth={150} />
                </View>
                <View style={[styles.inputColumn, { marginRight: 16 }]}>
                    <InputForm label="Estado" onInputChange={setEstado} inputContainerWidth={150} />
                    <InputForm label="Colonia" onInputChange={setColonia} inputContainerWidth={150} />
                    <InputForm label="Codigo postal" onInputChange={setCodigoPostal} inputContainerWidth={150} inputType="numeric"/>
                </View>
            </View>

            <View style={estilos.bottomContainer}>
                <InputForm label="Referencia (Destino de entrega de productos)" onInputChange={setReferencia} />
            </View>
            

            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop:30 }}>
                <BotonUni text="Anterior" onPress={handleBackToFirstStep}  />
                <View style={{ width: 30 }} />
                <BotonUni
                    text="Siguiente >"
                    customTextColor="#ECF0F1"
                    customBackgroundColor="#043464"
                    customBorderColor="#ECF0F1"
                    onPress={handleNext} 
                />
            </View>
        </ScrollView>
    );
};

export default SegundoPasoForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
        marginTop: 40,
    },
    bigTextTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bigTextSubTitle: {
        fontSize: 24,
        paddingTop: 10,
        textAlign: 'center',
        paddingBottom: 15,
        fontWeight: 'bold',
    },
    inputPairContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        
    },
    inputColumn: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    bigTextSuSubbTitle:{
        fontSize: 17,
        textAlign: 'center',
        paddingBottom: 15,
        fontWeight: 'bold',
    }
});

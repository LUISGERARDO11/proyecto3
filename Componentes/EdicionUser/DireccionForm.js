import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'; // Importa Alert
import { BotonUni } from '../Atomicos';
import EditInputForm from './EditInputForm';
import { estilos } from '../Estilos';
import PerfilDir from '../PerfilDir';
import { useNavigation } from '@react-navigation/native';

const DireccionForm = ({ userData, onCancel }) => {
    const [showBackComponent, setShowBackComponent] = useState(false);
    const navigation = useNavigation();

    const [pais, setPais] = useState(userData.direccion.pais || ''); // Valor inicial para 'pais'
    const [estado, setEstado] = useState(userData.direccion.estado);
    const [ciudad, setCiudad] = useState(userData.direccion.ciudad);
    const [colonia, setColonia] = useState(userData.direccion.colonia);
    const [calle, setCalle] = useState(userData.direccion.calle);
    const [codigo_postal, setCodigo_Postal] = useState(userData.direccion.codigo_postal);
    const [referencia, setReferencia] = useState(userData.direccion.referencia);
    const [id, setId] = useState(userData._id);

    const handleBackPress = () => {
        setShowBackComponent(true);
    };
    if (showBackComponent) {
        return <PerfilDir />;
    }

    const handleNext = async () => { // Marca la función como async
        // Validar que todos los campos estén llenos
        if (
            pais.trim() === '' ||
            estado.trim() === '' ||
            ciudad.trim() === '' ||
            colonia.trim() === '' ||
            calle.trim() === '' ||
            codigo_postal.trim() === '' ||
            referencia.trim() === ''
        ) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/direccion/${id}`, { // Se utiliza el id en la URL
                method: 'PUT', // Se cambia el método a PUT para actualizar
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pais: pais, 
                    estado: estado,
                    ciudad: ciudad,
                    colonia: colonia,
                    calle: calle,
                    codigo_postal: codigo_postal,
                    referencia: referencia
                })
            });
            const data = await response.json();
            if (response.ok) {
                // Actualización exitosa
                console.log('Usuario actualizado correctamente:');
                Alert.alert('Éxito', 'La actualización se realizó correctamente.', [
                    { text: 'OK', onPress: () => handleBackPress() } // Redirige al componente anterior después de la actualización exitosa
                ]);
            } else {
                // Error al actualizar
                console.error('Error al actualizar usuario:', data.message);
                Alert.alert('Error', 'No se pudo actualizar. Por favor, inténtalo de nuevo más tarde.', [
                    { text: 'OK', onPress: () => handleBackPress() } // Redirige al componente anterior después de la actualización exitosa
                ]);
            }
        } catch (error) {
            // Error de red
            console.error('Error al conectar con el servidor:', error);
            Alert.alert('Error','Error al conectar con el servidor:', error, [
                { text: 'OK', onPress: () => handleBackPress() } // Redirige al componente anterior después de la actualización exitosa
            ]);
        }
        
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.bigTextTitle}>Edicion</Text>
            <Text style={styles.bigTextSubTitle}>Direccion</Text>

            <View style={styles.inputPairContainer}>
                <View style={[styles.inputColumn, { marginLeft: 18 }]}>
                    <EditInputForm label="Pais" onInputChange={setPais} inputContainerWidth={150} initialValue={userData.direccion.pais} />
                    <EditInputForm label="Ciudad" onInputChange={setCiudad} inputContainerWidth={150} initialValue={userData.direccion.ciudad} />
                    <EditInputForm label="Calle" onInputChange={setCalle} inputContainerWidth={150} initialValue={userData.direccion.calle} />
                </View>
                <View style={[styles.inputColumn, { marginRight: 16 }]}>
                    <EditInputForm label="Estado" onInputChange={setEstado} inputContainerWidth={150} initialValue={userData.direccion.estado} />
                    <EditInputForm label="Colonia" onInputChange={setColonia} inputContainerWidth={150} initialValue={userData.direccion.colonia} />
                    <EditInputForm label="Codigo postal" onInputChange={setCodigo_Postal} inputContainerWidth={150} inputType="numeric" initialValue={userData.direccion.codigo_postal} />
                </View>
            </View>

            <View style={estilos.bottomContainer}>
                <EditInputForm label="Referencia (Destino de entrega de productos)" onInputChange={setReferencia} initialValue={userData.direccion.referencia} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 30 }}>
                <BotonUni text="Cancelar" onPress={handleBackPress} />
                <View style={{ width: 30 }} />
                <BotonUni
                    text="Editar"
                    customTextColor="#ECF0F1"
                    customBackgroundColor="#043464"
                    customBorderColor="#ECF0F1"
                    onPress={handleNext} 
                />
            </View>
        </ScrollView>
    );
};

export default DireccionForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
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
    bigTextSuSubbTitle: {
        fontSize: 17,
        textAlign: 'center',
        paddingBottom: 15,
        fontWeight: 'bold',
    },
});

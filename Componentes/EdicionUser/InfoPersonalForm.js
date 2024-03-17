import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'; // Importa Alert
import { BotonUni } from '../Atomicos';
import EditInputForm from './EditInputForm';
import { estilos } from '../Estilos';
import PerfilInfoPerso from '../PerfilInfoPerso';
import { useNavigation } from '@react-navigation/native';

const PersonalInfoForm = ({ userData, onCancel }) => {
    const [showBackComponent, setShowBackComponent] = useState(false);
    const navigation = useNavigation();

    const [nombre, setNombre] = useState(userData.nombre_completo || '');
    const [correo, setCorreo] = useState(userData.correo || '');
    const [numero, setNumero] = useState(userData.telefono || '');


    const [id, setId] = useState(userData._id);

    const handleBackPress = () => {
        setShowBackComponent(true);
    };
    if (showBackComponent) {
        return <PerfilInfoPerso />;
    }

    const handleNext = async () => { // Marca la función como async
        // Validar que todos los campos estén llenos
        if (
            nombre.trim() === '' ||
            correo.trim() === '' ||
            numero.trim() === '' 
        ) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/datos/${id}`, { // Se utiliza el id en la URL
                method: 'PUT', // Se cambia el método a PUT para actualizar
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_completo:nombre,
                    correo:correo,
                    telefono:numero
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
            <Text style={styles.bigTextSubTitle}>Información Personal</Text>
            <View style={estilos.bottomContainer}>
                <EditInputForm label="Nombre" onInputChange={setNombre} initialValue={userData.nombre_completo} />
                <EditInputForm label="Correo electrónico" inputType="email" onInputChange={setCorreo} secureTextEntryValue={false} initialValue={userData.correo} />
                <EditInputForm label="Número de teléfono" inputType="numeric" onInputChange={setNumero} secureTextEntryValue={false} initialValue={userData.telefono} />
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

export default PersonalInfoForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
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

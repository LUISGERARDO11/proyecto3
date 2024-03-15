import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { estilos } from './Estilos';

const InputForm = ({ label, onInputChange, secureTextEntryValue, inputType, inputContainerWidth }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        validateInput();
    }, [value]);

    const validateInput = () => {
        if (value.trim() === '') {
            setError('Por favor, complete este campo');
        } else {
            setError('');

            if (inputType === 'email') {
                if (!value.includes('@')) {
                    setError('Ingrese un correo electrónico válido');
                }
            } else if (inputType === 'numeric') {
                if (value.length > 10) {
                    setError('El número no debe exceder los 10 caracteres');
                    // Truncar el valor si supera los 10 caracteres
                    setValue(value.substring(0, 10));
                }
            }
        }
    };

    const handleBlur = () => {
        validateInput();
    };

    const handleChange = (text) => {
        // Solo actualizar el valor si no se ha alcanzado el límite de caracteres
        if (text.length <= 10 || inputType !== 'numeric') {
            setValue(text);
            if (onInputChange) {
                onInputChange(text);
            }
        }
    };

    let keyboardType = 'default';
    if (inputType === 'email') {
        keyboardType = 'email-address';
    } else if (inputType === 'numeric') {
        keyboardType = 'numeric';
    }

    // Establecer el ancho del contenedor de entrada
    const inputContainerStyle = inputContainerWidth ? { ...estilos.inputContainer, width: inputContainerWidth } : estilos.inputContainer;

    return (
        <View style={inputContainerStyle}>
            <Text style={estilos.label}>{label}</Text>
            <TextInput 
                style={estilos.input}
                placeholder={`Ingrese su ${label.toLowerCase()}`}
                value={value}
                onChangeText={handleChange}
                onBlur={handleBlur}
                secureTextEntry={secureTextEntryValue}
                keyboardType={keyboardType}
                maxLength={inputType === 'numeric' ? 10 : undefined} // Limitar la longitud solo si es numérico
            />
            {error !== '' && <Text style={estilos.errorMessage}>{error}</Text>}
        </View>
    );
};

export default InputForm;

// LogoutButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const LogoutButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Cerrar sesión</Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;

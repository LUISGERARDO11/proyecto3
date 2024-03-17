import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CardHome = ({ nombre, foto, descripcion }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.userInfo}>
                <Image source={{ uri: foto }} style={styles.userImage} />
                <Text style={styles.userName}>{nombre}</Text>
            </View>
            <Text style={styles.descripcion}>{descripcion}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingBottom:10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    descripcion: {
        fontSize: 14,
    },
});

export default CardHome;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductList = ({ url, label }) => {
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(obj => {
                setData(obj);
                setLoad(true);
            })
            .catch(err => Alert.alert('Error al consultar: ' + err));
    }, [url]);

    const navigateToProductDetail = (id) => {
        navigation.navigate('ProductDetail', { id });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigateToProductDetail(item._id)}
            style={styles.card}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text style={styles.productName}>{item.nombre_producto}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{label}</Text>
            {load ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={'darkblue'} size={'large'} />
                    <Text>Cargando datos...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingBottom:15
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    card: {
        width: 200,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
    },
    productName: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: 5,
        zIndex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginBottom: 10,
    },
});

export default ProductList;

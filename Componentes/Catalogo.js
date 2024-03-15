import { Text, View, Image, ActivityIndicator, FlatList, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { estilos } from './Estilos'
import { useNavigation } from '@react-navigation/native'


const Catalogo = () => {
    const nav=useNavigation()
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(obj => {
                setData(obj);
                setLoad(true);
            })
            .catch(err => Alert.alert('Error al consultar: ' + err));
    }, []);

    const UScreen = () => {
        return (
            <View>
                <ActivityIndicator color={'darkblue'} size={'large'} />
                <Text>Cargando datos...</Text>
            </View>
        );
    };

    const LScreen = () => {
        return (
            <View>
                <FlatList
                    data={data}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({ item }) => <Card
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        id={item.id}
                        />}
                    contentContainerStyle={{ paddingBottom: 110 }}
                />
                    
            </View>
        );
    };

    const Card = ({ title, price, image, id }) => {
        return (
            <View style={estilos.item}>
                <TouchableOpacity 
                onPress={()=>{
                    nav.navigate('ProductDetail',{id:id})
                }}
                style={estilos.imageContainer}> 

                    <Image style={estilos.imagen} source={{ uri: image }} />
                </TouchableOpacity>
                <View style={estilos.textContainer}>
                    <Text style={[estilos.text ,{color:'#6e6e6e'}]} >{title}</Text>
                    <Text style={estilos.text}>${price} MXN</Text>
                </View>
            </View>
        );
    };

    return (
        <View>
            <Text style={[estilos.text ,{fontSize:30, padding:10}]}>Productos</Text>
            {load ? <LScreen /> : <UScreen />}
        </View>
    );
};

export default Catalogo;
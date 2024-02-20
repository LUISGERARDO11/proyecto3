import { Text, View, Image, ActivityIndicator, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { estilos } from './Estilos';

const PersonajesDisney = () => {
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetch('https://api.disneyapi.dev/character?page=1&pageSize=20')
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
                    data={data.data}
                    renderItem={({ item }) => <Card
                        nombre={item.name}
                        peliculas={item.films}
                        image={item.imageUrl} />}
                    keyExtractor={item => item._id.toString()} 
                    contentContainerStyle={{ paddingBottom: 100 }} // Agregar un margen inferior adicional
                    />
            </View>
        );
    };

    const Card = ({ nombre, image,peliculas}) => {
        return (
            <View style={estilos.cardItem}>
                <View style={estilos.imgItem}> 
                    <Image style={{ height: 130, width: 130,borderRadius: 10 }} source={{ uri: image }} />
                </View>                
                <View style={estilos.infoItem}> 
                    <Text style={estilos.textNameItem}>{nombre}</Text>
                    <Text numberOfLines={5} ellipsizeMode="tail" style={estilos.textInfoItem}>Apariciones : {peliculas} </Text>
                </View>

            </View>
        );
    };

    return (
        <View style={estilos.container}>
            <Text style={estilos.titulo}>Personajes de Disney</Text>
            {load ? <LScreen /> : <UScreen />}
        </View>
    );
};

export default PersonajesDisney;
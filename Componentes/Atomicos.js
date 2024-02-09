import {  Pressable, StyleSheet, Text, Alert, TextInput, View } from 'react-native';
import { estilos } from './Estilos';


export const BotonNum = ({ texto, estiloTexto, accion }) => {
    return (
        <Pressable style={({ pressed }) => [{
        }, estilos.botonNum]}

            onPress={accion}
        >
            <Text style={StyleSheet.compose(estilos.textoBoton, { fontWeight: estiloTexto, })}>{texto}</Text>
        </Pressable>
    )
}
export const Boton = ({ texto, estiloTexto, accion }) => {
    return (
        <Pressable style={({ pressed }) => [{
        }, estilos.boton]}

            onPress={accion}
        >
            <Text style={StyleSheet.compose(estilos.textoBoton, { fontWeight: estiloTexto, })}>{texto}</Text>
        </Pressable>
    )
}

export const Caja=({valor})=>{
    return(
        <View style={estilos.estiloCaja}>
            <Text style={estilos.textoCaja}>{valor}</Text>
        </View>
    )
}
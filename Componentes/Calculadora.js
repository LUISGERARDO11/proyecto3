import React, { useState } from "react";
import { Button, Pressable, StyleSheet, Text, Alert, TextInput, View } from 'react-native';

export const Calculadora = () => {
    const [calculadora, setcalculadora] = useState("0");

    const funcion7 = () => {
        if (calculadora === "0") {
            setcalculadora(7);
        } else {
            setcalculadora(calculadora + "7");
        }
    }
    const funcion8 = () => {
        if (calculadora === "0") {
            setcalculadora(8);
        } else {
            setcalculadora(calculadora + "8");
        }
    }
    const funcion9 = () => {
        if (calculadora === "0") {
            setcalculadora(9);
        } else {
            setcalculadora(calculadora + "9");
        }
    }
    const funcion4 = () => {
        if (calculadora === "0") {
            setcalculadora("4");
        } else {
            setcalculadora(calculadora + "4");
        }
    }
    const funcion5 = () => {
        if (calculadora === "0") {
            setcalculadora("5");
        } else {
            setcalculadora(calculadora + "5");
        }
    }
    const funcion6 = () => {
        if (calculadora === "0") {
            setcalculadora("6");
        } else {
            setcalculadora(calculadora + "6");
        }
    }
    const funcion1 = () => {
        if (calculadora === "0") {
            setcalculadora("1");
        } else {
            setcalculadora(calculadora + "1");
        }
    }
    const funcion2 = () => {
        if (calculadora === "0") {
            setcalculadora("2");
        } else {
            setcalculadora(calculadora + "2");
        }
    }
    const funcion3 = () => {
        if (calculadora === "0") {
            setcalculadora("3");
        } else {
            setcalculadora(calculadora + "3");
        }
    }
    const funcion00 = () => {
        if (calculadora === "0") {
            setcalculadora("0");
        } else {
            setcalculadora(calculadora + "00");
        }
    }
    const funcion0 = () => {
        if (calculadora === "0") {
            setcalculadora("0");
        } else {
            setcalculadora(calculadora + "0");
        }
    }
    const funcionc=()=>{
        setcalculadora("0");
    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.texto}>{calculadora}</Text>
            <View style={estilos.contenedorBotones}>
                <Boton
                    texto={'C'}
                    estiloTexto={'bold'}
                    accion={funcionc}
                />
                <Boton
                    texto={'%'}
                    estiloTexto={'bold'}
                />
                <Boton
                    texto={'c'}
                    estiloTexto={'bold'}
                />
                <Boton
                    texto={'/'}
                    estiloTexto={'bold'}
                />
                <BotonNum
                    texto={'7'}
                    accion={funcion7}
                />
                <BotonNum
                    texto={'8'}
                    accion={funcion8}
                />
                <BotonNum
                    texto={'9'}
                    accion={funcion9}
                />
                <Boton
                    texto={'X'}
                />
                <BotonNum
                    texto={'4'}
                    accion={funcion4}
                />
                <BotonNum
                    texto={'5'}
                    accion={funcion5}
                />
                <BotonNum
                    texto={'6'}
                    accion={funcion6}
                />
                <Boton
                    texto={'---'}
                />
                <BotonNum
                    texto={'1'}
                    accion={funcion1}
                />
                <BotonNum
                    texto={'2'}
                    accion={funcion2}
                />
                <BotonNum
                    texto={'3'}
                    accion={funcion3}
                />
                <Boton
                    texto={'+'}
                />
                <BotonNum
                    texto={'00'}
                    accion={funcion00}
                />
                <BotonNum
                    texto={'0'}
                    accion={funcion0}
                />
                <BotonNum
                    texto={'.'}
                    //accion={funcionpunto}
                />
                <Boton
                    texto={'='}
                />
            </View>
        </View>
    );
};

export const BotonNum = ({ texto, estiloTexto, accion }) => {
    return (
        <Pressable style={({ pressed }) => [{
        }, estilos.botonNum]}

            onPress={accion}
        >
            <Text style={StyleSheet.compose(estilos.TextoB, { fontWeight: estiloTexto, })}>{texto}</Text>
        </Pressable>
    )
}
export const Boton = ({ texto, estiloTexto, accion }) => {
    return (
        <Pressable style={({ pressed }) => [{
        }, estilos.boton]}

            onPress={accion}
        >
            <Text style={StyleSheet.compose(estilos.TextoB, { fontWeight: estiloTexto, })}>{texto}</Text>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    texto: {
        flex: 2,
        color: '#141718',
        fontSize: 60,
        textAlign: 'right',
        backgroundColor: '#f7f7f7',
        textAlignVertical: 'center',
    },
    contenedorBotones: {
        flex: 5,
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    TextoB: {
        color: '#141718',
        fontSize: 34
    },
    botonNum: {
        width: 80, // Tamaño del botón
        height: 80, // Tamaño del botón
        borderRadius: 50, // Hace el botón completamente redondo (la mitad del ancho o alto)
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ffffff',
        margin: '1%',
        marginLeft: 5,
        marginBottom: 15,
    },
    boton: {
        width: 80, // Tamaño del botón
        height: 80, // Tamaño del botón
        borderRadius: 50, // Hace el botón completamente redondo (la mitad del ancho o alto)
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#adacac',
        borderWidth: 1,
        borderColor: '#adacac',
        margin: '1%',
        marginLeft: 5,
        marginBottom: 15,
    },
});

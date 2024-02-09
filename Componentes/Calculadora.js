import React, { useState } from "react";
import { View } from 'react-native';
import { BotonNum,Boton,Caja } from "./Atomicos";
import { estilos } from './Estilos';

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
            <View>
                <Caja
                    valor={calculadora}
                />
            </View>
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


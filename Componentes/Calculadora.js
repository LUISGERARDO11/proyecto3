import React, { useState } from "react";
import { View } from 'react-native';
import { BotonNum,Boton,Caja } from "./Atomicos";
import { estilos } from './Estilos';

export const Calculadora = () => {
    const [calculadora, setcalculadora] = useState("0");
    const [operacion, setoperacion] = useState("");
    const [value1, setvalue1] = useState(0);


    const funcion7 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion8 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion9 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion4 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion5 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion6 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion1 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion2 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion3 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion00 = (num) => {
        if (calculadora === "0") {
            setcalculadora("0");
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcion0 = (num) => {
        if (calculadora === "0") {
            setcalculadora(num.toString());
        } else {
            setcalculadora(calculadora + num);
        }
    }
    const funcionc=()=>{
        setvalue1(0);
        setcalculadora("0");
        setoperacion("");
    }
    const funcioncuno=()=>{
        if(calculadora.length>0){
            var nuevaCal= calculadora.slice(0,-1);
            setcalculadora(nuevaCal);
            if(nuevaCal.length==0)
                setcalculadora("0");
        }
    }
    const funcionporcentaje=()=>{
        setcalculadora(calcularPorcentaje(parseFloat(calculadora)))
    }
    const opMas=(op)=>{
        setoperacion(op);
        setvalue1(parseFloat(calculadora));
        setcalculadora("0");  
    }
    const opMenos=(op)=>{
        setoperacion(op);
        setvalue1(parseFloat(calculadora));
        setcalculadora("0");  
    }
    const opDivision=(op)=>{
        setoperacion(op);
        setvalue1(parseFloat(calculadora));
        setcalculadora("0");  
    }
    const opMultiplicacion=(op)=>{
        setoperacion(op);
        setvalue1(parseFloat(calculadora));
        setcalculadora("0");  
    }
    const funcionpunto=()=>{
        if(!calculadora.includes('.')){
            setcalculadora(calculadora+".")
        }
    }
    const igual=()=>{
        switch (operacion) {
            case "division":
                setcalculadora(calculaDivision(value1, parseFloat(calculadora)).toString());
                break;
            case "multiplicacion":
                setcalculadora(calculaMultiplicacion(value1, parseFloat(calculadora)).toString());
                break;
            case "menos":
                setcalculadora(calculaResta(value1, parseFloat(calculadora)).toString());
                break;
            case "suma":
                setcalculadora(calculaSuma(value1, parseFloat(calculadora)).toString());
                break;
            default:
                break;
        }
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
                    accion={funcionporcentaje}
                />
                <Boton
                    texto={'c'}
                    estiloTexto={'bold'}
                    accion={funcioncuno}
                />
                <Boton
                    texto={'/'}
                    estiloTexto={'bold'}
                    accion={()=>{ opDivision('division') }}
                />
                <BotonNum
                    texto={'7'}
                    accion={()=>{ funcion7('7') }}
                />
                <BotonNum
                    texto={'8'}
                    accion={()=>{ funcion8('8') }}
                />
                <BotonNum
                    texto={'9'}
                    accion={()=>{ funcion9('9') }}
                />
                <Boton
                    texto={'X'}
                    estiloTexto={'bold'}
                    accion={()=>{ opMultiplicacion('multiplicacion') }}
                />
                <BotonNum
                    texto={'4'}
                    accion={()=>{ funcion4('4') }}
                />
                <BotonNum
                    texto={'5'}
                    accion={()=>{ funcion5('5') }}
                />
                <BotonNum
                    texto={'6'}
                    accion={()=>{ funcion6('6') }}
                />
                <Boton
                    texto={'---'}
                    estiloTexto={'bold'}
                    accion={()=>{ opMenos('menos') }}
                />
                <BotonNum
                    texto={'1'}
                    accion={()=>{ funcion1('1') }}
                />
                <BotonNum
                    texto={'2'}
                    accion={()=>{ funcion2('2') }}
                />
                <BotonNum
                    texto={'3'}
                    accion={()=>{ funcion3('3') }}
                />
                <Boton
                    texto={'+'}
                    accion={()=>{ opMas('suma') }}
                />
                <BotonNum
                    texto={'00'}
                    accion={()=>{ funcion00('00') }}
                />
                <BotonNum
                    texto={'0'}
                    accion={()=>{ funcion0('0') }}
                />
                <BotonNum
                    texto={'.'}
                    accion={funcionpunto}
                />
                <Boton
                    texto={'='}
                    accion={igual}
                />
            </View>
        </View>
    );
};

const calculaSuma=(v1,v2)=>{
    return v1+v2
}
const calculaResta=(v1,v2)=>{
    return v1-v2
}
const calculaDivision=(v1,v2)=>{
    return v1/v2
}
const calculaMultiplicacion=(v1,v2)=>{
    return v1*v2
}
const calcularPorcentaje=(v1)=>v1/100;

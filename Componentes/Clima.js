import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colores } from './Estilos'
import { estilos } from './Estilos'

const Clima = () => {
    const [data,setData]=useState(null)
    const [load,setLoad]=useState(false)

    useEffect(()=>{
        fetch('https://api.weatherapi.com/v1/forecast.json?key=5117bcbba2b6463c9f8172627231110&q=huejutla&days=5&aqi=no&alerts=no&lang=es')
        .then(res=>res.json())
        .then(obj=>{
            setData(obj)
            setLoad(true)
        })
    },[])

    const UScreen=()=>{
        return(
            <View >
                <ActivityIndicator size={'large'} color={colores.color1} />
                <Text>Cargando datos...</Text>
            </View>
        )
    }

    const Card=({fecha,iko,min,max})=>{
        return(
            <View style={estilos.cardItemClima}>
                <Text style={estilos.dateItem}>{fecha}</Text>
                <Image style={estilos.imgItemCard} source={{ uri: 'https:' + iko }} />
                <Text style={estilos.tempItem}>{min}°C / {max}°C</Text>
            </View>
        )
    }
    const LScreen=()=>{
        return(
            <View > 
                <Text style={estilos.locate}>{data.location.name}</Text>
                <Text style={estilos.temp}>{data.current.temp_c}°</Text>
                <Text style={estilos.condicion}>
                    {data.current.condition.text} {' '}
                    {data.forecast.forecastday[0].day.maxtemp_c}°C {' '}
                    / {data.forecast.forecastday[0].day.mintemp_c}°C
                </Text>

                <FlatList
                style={estilos.lista}
                data={data.forecast.forecastday}
                renderItem={({item})=>
                <Card max={item.day.maxtemp_c} 
                fecha={item.date}
                min={item.day.mintemp_c}
                iko={item.day.condition.icon}/>}
                />
            </View>
        )
    }

  return (
    <View style={estilos.container}>
            <Text>Clima</Text>
            {load?LScreen():UScreen()}
    </View>
  )
}

export default Clima
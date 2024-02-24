import { View, Text, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { estilos } from './Estilos'

const ProductDetail = () => {
    const [prod,setProd]=useState(null)
    const [load,setLoad]=useState(false)

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products/2')
        .then((res)=>res.json())
        .then((obj)=>{
            setProd(obj)
            setLoad(true)
        })
        .catch((err)=>Alert.alert('Ocurrio un error : '+err))
    },[])

    const ColorSelector=()=>{
        return(
            <View>

            </View>
        )
    }
    const SizeSelector=()=>{
        return(
            <View style={estilos.container}>
                <Text>Talla</Text>
                <Text style={{fontWeight:'bold',fontSize:20,marginVertical:5}}>Grande</Text>
            </View>
        )
    }
    const Quantity=()=>{
        const [quantity, setQuantity] = useState(1);

        const decreaseQuantity = () => {
            if (quantity > 0) {
                setQuantity(prev => prev - 1);
            }
        };
    
        const increaseQuantity = () => {
            if (quantity < 5) {
                setQuantity(prev => prev + 1);
            }
        };
    
        return (
            <View style={estilos.quantity}>
                <TouchableOpacity style={estilos.qtBtn} onPress={decreaseQuantity}>
                    <Text style={{fontSize:25}}>---</Text>
                </TouchableOpacity>
                <Text style={estilos.quantityText}>{quantity}</Text>
                <TouchableOpacity style={estilos.qtBtn} onPress={increaseQuantity}>
                    <Text style={{fontSize:25}}> +</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const screenL=()=>{
        return(
            
        <View>
            <View style={estilos.topContainer}>
                <View>
                    <Text style={estilos.bigText}>{prod.title} </Text>
                    <Text style={estilos.smallText}>{prod.category} </Text>
                </View>
                <View>
                   
                    <Text style={estilos.smallText}>Precio</Text>
                    <Text style={estilos.bigText}>$ {prod.price} MXN</Text>
                </View>
                 
            </View>

            <View style={estilos.bottomContainer}>
                <View style={estilos.imgContainer}>
                    <Image style={estilos.imagenDetail} source={{uri:prod.image}}  />
                </View>
                <View style={estilos.variants}>
                    <ColorSelector/>
                    <SizeSelector/>
                </View>
                <View style={estilos.descriptionContainer}> 
                    <Text style={{fontWeight:'bold',marginBottom:6,fontSize:17}}>Descripcion</Text>
                    <Text style={{fontSize:15}}>{prod.description}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Quantity />
                    <TouchableOpacity style={[estilos.btn, {backgroundColor:'#f0c31f'}]}>
                        <Text style={estilos.btnText}>Comprar Ahora</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }
   
    const screenU=()=>{
        return(
            <Text>Cargando datos...</Text>
        )
    }
  return (
    <View style={{backgroundColor:'#f0c31f',}}>
        {load?screenL():screenU()}
    </View>
  )
}
export default ProductDetail
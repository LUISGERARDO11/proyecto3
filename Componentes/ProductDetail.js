import { View, Text, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { estilos } from './Estilos'

const ProductDetail = ({route}) => {
    const [prod,setProd]=useState(null)
    const [load,setLoad]=useState(false)

    const {id}=route.params

    useEffect(()=>{
       fetch('https://fakestoreapi.com/products/'+id)
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
            if (quantity > 1) {
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
            
        <View style={{backgroundColor:'#043464',}}>
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
                    <TouchableOpacity style={[estilos.btn, {backgroundColor:'#FF6600'}]}>
                        <Text style={estilos.btnText}>Comprar Ahora</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }
   
    const UScreen = () => {
        return (
            <View>
                <ActivityIndicator color={'darkblue'} size={'large'} />
                <Text>Cargando datos...</Text>
            </View>
        );
    };

  return (
    <View style={{flex:1}}>
        {load?screenL():UScreen()}
    </View>
  )
}
export default ProductDetail
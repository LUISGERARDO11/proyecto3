import { View, Text, Image, Alert, TouchableOpacity, ActivityIndicator, StyleSheet,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
const {width, height}= Dimensions.get('window')

const ProductDetail = ({route}) => {
    const [prod,setProd]=useState(null)
    const [load,setLoad]=useState(false)

    const {id}=route.params

    useEffect(()=>{
       fetch('https://apismartsweepers.vercel.app/api/producto/'+id)
        .then((res)=>res.json())
        .then((obj)=>{
            setProd(obj)
            setLoad(true)
        })
        .catch((err)=>Alert.alert('Ocurrio un error : '+err))
    },[])

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
            <View style={styles.quantity}>
                <TouchableOpacity style={styles.qtBtn} onPress={decreaseQuantity}>
                    <Text style={{fontSize:25}}>---</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.qtBtn} onPress={increaseQuantity}>
                    <Text style={{fontSize:25}}> +</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const screenL = () => {
        return (
            <View style={styles.container}> 
                <View style={{ backgroundColor: '#043464', flex: 1 }}>
                    <View style={styles.topContainer}>
                        <View>
                            <Text style={styles.bigText}>{prod.nombre_producto} </Text>
                            <Text style={styles.smallText}>Productos electronicos de limpieza </Text>
                        </View>
                        <View>
    
                            <Text style={styles.smallText}>Precio</Text>
                            <Text style={styles.bigText}>$ {prod.precio_venta} MXN</Text>
                        </View>
    
                    </View>
    
                    <View style={styles.bottomContainer}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.imagenDetail} source={{ uri: prod.imagen }} />
                        </View>
                        <View style={styles.variants}>
                            <Text style={{ fontSize: 15 }}>Color</Text>
                            <Text style={{ fontSize: 15 }}>{prod.color}</Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 6, fontSize: 17 }}>Descripcion</Text>
                            <Text style={{ fontSize: 15 }}>{prod.descripcion}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Quantity />
                            <TouchableOpacity style={[styles.btn, { backgroundColor: '#FF6600' }]}>
                                <Text style={styles.btnText}>Comprar Ahora</Text>
                            </TouchableOpacity>
                        </View>
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
    <View style={styles.container}>
        {load?screenL():UScreen()}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    topContainer:{
        height:height/3,
        padding:16,
        justifyContent:'space-between',
    },
    bottomContainer:{
        flex:1,
        padding:16,
        backgroundColor:'#ECF0F1',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        paddingTop:100,
    },
    bigText:{
        fontSize:24,
        fontWeight:'bold',
        color:'#fff',
    },
    smallText:{
        color:'#fff',
    },
    imagenDetail:{
        //width:180,
        //height:240,
        width:width/1.9,
        height:width/1.4,
    },
    imgContainer:{
        position:'absolute',
        zIndex:999,
        top:-150,
        alignSelf:'flex-end',
        paddingRight:5,
    },
    variants:{
        marginVertical:20,
    },
    descriptionContainer:{
        marginVertical:10,
    },
    quantity:{
        flexDirection:'row',
        marginVertical:20,
        alignItems:'center',
        marginRight:10,
        paddingRight:20,
    },
    qtBtn:{
        borderWidth:1,
        borderRadius:8,
        color:'#ccc',
        width:34,
        height:34,
        justifyContent:'center',
        alignItems:'center',
    },
    quantityText:{
        fontSize:18,
        fontWeight:'bold',
        marginHorizontal:10,
    },
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:45,
        borderRadius:10,
    },
    btnText:{
        fontWeight:'bold',
        fontSize:18,
        color:'#fff',
    },
});

export default ProductDetail
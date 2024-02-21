import {StyleSheet} from 'react-native';

export const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101624',
        color:'#fff',
    },
    //ESTILOS DEL COMPONENTE CALCULADORA


    contenedorBotones: {
        flex: 2,
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textoCaja: {
        color: '#141718',
        fontSize: 60,
        textAlign: 'right',
    },
    textoBoton: {
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
        margin: '1.3%',
        marginLeft: 5,
        marginBottom: 20,
    },
    estiloCaja:{
        height:200,
        margin:5,
        alignItems:'flex-end',
        justifyContent:'center',
        padding:10,
        backgroundColor: '#f7f7f7',
    },

    //ESTILOS DEL COMPONENTE PERSONAJESDISNEY
    titulo:{
        fontSize:25,
        padding:7,
        fontWeight: 'bold',
    },
    cardItem:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#adacac',
        borderRadius: 10,
        marginBottom:15,
        
    },
    imgItem:{
        margin:10,   
    },
    infoItem:{
        flex: 2,
        margin:7,
        fontSize:25,
    },
    textNameItem:{
        fontWeight: 'bold',
        fontSize:20,
    },
    textInfoItem:{
        fontSize:16,
    },


    //ESTILOS DEL COMPONENTE CLIMA
    locate:{
        color:'#CCCCCC',
        fontWeight: 'light',
        fontSize:30,
        paddingTop:5,
        paddingLeft:10,
        paddingBottom:30,
    },
    temp:{
        color:'#fff',
        fontWeight: 'light',
        fontSize:100,
        textAlign:'center',
        paddingTop:30,
    },
    condicion:{
        color:'#fff',
        fontWeight: 'light',
        fontSize:18,
        textAlign:'center',
    },
    lista: {
        borderRadius: 10, // Ajusta el radio de borde según sea necesario
        borderWidth: 1, // Puedes agregar un borde si lo deseas
        borderColor:'#12161f',
        backgroundColor: '#11151f',
        marginTop:30,
        padding:5,
    },
    cardItemClima:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
    },
    dateItem:{
        
        color:'#fff',
        fontWeight: 'light',
        fontSize:17,
        marginVertical: 12, // Espacio vertical entre cada elemento de fecha
        marginLeft:10,
    },
    tempItem:{
        color:'#fff',
        fontWeight: 'light',
        fontSize:17,
        marginVertical: 12, // Espacio vertical entre cada elemento de fecha
        marginRight:10,
    },
    imgItemCard:{
        height: 50, 
        width: 50 
    }

});

export const colores={
    color1: '#9da4c4',
    color2: '#8189a8' ,
    color3: '#666e8b',
    color4: '#4a526f',
    color5: '#2f3752'
}

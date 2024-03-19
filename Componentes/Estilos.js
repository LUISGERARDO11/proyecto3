import {Dimensions, StyleSheet} from 'react-native';
const {width, height}= Dimensions.get('window')

export const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
        

    },
    container2: {
        flex: 1,
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
        marginLeft:35,
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
    cardItemHour:{
        flexDirection: 'column',
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
        marginLeft:10,
    },
    imgItemCard:{
        height: 50, 
        width: 50 
    }



    //ESTILOS PARA EL COMPONENTE CATALOGO DE LA APP DATA ATHLETICS

    ,item:{
        width:width/2-24,
        marginLeft:16,
        marginBottom:16,
        backgroundColor: '#ECF0F1',
        
    },
    imageContainer:{
        height:140,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#043464', //COLOR DE FONDO DE
        borderRadius:14,
    },
    imagen:{
        height:130,
        width:130,
        resizeMode:'center',
    },
    textContainer:{
        marginVertical:4,
            
    },
    text:{
        fontWeight:'bold',
        fontSize:15,
    },




     //ESTILOS PARA EL COMPONENTE DE DETALLES DE PRODUCTO DE LA APP DATA ATHLETICS
    topContainer:{
        height:height/3,
        padding:16,
        justifyContent:'space-between',
    },
    bottomContainer:{
        padding:16,
        backgroundColor:'#ECF0F1',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        paddingTop:100,
    },
    bigText:{
        fontSize:28,
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
        flexDirection:'row',
        marginVertical:20,
        justifyContent:'space-between',
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


    //ESTILOS PARA EL COMPONENTE LOGIN PARA LA APLICACION DATA ATHLETICS
    topContainerLogin:{
        height:height/5,
        padding:16,
        justifyContent:'space-between',
    },
    bottomContainerLogin:{
        padding:16,
        backgroundColor:'#ECF0F1',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        paddingTop:30,
        paddingBottom:180,
        display:'flex',
        alignContent:'center',
        alignItems:'center',
    },
    bigTextTitle:{
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center'
    },
    bigTextSubTitle:{
        fontSize:24,
        paddingTop:10,
        textAlign:'center',
        paddingBottom:15,
        fontWeight:'bold',
    },
    textForget:{
        fontSize:17,
        fontWeight:'bold',
        textAlign:'center',
        color:'#FF6600',
        paddingTop:10,
    },
    inputContainer:{
        paddingTop:10,
        height:90,
        width:300,
        paddingLeft:10,
    },
    inputContainer2:{
        paddingTop:8,
        width:300,
        paddingLeft:10,
    },
    label:{
        fontSize:20,
        fontWeight:'bold',
    },
    input:{
        fontSize:20,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        height:40,
        padding:10,
    },
    errorMessage:{
        fontSize:14,
        fontWeight:'bold',
        color:'red',
    },
    loginButton:{
        fontSize:22,
        width:250,
        fontWeight:'bold',
        borderRadius: 10,
        borderColor: '#FF6600',
        borderWidth: 1,
        height:50,
        padding:12,
        paddingBottom:15,
        textAlign:'center',
        backgroundColor: '#FF6600',
        color:'#fff',
        marginTop:15,
    },
    createAccountText:{
        marginTop:25,
        fontSize:18,
    },    
    bottomContainer:{
        padding:4,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        display:'flex',
        alignContent:'center',
        alignItems:'center',
    },


    buttonUni: {
        paddingVertical: 12,
        paddingHorizontal: 35,
        borderWidth: 1.2,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonTextUni: {
        fontWeight: 'bold',
    },
    checkbox:{
        marginTop:5,
        marginLeft:10,

    },

});

export const colores={
    color1: '#9da4c4',
    color2: '#8189a8' ,
    color3: '#666e8b',
    color4: '#4a526f',
    color5: '#2f3752'
}

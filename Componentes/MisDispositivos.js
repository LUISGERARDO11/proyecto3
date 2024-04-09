import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { MaterialIcons as TrashIcon } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MisDispositivos() {
  const [userData, setUserData] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [dispositivos, setDispositivos] = useState([]);
  const [datosDispositivos, setDatosDispositivos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState(null);
  const [temperatura, setTemperatura] = useState(0);
  const [humedad, setHumedad] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem('userData');
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          setUserData(userData);

          fetch('https://apismartsweepers.vercel.app/api/usuarios/' + userData._id)
            .then((res) => res.json())
            .then((obj) => {
              setUsuario(obj);
            })
            .catch((err) => Alert.alert('Ocurrio un error : ' + err));
        }
      } catch (error) {
        console.error('Error al recuperar datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const obtenerUsuario = async () => {
    try {
      if (!usuario) return;

      const respuesta = await fetch(`https://apismartsweepers.vercel.app/api/usuarios/${usuario._id}`);
      if (!respuesta.ok) {
        throw new Error('Error al obtener datos del usuario');
      }
      const datos = await respuesta.json();
      setUsuario(datos);
      setDispositivos(datos.dispositivos);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, [usuario]);

  useEffect(() => {
    const obtenerDatosDispositivos = async () => {
      const datos = await Promise.all(dispositivos.map(async dispositivoId => {
        try {
          const respuesta = await fetch(`https://apismartsweepers.vercel.app/api/dispositivo/${dispositivoId}`);
          if (!respuesta.ok) {
            throw new Error('Error al obtener datos del dispositivo');
          }
          const datosDispositivo = await respuesta.json();
          return datosDispositivo;
        } catch (error) {
          console.error('Error:', error);
          return null;
        }
      }));
      setDatosDispositivos(datos.filter(dispositivo => dispositivo !== null));
      setCargando(false);
    };
    obtenerDatosDispositivos();
  }, [dispositivos]);

  useEffect(() => {
    if (datosDispositivos.length > 0) {
      setDispositivoSeleccionado(datosDispositivos[0]);
      setTemperatura(datosDispositivos[0]?.temperatura || 0);
      setHumedad(datosDispositivos[0]?.humedad || 0);
    }
  }, [datosDispositivos]);

  const handleSelectChange = (dispositivoId) => {
    const dispositivo = datosDispositivos.find(d => d._id === dispositivoId);
    setDispositivoSeleccionado(dispositivo);
    setTemperatura(dispositivo?.temperatura || 0);
    setHumedad(dispositivo?.humedad || 0);
  };

  const cambiarEstadoDispositivo = async () => {
    try {
      if (!dispositivoSeleccionado) {
        console.error('No hay dispositivo seleccionado.');
        return;
      }

      // Construir el cuerpo de la solicitud para publicar mensaje
      const bodyPublicarMensaje = {
        topico: 'sweeperClient',
        mensaje: dispositivoSeleccionado.estado === 'Activo' ? 'Inactivo' : 'Activo'
      };

      // Realizar la solicitud POST para publicar el mensaje
      const responsePublicarMensaje = await fetch('https://apismart.onrender.com/publicarmensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPublicarMensaje)
      });

      if (!responsePublicarMensaje.ok) {
        throw new Error('Error al publicar el mensaje.');
      }

      // Obtener la respuesta del servidor para la publicación del mensaje
      const dataPublicarMensaje = await responsePublicarMensaje.json();

      console.log('Mensaje publicado correctamente:', dataPublicarMensaje);

      // Construir el cuerpo de la solicitud para actualizar el estado
      const nuevoEstado = dispositivoSeleccionado.estado === 'Activo' ? 'Inactivo' : 'Activo';
      const bodyActualizarEstado = {
        id: dispositivoSeleccionado._id,
        estado: nuevoEstado
      };

      // Realizar la solicitud POST al endpoint para actualizar el estado
      const responseActualizarEstado = await fetch('https://apismart.onrender.com/api/control/actualizarestado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyActualizarEstado)
      });

      if (!responseActualizarEstado.ok) {
        throw new Error('Error al actualizar el estado del dispositivo.');
      }

      // Obtener la respuesta del servidor para la actualización del estado
      const dataActualizarEstado = await responseActualizarEstado.json();

      // Actualizar el estado del dispositivo seleccionado
      setDispositivoSeleccionado(dataActualizarEstado);

      // Añadir una sesión de limpieza solo si el estado pasó de inactivo a activo
      if (nuevoEstado === 'Activo') {
        const bodySesionLimpieza = {
          clave_dispositivo: dispositivoSeleccionado.clave, // Supongo que la clave del dispositivo es necesaria para la
          tipo: 'Limpieza profunda',
        fecha_inicio: new Date().toISOString() // Utiliza la fecha actual
      };

      // Realizar la solicitud POST al endpoint para agregar una nueva sesión de limpieza
      const responseSesionLimpieza = await fetch('https://apismart.onrender.com/api/sesiones_limpieza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodySesionLimpieza)
      });

      if (!responseSesionLimpieza.ok) {
        throw new Error('Error al agregar la sesión de limpieza.');
      }

      // Obtener la respuesta del servidor para la sesión de limpieza agregada
      const dataSesionLimpieza = await responseSesionLimpieza.json();

      console.log('Sesión de limpieza agregada correctamente:', dataSesionLimpieza);
    }

  } catch (error) {
    console.error('Error al cambiar el estado del dispositivo:', error);
    // Manejo de errores
  }
};

const eliminarDispositivo = async (dispositivoId, nombreDispositivo) => {
  // Mostrar una alerta de confirmación para confirmar la eliminación del dispositivo
  const confirmacion = await new Promise((resolve) =>
    Alert.alert(
      'Confirmar eliminación',
      `¿Está seguro de que desea eliminar el dispositivo "${nombreDispositivo}"?`,
      [
        {
          text: 'Cancelar',
          onPress: () => resolve(false),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => resolve(true),
        },
      ],
      { cancelable: false }
    )
  );

  if (confirmacion) {
    try {
      // Enviar una solicitud para eliminar el dispositivo del usuario al endpoint correspondiente
      const response = await fetch('https://apismartsweepers.vercel.app/api/usuarios/eliminardispositivo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUsuario: usuario._id,
          idDispositivo: dispositivoId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el dispositivo del usuario');
      }

      // Mostrar una alerta informando que el dispositivo se ha eliminado del usuario correctamente
      Alert.alert(
        'Dispositivo eliminado',
        `El dispositivo "${nombreDispositivo}" se ha eliminado correctamente del usuario.`
      );

      // Luego de eliminar el dispositivo del usuario, enviar una solicitud para eliminar el dispositivo en sí
      const eliminarDispositivoResponse = await fetch(`https://apismartsweepers.vercel.app/api/dispositivo/${dispositivoId}`, {
        method: 'DELETE',
      });

      if (!eliminarDispositivoResponse.ok) {
        throw new Error('Error al eliminar el dispositivo');
      }

      // Mostrar una alerta informando que el dispositivo se ha eliminado correctamente
      Alert.alert('Dispositivo eliminado', `El dispositivo "${nombreDispositivo}" se ha eliminado correctamente.`);
      obtenerUsuario(); // Recargar la lista de dispositivos después de eliminar uno
    } catch (error) {
      console.error('Error:', error);
      // Mostrar una alerta en caso de error al eliminar el dispositivo
      Alert.alert('Error', 'Ha ocurrido un error al intentar eliminar el dispositivo. Por favor, inténtelo de nuevo más tarde.');
    }
  }
};

return (
  <View style={styles.container}>
    <View style={styles.header}>
      {!cargando && (
        <View style={styles.headerContent}>
          {datosDispositivos.length > 0 && (
            <Picker
              selectedValue={dispositivoSeleccionado ? dispositivoSeleccionado._id : ''}
              onValueChange={handleSelectChange}>
              {datosDispositivos.map(dispositivo => (
                <Picker.Item key={dispositivo._id} label={dispositivo.nombre} value={dispositivo._id} />
              ))}
            </Picker>
          )}
        </View>
      )}
    </View>
    <View style={styles.main}>
      {usuario && (
        <View>
          {cargando ? (
            <Text>Cargando dispositivos...</Text>
          ) : (
            <>
              {datosDispositivos.length > 0 ? (
                <View>
                  {dispositivoSeleccionado ? (
                    <View>
                      <Text style={styles.dispositivoTitulo}>{dispositivoSeleccionado.nombre}</Text>
                      <TouchableOpacity
                        style={[
                          styles.widget,
                          { marginStart:85, backgroundColor: dispositivoSeleccionado.estado === 'Activo' ? '#ff6600' : '#ecf0f1' },
                        ]}
                        onPress={cambiarEstadoDispositivo}>
                        {dispositivoSeleccionado.estado === 'Activo' ? (
                          <Icon name="robot" size={80} color="#ECF0F1" />
                        ) : (
                          <Icon name="power-off" size={80} color="#043464" />
                        )}
                      </TouchableOpacity>
                      <View style={styles.widgetInfo}>
                        <Text style={styles.estadoTexto}>Estado: {dispositivoSeleccionado.estado}</Text>
                        <View style={styles.widgetContainer}>
                          <View style={[styles.widget2, { backgroundColor: getColorTemperatura() }]}>
                            <Icon name="thermometer-half" size={40} color="#FFF" />
                            <Text style={{ fontWeight: 'bold',fontSize:20 }}>{temperatura}°C</Text>
                          </View>
                          <View style={[styles.widget2, { backgroundColor: getColorHumedad() }]}>
                            <Icon name="tint" size={40} color="#FFF" />
                            <Text style={{ fontWeight: 'bold',fontSize:20 }}>{humedad}%</Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.eliminarDispositivo}
                        onPress={() => eliminarDispositivo(dispositivoSeleccionado._id, dispositivoSeleccionado.nombre)}>
                        <TrashIcon name="delete" size={20} color="#c0392b" />
                        <Text style={styles.eliminarDispositivoTexto}>Eliminar dispositivo</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text>Seleccione un dispositivo para ver su información.</Text>
                  )}
                </View>
              ) : (
                <Text>No se encontraron dispositivos. ¡Adquiera una aspiradora ahora!</Text>
              )}
            </>
          )}
        </View>
      )}
    </View>
  </View>
);

function getColorTemperatura() {
  if (temperatura <= 20) {
    return '#3498db'; // Azul
  } else if (temperatura > 20 && temperatura <= 30) {
    return '#2ecc71'; // Verde
  } else {
    return '#e74c3c'; // Rojo
  }
}

function getColorHumedad() {
  if (humedad <= 40) {
    return '#3498db'; // Azul
  } else if (humedad > 40 && humedad <= 60) {
    return '#2ecc71'; // Verde
  } else {
    return '#e74c3c'; // Rojo
  }
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },
  titulo: {
    margin: 0,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  select: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 16,
    color: '#043464',
  },
  h2: {
    paddingTop: 40,
  },
  btnAgregar: {
    backgroundColor: '#10186d',
    color: '#ecf0f1',
    borderRadius: 5,
    padding: 12,
    cursor: 'pointer',
    width: '100%',
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingTop:20,
  },
  widget2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 120,
    height: 120,
    backgroundColor: '#ecf0f1',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    transitionProperty: 'background-color, box-shadow',
    transitionDuration: '0.3s',
  },
  widget: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    width: 150,
    height: 150,
    backgroundColor: '#ecf0f1',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    transitionProperty: 'background-color, box-shadow',
    transitionDuration: '0.3s',
  },
  widgetInfo: {
    paddingTop: 20,
  },
  dispositivoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  estadoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  eliminarDispositivo: {
    textAlign: 'right',
    paddingTop: 50, // Ajusta el margen superior según sea necesario
    maxHeight:100,
    maxWidth:100,
  },
});

export default MisDispositivos;

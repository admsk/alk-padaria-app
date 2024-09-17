import { useEffect, useState, useRef } from 'react';
import { Image, StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import AppConstants from '../../constants/common';
import dataRepository from '../../data/dataRepository'
import PageViewr from '../CustomPagerView';
import Aviso from '../aviso'


const animation = require('../../assets/images/time.gif');
const alk = require('../../assets/images/estrelinhas.jpg');
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

export function Home() {
  const [accessToken, setAccessToken] = useState(null);
 
  const [intervalo, setIntervalo] = useState(60000);
  const [location, setLocation] = useState(null);
  const [token, setToken] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [anuncio, setAnuncio] = useState({});
  const [data, setData] = useState([]);
  const [valoresPadrao, setValoresPadrao] = useState({});

  //getData();

  //getConfigLocationTokenMessage();

  useEffect(() => {

    getData();
    const result = setInterval(() => {

      getData();

    }, intervalo);


    return () => clearInterval(result);

  }, []);


  async function getConfigLocationTokenMessage() {
    try {
      const { status } = await Notifications.getPermissionsAsync();

      setToken((await Notifications.getExpoPushTokenAsync()).data);

      const statusPermission = (await Location.requestForegroundPermissionsAsync()).status;

      if (statusPermission !== 'granted') {
        console.log('Permissão para acessar a localização foi negada.');
        return;
      }

      let location = (await Location.getCurrentPositionAsync({})).coords;

      setLocation(location);

    } catch (error) {

    }

  }


  async function getData() {

    try {
      const requisicao = await dataRepository.get(`${AppConstants.WEBURL}/_api/Web/Lists/GetByTitle('Notificacoes')/items?$select=ID,Title,Tempo,Frase1,Frase2,Atualizado,Intervalo,Modified,PushNotificationTItle,PushNotificationBody,QtdePages,Whatsapp,PedidoMinimo,TituloAnuncio,TextoAnuncio,ImagemAnuncio,ExibirAviso,ExibirLink,LinkDownloadApp`);

      setData(requisicao);

      setValoresPadrao({Tempo: parseInt(requisicao[0].Tempo), Intervalo: parseInt(requisicao[0].Intervalo), Title: requisicao[0].Title, Frase1:requisicao[0].Frase1,Frase2:requisicao[0].Frase2,QtdePages:requisicao[0].QtdePages,Whatsapp:requisicao[0].Whatsapp, PedidoMinimo:requisicao[0].PedidoMinimo});

      // if (anuncio[0].ExibirAviso != undefined)
      //   setModalVisible(anuncio[0].ExibirAviso);

     // console.log(valoresPadrao.Whatsapp);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      {
        <View style={styles.container}>
          <View style={styles.headerMenu}>
            <Text style={styles.title}>{parseInt(valoresPadrao.Tempo) > 0 ? valoresPadrao.Title : `Cheirinho de pão fresco no ar. Venha saborear! Saiu do forno há ${parseInt(valoresPadrao.Intervalo)} min.`}</Text>
          </View>

          <View style={styles.animationContainer}>
            <View>
              <Text style={styles.tempo}>
                {parseInt(valoresPadrao.Tempo) > 0 ? parseInt(valoresPadrao.Tempo) : <Image style={styles.alk} source={alk} />}
              </Text>
              <Image style={parseInt(valoresPadrao.Tempo) > 0 ? styles.animation : styles.animationHidden} source={animation} />
            </View>
          </View>

          <View>
            <Text style={styles.frase}>{parseInt(valoresPadrao.Tempo) > 0 ? valoresPadrao.Frase1 : valoresPadrao.Frase2}</Text>
          </View>

          <PageViewr  QtdePages={valoresPadrao.QtdePages} Whatsapp={valoresPadrao.Whatsapp} PedidoMinimo={valoresPadrao.PedidoMinimo} />

          {/* <View>
            {isModalVisible && (
              <Aviso
                dataModal={{
                  Title: anuncio[0].TituloAnuncio,
                  Texto: anuncio[0].TextoAnuncio,
                  ImagemAnuncio: anuncio[0].ImagemAnuncio,
                  StatusModal: anuncio[0].ExibirAviso,
                  ExibirLink: anuncio[0].ExibirLink,
                  LinkAnuncio: anuncio[0].LinkDownloadApp,
                }}
              />
            )}
          </View> */}

        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bca483',
    width: "100%",
    height: "100%",
  },
  headerMenu: {
    width: "100%",
    height: "9%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bca483"
  },
  title: {
    width: "95%",
    marginLeft: 10,
    marginTop: 5,
    color: '#fff',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 1,
    backgroundColor: "#80510d",
    borderRadius: 5,
    padding: 7,
    textAlign: "center",

  },
  atualizado: {
    flexDirection: "column",
    backgroundColor: "#bca483",
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
  },
  frase: {
    flexDirection: "column",
    backgroundColor: "#bca483",
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
  },
  pagerView: {
    flex: 1,
    marginTop: 15,
    width: "95%",
    justifyContent: "center",
    marginLeft: 10,
  },
  item: {
    width: "100%",
    backgroundColor: "#80510d",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: "80%",
    borderRadius: 8,
    borderColor: "#fff",
    borderWidth: 1,

  },
  itemText: {
    textAlign: "center",
    marginTop: -35,
    color: "#80510d",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 6,
    padding: 7
  },
  button: {
    backgroundColor: "#80510d",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 10,
    padding: 7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  bread: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    textAlign: "auto",
    alignSelf: 'center',
    marginTop: 10,
  },
  animationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red'
  },
  tempo: {
    fontSize: 35,
    color: '#333',
    backgroundColor: '#fff',
    padding: 5,
    //borderWidth: 2,
    borderColor: '#ccc',

    justifyContent: 'center',
    textAlign: "auto",

    alignSelf: 'center',
    width: 100,

    elevation: 25,
    top: 1.5,

    // borderWidth: 2,
    borderColor: '#80510d',

  },
  animation: {
    width: 51, height: 50,
    position: 'absolute',
    top: 4,
    left: 45,
    borderRadius: 12.5,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  animationHidden: {
    display: 'none',
  },
  alk: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});


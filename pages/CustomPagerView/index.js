import { useEffect, useState, useRef } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import PagerView from 'react-native-pager-view';
import dataRepository from '../../data/dataRepository'
import AppConstants from '../../constants/common';
import Modal from 'react-native-modal';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';



export default function PageViewr({ QtdePages, Whatsapp, PedidoMinimo }) {

    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [token, setToken] = useState('');
    const [location, setLocation] = useState(null);
    const [config, setConfig] = useState({});


    let countSlides = 0;
    let countPages = 0;

    const pagerViewRef = useRef(null);

    let pageIndex = 0;



    useEffect(() => {

        getSlides();

        const interval = setInterval(() => {

            countSlides++;

            goToNextPage(countSlides);

        }, 5000);

        return () => clearInterval(interval);

    }, []);


    const goToNextPage = async (pageIndex) => {

        const r = QtdePages;

        if (pagerViewRef.current) {

            setPage(pageIndex + 1);
            pagerViewRef.current.setPageWithoutAnimation(pageIndex);
        }
        pageIndex <= r ? setPage(pageIndex + 1) : countSlides = 0;
    };

    async function handleSaveConfig() {

        await Notifications.getPermissionsAsync();

        try {

            const token = (await Notifications.getExpoPushTokenAsync()).data;

            const statusPermission = await Location.requestForegroundPermissionsAsync();

            if (statusPermission !== 'granted') {
                console.log('Permissão para acessar a localização foi negada.');
            }
            else {
                console.log('Permissão para acessar a localização foi permitida.');
            }

            let location = (await Location.getCurrentPositionAsync({})).coords;

            setLocation(location);


            const novoItem = JSON.stringify({
                __metadata: { type: 'SP.Data.DevicesListItem' },
                Title: `${token}`,
                Latitude: location.latitude.toString(),
                Longitude: location.longitude.toString()
            });

            console.log(novoItem);

            const data = await dataRepository.newItem(novoItem);

        } catch (error) {
            console.log(error);
        }
        try {

            const [notificationPermission, locationPermission] = await Promise.all([
                Notifications.getPermissionsAsync(),
                Location.requestForegroundPermissionsAsync()
            ]);

            // Verifique se a permissão de localização foi concedida
            if (locationPermission.status !== 'granted') {
                console.log('Permissão para acessar a localização foi negada.');
                return;
            } else {
                console.log('Permissão para acessar a localização foi permitida.');
            }

            // Obtenha o token e a localização em paralelo
            const [token, location] = await Promise.all([
                Notifications.getExpoPushTokenAsync(),
                Location.getCurrentPositionAsync({})
            ]);

            setToken(token.data);
            setLocation(location.coords);

            const novoItem = JSON.stringify({
                __metadata: { type: 'SP.Data.DevicesListItem' },
                Title: `${token.data}`,
                Latitude: location.coords.latitude.toString(),
                Longitude: location.coords.longitude.toString()
            });

            await dataRepository.newItem(novoItem);

        } catch (error) {
            console.log(error);
        }
    }


    async function getSlides() {

        try {
            const response = await dataRepository.get(`${AppConstants.WEBURL}/_api/Web/Lists/GetByTitle('AppImages')/items?$select=ID,Title,Imagem,PodeComprar,Descricao`);

            const newArray = response.map(element => {
                return {
                    ID: element.ID,
                    Title: element.Title,
                    ImageUrl: element.Imagem.Url,
                    PodeComprar: element.PodeComprar,
                    Descricao: element.Descricao
                };
            });

            setData(newArray);

        } catch (error) {
            console.error('ERRO:', error);
        } finally {

        }
    }

    const fazerPedido = () => {

        const phoneNumber = "5511940069553"; 
        const message = '💬 Olá, gostaria de fazer meu pedido!!!';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    alert('supported')
                    return Linking.openURL(url);
                } else {
                    console.log('Erro', 'O WhatsApp não está instalado no dispositivo');
                    alert('O WhatsApp não está instalado no dispositivo')

                }
            })
            .catch((err) => alert(err));

    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);

        // if (isModalVisible) {
        //     fazerPedido();
        // }
    };

    const points = [
        "💬 Todo o pedido  deve ser feito pelo whatsapp, clicando no botão 'Iniciar pedido' logo abaixo.",
        // "🚀 O comprovante do pagamento deve ser enviado pelo whatsapp.",
        // "✅ O pedido só será separado depois que o comprovante for confirmado pelo atendente.",
        // "📦 Você precisa informar o ⏱️ aproximado  que você irá retirar o seu pedido.",
        // `💸 Para a separação do pedido o valor deve ser no mínimo de R$ ${config.PedidoMinimo}`,
        // "🚚 No caso de entrega, precisa ser negociada diretamente com o atendente via WhatsApp e o local de entrega não pode ultrapassar 1.5 KM",
    ];

    return (

        <PagerView style={styles.pagerView} initialPage={0} ref={pagerViewRef}>
            {data.map((item) => (
                <View key={item.ID} style={styles.page}>
                    <Image
                        source={{ uri: item.ImageUrl }}
                        style={styles.item}
                        onError={(error) => console.log('Error: ', error)}
                    />
                    <Text style={styles.itemText}>{item.Title}</Text>
                    <View>
                        <Text style={styles.itemDescricao}>{item.Descricao}</Text>
                    </View>
                    <View>
                        {item.PodeComprar && (
                            <TouchableOpacity onPress={toggleModal} >
                                <Text style={styles.button}>
                                    Fazer pedido
                                </Text>
                            </TouchableOpacity>

                        )}
                    </View>
                    <Modal isVisible={isModalVisible}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTextTitle}>Faça seu pedido antecipado e tenha-o pronto ao chegar à padaria. Economize tempo, evite filas e reduza o cansaço, com a garantia de produtos frescos e prontos para você, sem complicações.                                {'\n'}
                                {"\n"}<Text style={styles.modalSubTextTitle}> <Ionicons name="map" size={20} color={""} /> Localização: Rua Guaporé, 34 - Vila Mariana -  Ferraz de Vasconcelos</Text>
                            </Text>


                            <Text style={styles.modalTextSubTItle}>Se atente as regras:</Text>
                            {points.map((point, index) => (
                                <View key={index} style={styles.bulletContainer}>
                                    <Text style={styles.bulletText}>{point}</Text>
                                </View>
                            ))}


                            <TouchableOpacity onPress={fazerPedido}>
                                <Text style={styles.button}>
                                    Abrir o WhatsApp
                                </Text>
                            </TouchableOpacity>
                            <Pressable style={styles.buttonCancel} onPress={() => setModalVisible(!isModalVisible)}>
                                <Text style={styles.buttonTextCancel}>Voltar</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
            ))}

        </PagerView>

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
        //backgroundColor: "#80510d",
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
        marginTop: -45,
        color: "#80510d",
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 6,
        padding: 7
    },
    button: {
        backgroundColor: "#80510d",
        width: "100%",
        height: 35,
        alignItems: "center",
        borderRadius: 7,
        marginTop: 1,
        marginBottom: 8,
        padding: 5,
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",

    },
    buttonCancel: {
        backgroundColor: 'rgba(128,81,13,0.8)',
        borderRadius: 7,
        padding: 7,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonTextCancel: {
        color: "#fff",
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
        borderWidth: 2,
        borderColor: '#ccc',

        justifyContent: 'center',
        textAlign: "auto",

        alignSelf: 'center',
        width: 100,

        elevation: 25,
        top: 1.5,

        borderWidth: 2,
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
    itemDescricao: {
        fontSize: 11.5,
        marginTop: 5,
        color: '#fff',
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 6,
        padding: 7,
    },
    tooltipContent: {
        padding: 10,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 1,
    },
    modalTextTitle: {
        marginBottom: 15,
        textAlign: 'justify',
        fontSize: 20,
        backgroundColor: 'rgba(128,81,13,0.8)',
        borderRadius: 10,
        padding: 10,
        color: '#fff',
    },
    modalSubTextTitle: {
        fontSize: 13,
        backgroundColor: 'rgba(128,81,13,0.8)',
        borderRadius: 10,
        padding: 10,
        paddingTop: 20,
        verticalAlign: 'middle',
    },
    modalTextSubTItle: {
        marginBottom: 15,
        textAlign: 'left',
        fontSize: 18,
    },
    bulletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    bulletPoint: {
        fontSize: 16,
        marginRight: 8,
    },
    bulletText: {
        fontSize: 16,
    },
    animationImage: {
        width: '100%',
        height: 110,
    }
});


import React, { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, Image, TouchableOpacity , Linking} from 'react-native';

export default function Aviso({ dataModal }) {

    // const [modalVisible, setModalVisible] = useState(false);

    // useEffect(() => {

    //     setModalVisible(dataModal.StatusModal);


    //     // const interval = setInterval(() => {
    //     //     setModalVisible(false);
    //     // }, 7000)

    //     // return () => clearInterval(interval);

    // }, []);


    // const handleAnuncioOut = () => {
      
    //     Linking.openURL(`${dataModal.LinkAnuncio}`);
    //     setModalVisible(false);
    // }


    return (
        <View style={styles.container}>
            {/* <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.textStyle}>x</Text>
                    </TouchableOpacity>
                    <View style={styles.modalView}>
                        <Image style={styles.img} source={{ uri: "https://nvsolucoes.com.br/alkimagens/anuncio.png" }} />
                        <Text style={styles.modalTitulo}>{dataModal.Title}</Text>
                        <Text style={styles.modalText}>{dataModal.Texto}</Text>

                        {dataModal.ExibirLink && (
                            <TouchableOpacity onPress={handleAnuncioOut}>
                                <Text style={styles.redirect}>
                                    Clique aqui!!! 
                                </Text>
                            </TouchableOpacity>
                        )
                        }
                    </View>
                </View>
            </Modal> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo semitransparente
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.40,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    closeButton: {
        //borderRadius: 5,
        marginStart: 280,
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
    },
    modalTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        color: 'black',
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: 15,
    },
    img: {
        width: 100,
        height: 100,
    },
    redirect: {
        padding: 10,
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: "center",
    }
});


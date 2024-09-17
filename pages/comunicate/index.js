import { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import AppConstants from '../../constants/common';
import { PermissionsAndroid } from 'react-native';
import dataRepository from '../../data/dataRepository'
import * as Notifications from 'expo-notifications';



export function Comunicate() {
    // // const [token, setToken] = useState([]);
    // const msgInfo = "Fique de olho no forno, pois alguns clientes preferem o pão bem moreninho.";
    // const [textInfo, setTextInfo] = useState(msgInfo);
    // const focused = useIsFocused();
    // const notificationResponseRef = useRef();

    // useEffect(() => {

    // }, [focused]);

    // async function sendPush() {

    //     setTextInfo("Aguarde, estamos enviando a notificação. Caso o alerto de SUCESSO do envio não apareça em 10 segundos, clique no botão novamente");

    //     try {

    //         const response = await dataRepository.set("744c35fa-39df-41d0-a008-3c6309a16769", 1);

    //         alert("SUCESSO: Notificação enviada!!!");

    //     } catch (err) {
    //         console.log(err);
    //     }

    // }


    return (
        <View style={styles.header}>
            {/* <Text style={styles.title} >Controle de mensagens para os clientes</Text>

            <Text style={styles.obs} >{textInfo}</Text>
            <View style={styles.send}>
                <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={sendPush}>
                    <Text style={styles.buttonSaveText}>Avisar os clientes</Text>
                </TouchableOpacity>
            </View> */}

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#bca483",
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 14,
        paddingBottom: 14,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    obs: {
        backgroundColor: "#fff",
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 7,
        padding: 14,
        marginTop: 14,
        marginBottom: 14,
        marginLeft: 14,
        marginRight: 14,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        padding: 12,
        marginTop: 30,
    },
    buttonSave: {
        backgroundColor: "#563508",
        borderRadius: 8,
    },
    buttonSaveText: {
        color: "#fff",
        fontSize: 18,
    }

});
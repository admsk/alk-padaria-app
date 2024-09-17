import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'


export function Sobre() {

    // const logo = require('../../assets/images/splash.png');
    // const nvlogo = require('../../assets/images/logo-2.png')

    // const handlePress = () => {
    //     Linking.openURL('https://www.nvsolucoes.com.br');
    // };

    return (
        <View></View>

        //     <View style={styles.container}>
        //         <View>
        //             <Image style={styles.logo} source={logo} />
        //         </View>
        //         <View>
        //             <Text style={styles.title} >Venha nos conhecer!!!</Text>
        //             <Text style={styles.descricao} >
        //                 Como uma empresa familiar, compreendemos a importância de oferecer produtos de qualidade, desenvolvidos com cuidado, carinho e uma paixão genuína por servir. Nosso compromisso vai além dos negócios; buscamos criar um ambiente acolhedor onde cada cliente se sinta valorizado e bem recebido.
        //                 A dedicação e o esforço que colocamos em cada detalhe refletem nosso desejo de construir relações duradouras com nossos clientes. Valorizamos a tradição e nos orgulhamos de manter vivos os valores que nos guiam. Nosso objetivo é proporcionar uma experiência excepcional, que combine a excelência dos produtos com um atendimento personalizado e atencioso.                </Text>
        //             <Text style={styles.benvindo}>Nos permita apresentar os nossos produtos e nos diga como podemos melhorar!!!.</Text>

        //             <Image style={styles.nvlogo} source={nvlogo} />

        //             <View style={styles.containerNVLogo} >

        //                 <TouchableOpacity onPress={handlePress}>
        //                     <Text style={styles.desenvolvidoPor}>
        //                         Desenvolvido por NV Soluções
        //                     </Text>

        //                 </TouchableOpacity>

        //             </View>

        //         </View>

        //     </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bca483",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 14,
        paddingRight: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    containerNVLogo: {
        flexDirection: "column-reverse",
    },
    logo: {
        width: 390,
        height: 290,
        resizeMode: 'contain',
        marginBottom: 0
    }
    ,
    nvlogo: {
        width: 50,
        height: 50,
        marginLeft: 150,

    },
    title: {
        backgroundColor: "#80510d",
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 0,
        textAlign: "center",
        borderRadius: 6,
        padding: 8,
        flexDirection: "row"
    },
    descricao: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "400",
        marginBottom: 5,
        justifyContent: "space-evenly",
    },
    benvindo: {
        backgroundColor: "#e8e0d6",
        marginBottom: 5,
        fontSize: 16,
        padding: 5,
        color: "#7e4e0c",
        borderRadius: 5,

    },
    desenvolvidoPor: {
        marginBottom: 70,
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: "center",
    }

});
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import * as clipboard from "expo-clipboard";
import useStorage from "./../../hooks/useStorage";


export function ModalPassword({ password, handleClose }) {

    const { saveItem } = useStorage();

    async function handleCopyPast() {
        await clipboard.setStringAsync(password);

        await saveItem("@pass", password);
        
        alert("Senha copiada com sucesso!!!");
        handleClose();
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Senha Gerada</Text>
                <Pressable style={styles.innerPassword} onLongPress={handleCopyPast}>
                    <Text style={styles.text}>{password}</Text>
                </Pressable>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPast}>
                        <Text style={styles.buttonSaveText}>Gravar Senha</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24, 24, 24, 0.6)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    content: {
        backgroundColor: "#FFFFFF",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
        marginBottom: 24
    },
    innerPassword: {
        backgroundColor: "#0e0e0e",
        width: "90%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        padding: 14
    },
    text: {
        color: "#fff"
    },
    buttonArea: {
        flexDirection: "row",
        width: "90%",
        marginTop: 8,
        alignItems: "center",
        justifyContent: "space-between"

    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 14,
        marginBottom: 14,
        borderRadius: 8,
    },
    buttonSave: {
        backgroundColor: "#392DE9",
        padding: 8,
        borderRadius: 8,
    },
    buttonSaveText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});


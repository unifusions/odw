import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import getGlobalStyles from "../theme/globalStyles";
import { ThemeContext } from "../theme/ThemeProvider";
import { CheckCircleIcon } from "react-native-heroicons/outline";

export default function ModalDialog({ visible, title, message, onConfirm }) {

    const { theme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    return (
        <Modal
            isVisible={visible}
            // onBackdropPress={onCancel}
            style={localStyles.dialogModal}
            backdropOpacity={0.5}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={localStyles.dialogModalContainer}>
                <CheckCircleIcon height={100} size={80} color={"#0F172A"} />
                <Text style={styles.dialogModalTitle}>{title}</Text>
                <Text style={styles.message}>{message}</Text>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={localStyles.confirmButton} onPress={onConfirm}>
                        <Text style={styles.confirmText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const localStyles = StyleSheet.create({
    dialogModal: {
        justifyContent: "center",

    },
    dialogModalContainer: {
        backgroundColor: "#EDFFFD",
        padding: 20,
        paddingBottom: 40,

        alignItems: "center",
    },

    confirmButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: "#1E293B",
        alignItems: "center",
        marginLeft: 5,
    }
});

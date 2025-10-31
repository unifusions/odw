import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import getGlobalStyles from "../theme/globalStyles";
import { ThemeContext } from "../theme/ThemeProvider";
import { CheckCircleIcon } from "react-native-heroicons/outline";

export default function ModalDialog({ visible, title, message, onConfirm, icon, onCancel, confirmText = "Done" }) {

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
                {icon}

                <Text style={styles.dialogModalTitle}>{title}</Text>
                <Text style={styles.message}>{message}</Text>

                <View style={styles.buttonContainer}>
                    {onCancel && <TouchableOpacity onPress={onCancel} style={localStyles.cancelButton} ><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>}
                    <TouchableOpacity style={localStyles.confirmButton} onPress={onConfirm}>
                        <Text style={styles.confirmText}>{confirmText}</Text>
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
        flex:1,
        padding: 12,
        backgroundColor: "#1E293B",
        alignItems: "center",
        
        borderRadius: 8,
    },
    cancelButton: {
        flex:1,
        padding: 12,
        borderRadius: 8,
        borderColor: "#E5E7EB",
        borderWidth: 1,
        alignItems: "center",
    }
});

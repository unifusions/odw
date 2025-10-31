import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import getGlobalStyles from "../theme/globalStyles";
import { ThemeContext } from "../theme/ThemeProvider";

export default function BottomModal({ visible, title, icon, message, onConfirm, onCancel, confirmText }) {

    const { theme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onCancel}
            style={styles.dialogModal}
            backdropOpacity={0.5}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.dialogModalContainer}>
                {icon}
                <Text style={styles.dialogModalTitle}>{title}</Text>
                <Text style={styles.message}>{message}</Text>

                <View style={styles.buttonContainer}>
                    {onCancel && <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    }

                    <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                        <Text style={styles.confirmText}>{confirmText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
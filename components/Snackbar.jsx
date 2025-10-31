// components/Snackbar.js
import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

const Snackbar = ({ visible, message, onDismiss, duration = 3000 }) => {
    const slideAnim = useRef(new Animated.Value(100)).current; // starts off-screen


    const { theme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 30,
            left: 20,
            right: 20,
            backgroundColor: theme.white,
            padding: 14,
            borderRadius: 8,
            zIndex: 999,
            elevation: 3,
        },
        message: {
            color: theme.primary,
            fontSize: 12,
            fontFamily: theme.font700,
            textAlign: 'center'
        },
    });

    useEffect(() => {
        if (visible) {
            // Slide in
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Auto-dismiss
            const timer = setTimeout(() => {
                onDismiss();
            }, duration);

            return () => clearTimeout(timer);
        } else {
            // Slide out
            Animated.timing(slideAnim, {
                toValue: 100,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    if (!visible && slideAnim._value === 100) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};


export default Snackbar;

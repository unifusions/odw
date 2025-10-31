import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFcmToken, listenForMessages, registerForPushNotificationsAsync, requestPermission, setupFCM } from '../utils/notifications';
// import usePushNotification from '../hooks/usePushNotifications';
// import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [patient, setPatient] = useState(null);
    const [token, setToken] = useState(null);

    const [otpValidationError, setOtpValidationError] = useState(false);


    const checkUser = async () => {
        const storedToken = await AsyncStorage.getItem('auth_token');
        const storedUser = await AsyncStorage.getItem('user');
        if (storedToken) {
            api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
            setToken(storedToken);
            setUser(storedUser);
        }
        setLoading(false);
    };

    const login = async (email, phone, otp) => {
        try {


            const response = await api.post('/verify-otp', { email, phone, otp });

            if (response.data.token) {


                await AsyncStorage.setItem('auth_token', response.data.token);
                await AsyncStorage.setItem('user', response.data.user);
                api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
                setToken(response.data.token); // Update state
                setUser(response.data.user);
                setPatient(response.data.user.patient)
                setOtpValidationError(false);

                const fcm_token = await setupFCM();
                const userId = response.data.user.id;

                if (fcm_token) {

                    try {
                        const tokenResponse = await api.post('/store-fcm-token', {
                            userId,
                            fcm_token
                        });

                        await AsyncStorage.setItem('fcm_token', fcm_token)

                    }
                    catch (error) {

                    }

                }



            }






        } catch (error) {

            setOtpValidationError(true);
        }
    };

    const logout = async () => {
        // await api.post('/logout');
        setToken(null);
        setUser(null);
        // await SecureStore.deleteItemAsync('token');


    };

    // useEffect(() => {
    // if (expoPushToken && user) {
    //   axios.post(
    //     'https://your-api.com/api/store-expo-token',
    //     { token: expoPushToken },
    //     { headers: { Authorization: `Bearer ${authToken}` } }
    //   );
    // }
    //   }, [expoPushToken, user]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, patient, setPatient, otpValidationError, checkUser }}>
            {children}
        </AuthContext.Provider>
    );

};


export const useAuth = () => useContext(AuthContext);
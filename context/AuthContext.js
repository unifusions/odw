import React, { createContext, useState } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [patient, setPatient] = useState(null);
    const [token, setToken] = useState(null);
    const checkUser = async () => {
        const storedToken = await AsyncStorage.getItem('auth_token');
        if (storedToken) {
            api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
            setToken(storedToken);
        }
        setLoading(false);
    };
    const login = async (email, fullname, phone, otp) => {
        try {



            const response = await api.post('/verify-otp', { email, phone, otp, fullname });
            console.log(response);
            // // setUser(response.data.user);
            if (response.data.token) {
                await AsyncStorage.setItem('auth_token', response.data.token);
                api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
                setToken(response.data.token); // Update state
                setUser(response.data.user);
                setPatient(response.data.user.patient)
            }



        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = async () => {
        // await api.post('/logout');
        setToken(null);
        setUser(null);

    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

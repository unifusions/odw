import React, { createContext, useState } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const checkUser = async () => {
        const storedToken = await AsyncStorage.getItem('auth_token');
        if (storedToken) {
            api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
            setToken(storedToken);
        }
        setLoading(false);
    };
    const login = async (email, otp) => {
        try {


            const response = await api.post('/verify-otp', { email, otp });
            console.log(response);
            // // setUser(response.data.user);
            if (response.data.token) {
                await AsyncStorage.setItem('auth_token', response.data.token);
                api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
                setToken(response.data.token); // Update state
            }



        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = async () => {
        // await api.post('/logout');
        // setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

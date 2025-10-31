import React, { createContext, useState, useEffect, useContext } from "react";
import { lightTheme, darkTheme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import getLocation from "../services/getLocation";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemTheme = useColorScheme();
    // const [theme, setTheme] = useState(systemTheme === "dark" ? darkTheme : lightTheme);
    const [theme, setTheme] = useState(lightTheme);
    const [processing, setProcessing] = useState(false);

    const [deviceLocation, setDeviceLocation] = useState(null);

    const fetchLocation = async () => {
        try {
            const loc = await getLocation.getLocation();
            setDeviceLocation(loc);

            
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    useEffect(() => {
        // loadTheme();
        fetchLocation();
    }, [systemTheme]);

    const loadTheme = async () => {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme === "dark" ? darkTheme : lightTheme);
        } else {
            setTheme(systemTheme === "dark" ? darkTheme : lightTheme);
        }
    };

    const toggleTheme = async () => {
        const newTheme = theme === lightTheme ? darkTheme : lightTheme;
        setTheme(newTheme);
        await AsyncStorage.setItem("theme", newTheme === darkTheme ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, processing, setProcessing, deviceLocation }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

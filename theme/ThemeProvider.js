import React, { createContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme === "dark" ? darkTheme : lightTheme);

    useEffect(() => {
        loadTheme();
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
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
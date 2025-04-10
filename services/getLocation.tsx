import * as Location from "expo-location";

const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        throw new Error("Permission Denied: Allow location access in settings.");
    }

    return await Location.getCurrentPositionAsync({});
};

const getCityName = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        return data.address.city || data.address.town || data.address.village || "Unknown";
    } catch (error) {
        console.error("Error fetching city:", error);
        return "Could not fetch city";
    }
};

export default {
    getLocation,
    getCityName,
};
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const ipServer = '172.20.10.7';

const api = axios.create({
    baseURL: `http://${ipServer}:8888`,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        console.error("API error:", err.response?.data || err.message);
        return Promise.reject(err);
    }
);

export default api;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AuthState {
    isAuth: boolean;
    token: string | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,
    token: null,
    loading: true,

    checkAuth: async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                set({ isAuth: true, token });
            } else {
                set({ isAuth: false, token: null });
            }

        } catch (e) {
            console.error('Ошибка при проверке токена:', e);
        } finally {
            set({ loading: false });
        }
    },

    login: (token: string) => {
        AsyncStorage.setItem('token', token)
        set({ isAuth: true, token });
    },

    logout: async () => {
        await AsyncStorage.removeItem('token');
        set({ isAuth: false, token: null });
    },
}));

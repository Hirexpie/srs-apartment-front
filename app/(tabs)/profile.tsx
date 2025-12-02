import api from '@/api';
import Button from '@/custum-companents/button';
import { useAuthStore } from '@/store/auth';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
    const { logout, checkAuth } = useAuthStore();
    const [user, setUser] = useState<{ id: string; name: string; phone: string } | null>(null);

    useEffect(() => {
        api.get("/auth")
            .then(({ data }) => setUser(data))
            .catch((err) => console.error("Ошибка при загрузке профиля:", err));
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Профиль</Text>
            </View>

            {user ? (
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Имя</Text>
                    <Text style={styles.value}>{user.name}</Text>

                    <Text style={styles.label}>Телефон</Text>
                    <Text style={styles.value}>+7 {user.phone}</Text>

                    <Text style={styles.label}>ID пользователя</Text>
                    <Text style={styles.valueSmall}>{user.id}</Text>
                </View>
            ) : (
                <Text style={styles.loading}>Загрузка...</Text>
            )}

            <Button
                title='Выйти'
                onPress={async () => {
                    logout();
                    checkAuth();
                    router.push("/login");
                }}
                style={styles.logoutButton}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    icon: {
        fontSize: 64,
        color: '#fff',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoBox: {
        width: '100%',
        backgroundColor: '#1f1f1f',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    label: {
        color: '#888',
        fontSize: 14,
        marginTop: 10,
    },
    value: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    valueSmall: {
        color: '#ccc',
        fontSize: 12,
        marginTop: 2,
    },
    loading: {
        color: '#999',
        fontSize: 16,
        marginVertical: 50,
    },
    logoutButton: {
        marginTop: 50,
        width: '80%',
    },
});

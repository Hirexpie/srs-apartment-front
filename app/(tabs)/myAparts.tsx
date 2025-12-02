import api from "@/api";
import { ApartmentCard } from "@/custum-companents/ApartmentCard";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function MyApartmentsScreen() {
    const [apartments, setApartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSales, setIsSales] = useState(false);

    const fetchApartments = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/apart/my");
            setApartments(data);
            console.log(data);

        } catch (err) {
            console.error("Ошибка загрузки квартир:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchApartments();
        }, [fetchApartments])
    );

    if (loading)
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#3a6ff7" />
            </View>
        );

    // 🔍 фильтрация по типу (пример: если в объекте есть поле `isSale`)
    const filtered = apartments.filter((a) => a.isSale === isSales);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Квартиры</Text>

            <View style={styles.tabs}>
                <TouchableOpacity
                    onPress={() => setIsSales(false)}
                    style={[styles.tab, !isSales && styles.activeTab]}
                >
                    <Text style={[styles.tabText, !isSales && styles.activeTabText]}>
                        Аренда
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setIsSales(true)}
                    style={[styles.tab, isSales && styles.activeTab]}
                >
                    <Text style={[styles.tabText, isSales && styles.activeTabText]}>
                        Покупка
                    </Text>
                </TouchableOpacity>
            </View>

            {filtered.length === 0 ? (
                <Text style={{ color: "#aaa", marginTop: 20 }}>
                    Нет квартир по выбранной категории
                </Text>
            ) : (
                filtered.map((item) => <ApartmentCard key={item.id} {...item} />)
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 15,
    },
    header: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 15,
    },
    center: {
        flex: 1,
        backgroundColor: "#121212",
        alignItems: "center",
        justifyContent: "center",
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        backgroundColor: "#1f1f1f",
        borderRadius: 12,
        padding: 6,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: "#3a6ff7",
    },
    tabText: {
        color: "#bbb",
        fontWeight: "600",
    },
    activeTabText: {
        color: "#fff",
        fontWeight: "700",
    },
});

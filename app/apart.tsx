import api, { ipServer } from "@/api";
import Button from "@/custum-companents/button";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ApartmentDetailsScreen() {
    const route = useRoute<any>();
    const { id } = route.params;
    const [apartment, setApartment] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApartment = async () => {
            try {
                const { data } = await api.get(`/apart/${id}`);
                setApartment(data);
            } catch (error) {
                console.error("Ошибка при загрузке квартиры:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApartment();
    }, [id]);

    if (loading)
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#4ade80" />
            </View>
        );

    if (!apartment)
        return (
            <View style={styles.center}>
                <Text style={{ color: "#fff" }}>Квартира не найдена</Text>
            </View>
        );

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/(tabs)")}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
                <Text style={styles.backText}>Назад</Text>
            </TouchableOpacity>

            {apartment.images && apartment.images.length > 0 ? (
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageScroll}
                >
                    {apartment.images.map((img: any) => (
                        <Image
                            key={img.id}
                            source={{
                                uri: `http://${ipServer}:8888/apart/image/${img.id}`,
                            }}
                            style={styles.image}
                        />
                    ))}
                </ScrollView>
            ) : (
                <View style={[styles.image, styles.noImage]}>
                    <Text style={{ color: "#aaa" }}>Нет изображения</Text>
                </View>
            )}

            <Text style={styles.title}>{apartment.title}</Text>
            <Text style={styles.price}>
                {apartment.price} ₸{" "}
                <Text style={styles.type}>{apartment.isSale ? "Покупка" : "Аренда"}</Text>
            </Text>
            <Text style={styles.description}>{apartment.description}</Text>

            {apartment.user && (
                <View style={styles.ownerBox}>
                    <Text style={styles.ownerTitle}>Владелец</Text>
                    <Text style={styles.ownerName}>{apartment.user.name}</Text>
                    <Text style={styles.ownerName}>Телефон: {apartment.user.phone}</Text>
                </View>
            )}
            {
                apartment.isMy &&
                <Button title="Удалить" onPress={() => {
                    api.delete(`/apart/${id}`).then(({ status }) => {
                        if (status >= 200 && status <= 299) {
                            router.replace('/(tabs)')
                        }
                        // console.log('');

                    })
                }} />
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 15,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    backText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 6,
    },
    center: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
    },
    imageScroll: {
        marginBottom: 15,
    },
    image: {
        width: width - 30, // учитываем padding
        height: 250,
        borderRadius: 12,
        marginRight: 10,
    },
    noImage: {
        backgroundColor: "#1f1f1f",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        color: "#4ade80",
        marginBottom: 8,
    },
    type: {
        color: "#aaa",
        fontSize: 14,
    },
    description: {
        color: "#ddd",
        fontSize: 16,
        marginBottom: 20,
    },
    ownerBox: {
        backgroundColor: "#1f1f1f",
        padding: 15,
        borderRadius: 10,
    },
    ownerTitle: {
        color: "#aaa",
        fontWeight: "700",
        marginBottom: 5,
    },
    ownerName: {
        color: "#fff",
        fontSize: 16,
    },
});

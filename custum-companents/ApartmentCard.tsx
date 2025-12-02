import { ipServer } from "@/api";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ApartmentCardProps {
    name: string;
    id: string;
    description: string;
    price: number;
    isSale: boolean;
    user: { name: string, phone: string };
    images: { id: number; buffer: string }[];
}

export const ApartmentCard: React.FC<ApartmentCardProps> = ({ id, name, description, price, user, images, isSale }) => {
    // const imageUri = images?.[0]
    //     ? `data:image/jpeg;base64,${images[0].buffer}`
    //     : "https://via.placeholder.com/150"; 
    // console.log(images.length > 0 && images[0].id);


    return (
        <Pressable onPress={() => router.replace({
            pathname: '/apart',
            params: { id: id }
        })} style={styles.card}>
            <Image source={{ uri: images.length > 0 ? `http://${ipServer}:8888/apart/image/${images[0].id}` : '' }} style={styles.image} />
            <View style={styles.infos}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text}>{description}</Text>
                <Text style={styles.price}>{price} ₸</Text>
                <Text style={styles.owner}>тип: {isSale ? 'продажа' : 'аренда'}</Text>
                <Text style={styles.owner}>Владелец: {user?.name}</Text>
                <Text style={styles.owner}>Номер: {user?.phone}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    infos: {
        margin: 10
    },
    card: {
        backgroundColor: "#1e1e1e",
        borderRadius: 12,
        marginVertical: 10,
        // padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    text: {
        color: "#bbb",
        marginBottom: 5,
    },
    price: {
        color: "#4ade80",
        fontWeight: "600",
        fontSize: 16,
    },
    owner: {
        color: "#aaa",
        marginTop: 4,
        fontSize: 13,
    },
});

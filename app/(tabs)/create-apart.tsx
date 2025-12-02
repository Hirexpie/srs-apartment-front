import api from "@/api";
import Button from "@/custum-companents/button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    useColorScheme,
    View,
} from "react-native";

export default function CreateApartmentScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [isSale, setIsSale] = useState(true);
    const [images, setImages] = useState<any[]>([]);

    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImages(result.assets);
        }
    };

    const handleSubmit = async () => {
        if (!title || !description || !price) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        try {
            const res = await api.post("/apart", {
                title,
                description,
                price,
                isSale: isSale,
            });
            console.log(res.data);

            const apId = res.data.apId;
            if (!apId) {
                Alert.alert("Ошибка", "Не удалось получить ID квартиры");
                return;
            }

            if (images.length > 0) {
                try {
                    for (let index = 0; index < images.length; index++) {
                        const img = images[index];

                        const formData = new FormData();
                        formData.append("file", {
                            uri: img.uri,
                            type: "image/jpeg",
                            name: `photo_${index}.jpg`,
                        } as any);

                        const result = await api.post(`/apart/image/${apId}`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        });

                        console.log(`✅ Uploaded ${index + 1}/${images.length}:`, result.data);
                    }

                    console.log("Все изображения успешно загружены!");
                } catch (error) {
                    console.error("Ошибка загрузки изображений:", error);
                }
            }

            Alert.alert("✅ Успех", "Квартира успешно добавлена!");
            setTitle("");
            setDescription("");
            setPrice("");
            setImages([]);
        } catch (err: any) {
            // console.error(err);
            Alert.alert("Ошибка", "Не удалось создать квартиру");
        }
    };

    const styles = getStyles(isDark);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Создать квартиру</Text>

            <TextInput
                style={styles.input}
                placeholder="Название"
                placeholderTextColor={isDark ? "#888" : "#999"}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Описание"
                placeholderTextColor={isDark ? "#888" : "#999"}
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TextInput
                style={styles.input}
                placeholder="Цена"
                placeholderTextColor={isDark ? "#888" : "#999"}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>
                    {isSale ? "Продажа" : "Аренда"}
                </Text>
                <Switch
                    value={isSale}
                    onValueChange={setIsSale}
                    thumbColor={isDark ? "#fff" : "#222"}
                    trackColor={{ true: "#4CAF50", false: "#2196F3" }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Выбрать фото" onPress={pickImages} />
            </View>

            {images.length > 0 && (
                <ScrollView horizontal style={styles.previewRow}>
                    {images.map((img, i) => (
                        <Image
                            key={i}
                            source={{ uri: img.uri }}
                            style={styles.imagePreview}
                        />
                    ))}
                </ScrollView>
            )}

            <Button title="Создать" onPress={handleSubmit} />
        </ScrollView>
    );
}

function getStyles(isDark: boolean) {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            marginTop: 100,
        },
        header: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 16,
            color: isDark ? "#fff" : "#000",
        },
        input: {
            borderWidth: 1,
            borderColor: isDark ? "#444" : "#ccc",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            color: isDark ? "#fff" : "#000",
            backgroundColor: isDark ? "#1e1e1e" : "#f9f9f9",
        },
        textArea: {
            height: 100,
            textAlignVertical: "top",
        },
        switchRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
        },
        switchLabel: {
            fontSize: 16,
            color: isDark ? "#fff" : "#000",
        },
        buttonContainer: {
            marginVertical: 8,
        },
        previewRow: {
            flexDirection: "row",
            marginBottom: 16,
        },
        imagePreview: {
            width: 120,
            height: 120,
            borderRadius: 12,
            marginRight: 10,
        },
    });
}

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    icon?: keyof typeof MaterialIcons.glyphMap; // например "search", "email", "lock"
};

export default function Input({
    value,
    onChangeText,
    placeholder,
    icon,
    ...rest
}: InputProps) {
    return (
        <View style={styles.container}>
            {icon && <MaterialIcons name={icon} size={20} color="#bbb" style={styles.icon} />}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#666"
                {...rest}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#222", // тёмный фон
        borderRadius: 10,
        paddingHorizontal: 12,
        marginVertical: 8,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
        color: "#fff", // белый текст
    },
});

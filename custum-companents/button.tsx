import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

type ButtonProps = {
    title?: string;
    onPress: (event: GestureResponderEvent) => void;
    icon?: keyof typeof Ionicons.glyphMap; // ✅ имя иконки
    iconPosition?: "left" | "right" | "center";
    disabled?: boolean;
    style?: ViewStyle;
};

export default function Button({
    title,
    onPress,
    icon,
    iconPosition = "left",
    disabled = false,
    style,
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, style]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled}
        >
            <View style={styles.content}>
                {icon && iconPosition === "left" && (
                    <Ionicons name={icon} size={20} color="#fff" style={styles.icon} />
                )}
                {title && <Text style={styles.text}>{title}</Text>}
                {icon && iconPosition === "right" && (
                    <Ionicons name={icon} size={20} color="#fff" style={styles.icon} />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#3a6ff7",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 8,
    },
    disabled: {
        backgroundColor: "#444",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        marginHorizontal: 6,
    },
});

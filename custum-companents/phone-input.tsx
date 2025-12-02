import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { StyleSheet, TextInputProps, View } from "react-native";
import MaskInput, { Mask } from "react-native-mask-input";

type PhoneInputProps = TextInputProps & {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
};
const RUS_PHONE_MASK: Mask = [
    "+", "7", " ", "(", /\d/, /\d/, /\d/, ")",
    " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/
];
export default function PhoneInput({
    value,
    onChangeText,
    placeholder = "+7 (___) ___-__-__",
    icon = "phone",
    ...rest
}: PhoneInputProps) {
    const [masked, setMasked] = useState(value);

    return (
        <View style={styles.container}>
            {icon && (
                <MaterialIcons
                    name={icon}
                    size={20}
                    color="#bbb"
                    style={styles.icon}
                />
            )}

            <MaskInput
                value={masked}
                onChangeText={(maskedText, unmaskedText) => {
                    setMasked(maskedText);
                    onChangeText(unmaskedText || "");
                }}
                mask={RUS_PHONE_MASK}
                keyboardType="phone-pad"
                placeholder={placeholder}
                placeholderTextColor="#666"
                style={styles.input}
                {...rest}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#222",
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
        color: "#fff",
    },
});

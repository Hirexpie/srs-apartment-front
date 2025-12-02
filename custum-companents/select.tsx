// Select.tsx
import { Picker } from "@react-native-picker/picker";
import React from "react";
interface SelectProps {
    items: string[],
    value: string;
    onChange: Function;
}

export default function Select({ items, value, onChange }: SelectProps) {
    return (
        <Picker
            selectedValue={value}
            onValueChange={(val) => {
                onChange(val);
                // console.log(`${new Date()} | ${val} | Select`);
            }}
            style={{ width: 130 }}
        >
            {items.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
            ))}
        </Picker>
    );
}

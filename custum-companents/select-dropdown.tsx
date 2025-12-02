import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export interface Option {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SelectDropdown({ label, options, value, onChange, placeholder }: SelectProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Dropdown
        style={styles.dropdown}
        data={options}
        labelField="label"
        valueField="value"
        placeholder={placeholder || "Выберите..."}
        value={value}
        onChange={(item) => onChange(item.value)}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        itemTextStyle={styles.itemText}
        containerStyle={styles.dropdownContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#ccc",
  },
  dropdown: {
    height: 50,
    // borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#222",
  },
  placeholder: {
    color: "#999",
  },
  selectedText: {
    color: "#ccc",

    // color: "#000",
  },
  itemText: {
    color: "#000",
  },
  dropdownContainer: {
    borderRadius: 10,
  },
});

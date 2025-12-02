import api from '@/api';
import Button from '@/custum-companents/button';
import Input from '@/custum-companents/input';
import PhoneInput from '@/custum-companents/phone-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ModalScreen() {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');



    const sing = async () => {
        console.log(AsyncStorage.getItem("token"));

        const { status } = await api.post('/auth/register', {
            name: name,
            phone: phone,
            password: password
        })

        if (status < 200 || status > 299) {
            return
        }
        router.replace("/login");


    }
    return (

        <View style={styles.container}>
            <Input placeholder='Имя' value={name} onChangeText={setName} />
            <PhoneInput value={phone} onChangeText={setPhone} />
            <Input secureTextEntry value={password} onChangeText={setPassword} />
            <Button title='Вход' onPress={sing} />

            {/* <Button title='Вход' /> */}
        </View>
        // <ThemedView style={styles.container}>

        // </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        marginTop: 200,
        // justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});

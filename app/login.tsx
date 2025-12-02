import api from '@/api';
import Button from '@/custum-companents/button';
import Input from '@/custum-companents/input';
import PhoneInput from '@/custum-companents/phone-input';
import { useAuthStore } from '@/store/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { login, checkAuth } = useAuthStore();

  const navReg = () => {
    router.replace("/register")
  }

  const sing = async () => {
    console.log(AsyncStorage.getItem("token"));

    const { data, status } = await api.post('/auth/login', {
      phone: phone,
      password: password
    })

    if (status < 200 || status > 299) {
      return
    }
    router.replace("/(tabs)");
    login(data.token);
    checkAuth();
    // AsyncStorage.setItem('token', data.token)


  }
  return (

    <View style={styles.container}>
      <PhoneInput value={phone} onChangeText={setPhone} />
      <Input secureTextEntry value={password} onChangeText={setPassword} />
      <Button title='Вход' onPress={sing} />
      <Pressable onPress={navReg} >
        <Text style={{ color: "#fff" }}>
          зарегистрироватся
        </Text>
      </Pressable>
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

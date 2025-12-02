import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ presentation: 'modal', title: 'регистратция' }} />
        <Stack.Screen name="apart" options={{ presentation: 'modal', title: 'квартира' }} />
        <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Логин' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

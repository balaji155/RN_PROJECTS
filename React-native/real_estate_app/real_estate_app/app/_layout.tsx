import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import './global.css';
import { useEffect } from "react";
import GlobalContextProvider from "@/services/global-provider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Regular Font": require("../assets/fonts/Rubik-Regular.ttf"),
    "Medium Font": require("../assets/fonts/Rubik-Medium.ttf"),
    "Bold Font": require("../assets/fonts/Rubik-Bold.ttf"),
    "SemiBold Font": require("../assets/fonts/Rubik-SemiBold.ttf"),
    "Light Font": require("../assets/fonts/Rubik-Light.ttf"),
    "ExtraBold Font": require("../assets/fonts/Rubik-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalContextProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="(root)/onboarding">
          <Stack.Screen name="(root)/onboarding" />
          <Stack.Screen name="(root)/(tabs)" />
          <Stack.Screen name="(root)/property/[id]" />
        </Stack>
      </GlobalContextProvider>
    </GestureHandlerRootView>
  );
}

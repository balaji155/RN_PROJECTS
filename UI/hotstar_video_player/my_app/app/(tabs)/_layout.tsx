import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function _layout() {
  return (
      <Tabs 
          screenOptions={{
             headerShown: false,
          }}
       >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="search" />
          <Tabs.Screen name="feed" />
          <Tabs.Screen name="settings" />
      </Tabs>
  );
}

import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <>
        <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen /> */}
      </Stack>
    </>
  );
}

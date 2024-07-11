import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function Layout() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider value={scheme === "light" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: true }}>
        {/* <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: scheme === "light" ? "red" : "blue",
            },
            headerTintColor: scheme === "dark" ? "#fff" : "#333",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        /> */}
      </Stack>
    </ThemeProvider>
  );
}

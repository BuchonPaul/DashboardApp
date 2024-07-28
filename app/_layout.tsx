// app/_layout.js
import React from "react";
import { Stack, Tabs } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SysVarProvider } from "@/hooks/useSysVar";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Layout() {
  const scheme = useColorScheme();
  return (
    <SysVarProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="fuelFinderScreen"
                options={{ title: "Fuel Finder" }}
              />
              <Stack.Screen name="index" options={{ title: "Home" }} />
              <Stack.Screen
                name="dashboardScreen"
                options={{ title: "Dashboard" }}
              />
            </Stack>
          </SafeAreaView>
        </ThemeProvider>
      </ApplicationProvider>
    </SysVarProvider>
  );
}

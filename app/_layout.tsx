// app/_layout.js
import React, { useState, useEffect, createContext } from "react";
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

export default function Layout() {
  const scheme = useColorScheme();
  return (
    <SysVarProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <ThemeProvider value={scheme === "light" ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen
              name="dashboardScreen"
              options={{ title: "Dashboard" }}
            />
          </Stack>
        </ThemeProvider>
      </ApplicationProvider>
    </SysVarProvider>
  );
}

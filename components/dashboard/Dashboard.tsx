import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import { DashboardCard } from "./DashboardCard";
import { Fuel } from "../appli/Fuel";

export function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.itemsWrap}>
        <View style={{ ...styles.singleItem, flex: 1 }}>
          <View style={{ ...styles.singleItem }}>
            <DashboardCard appli={<Fuel />} />
          </View>
          <View style={{ ...styles.singleItem }}>
            <DashboardCard />
          </View>
        </View>
        <View style={{ ...styles.singleItem, flex: 2 }}>
          <View style={{ ...styles.singleItem }}>
            <DashboardCard />
          </View>
          <View style={{ ...styles.singleItem }}>
            <DashboardCard />
          </View>
          <View style={{ ...styles.singleItem, flexDirection: "row" }}>
            <View style={{ ...styles.singleItem }}>
              <DashboardCard />
            </View>
            <View style={{ ...styles.singleItem }}>
              <DashboardCard />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const gap = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  itemsWrap: {
    flexDirection: "row",
    height: "100%",
    padding: gap,
    gap: gap,
  },
  singleItem: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    gap: gap,
    borderBottomRightRadius: gap,
  },
  itemText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

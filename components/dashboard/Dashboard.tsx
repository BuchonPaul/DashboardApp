import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { DashboardCard } from "./DashboardCard";
import { Fuel } from "../appli/FuelFinder/Fuel";

export function Dashboard() {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          ...styles.itemsWrap,
          flexDirection: width > 600 ? "row" : "column",
          height: width > 600 ? "100%" : 2000,
        }}
      >
        <View style={{ ...styles.singleItem, flex: 1 }}>
          <View style={{ ...styles.singleItem }}>
            <DashboardCard appli={<Fuel></Fuel>} />
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
          <View
            style={{
              ...styles.singleItem,
              flexDirection: "row",
            }}
          >
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

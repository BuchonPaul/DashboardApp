import React from "react";
import { View, StyleSheet } from "react-native";
import DashboardCard from "@/components/dashboard/DashboardCard";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <DashboardCard style={styles.card} content="Card 1 Content" />
      <DashboardCard style={styles.card} content="Card 2 Content" />
      <DashboardCard style={styles.card} content="Card 3 Content" />
      <DashboardCard style={styles.card} content="Card 4 Content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  card: {
    width: "48%",
    marginVertical: 10,
  },
});

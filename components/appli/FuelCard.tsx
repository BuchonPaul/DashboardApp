import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "@ui-kitten/components";

export function FuelCard({ name, address, distance, fuels }: any) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text category="h6">{name || "Nom non disponible"}</Text>
      </View>
      <Text>{address}</Text>
      <Text style={styles.distance}>{distance}</Text>
      <View style={styles.fuels}>
        <Text>Gazole</Text>
        <Text>E85</Text>
        <Text>SP95-E10</Text>
        <Text>SP98</Text>
        <Text>GPLc</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  distance: {
    marginTop: 8,
    color: "#999",
  },
  fuels: {
    flexDirection: "row",
    marginTop: 8,
  },
});

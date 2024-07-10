import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DashboardCard({ style, content }) {
  return (
    <View style={[styles.card, style]}>
      <Text>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

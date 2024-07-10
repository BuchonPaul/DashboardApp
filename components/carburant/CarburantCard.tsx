import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import axios from "axios";
interface ICarburantCard {
  id: number;
  name: string;
  brand: string;
  street: string;
  city: string;
  distance: string;
  fuels: any;
}
export default function CarburantCard({
  id,
  name,
  brand,
  street,
  city,
  distance,
  fuels,
}: ICarburantCard) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View key={id} style={styles.card}>
        <Text style={styles.title}>{name || "Station sans nom"}</Text>
        <Text>Marque: {brand}</Text>
        <Text>
          Adresse: {street}, {city}
        </Text>
        <Text>Distance: {distance}</Text>
        <View style={styles.fuelList}>
          {fuels.map((fuel: any) => (
            <Text key={fuel.id}>
              {fuel.name} : {fuel.Price.text}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fuelList: {
    marginTop: 10,
  },
});

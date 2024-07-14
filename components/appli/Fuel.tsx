import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { Layout, Text } from "@ui-kitten/components";
import { FuelCard } from "./FuelCard";

export function Fuel() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get(
        "https://api.prix-carburants.2aaz.fr/station/around/48.4,-4.4833"
      );
      setData(response.data);
    } catch (error) {
      setError("Erreur lors de la récupération des données");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>{error}</Text>
      </Layout>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      style={styles.appli}
      nestedScrollEnabled={true}
      renderItem={({ item }) => (
        <FuelCard
          name={item.name}
          address={`${item.Address.street_line}, ${item.Address.city_line}`}
          distance={item.Distance.text}
          fuels={["Gazole", "E85", "SP95-E10", "SP98", "GPLc"]}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  appli: {
    backgroundColor: "orange",
    width: "100%",
    height: 1000,
  },
});

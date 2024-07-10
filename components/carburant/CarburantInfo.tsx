import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import CarburantCard from "@/components/carburant/CarburantCard";

export default function CarburantInfo() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get(
        "https://api.prix-carburants.2aaz.fr/station/around/48.2,-2.04?responseFields=Fuels,Price"
      );
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((station: any) => (
        <CarburantCard
          key={station.id}
          id={station.id}
          name={station.name}
          brand={station.Brand.name}
          street={station.Address.street_line}
          city={station.Address.city_line}
          distance={station.Distance.text}
          fuels={station.Fuels}
        ></CarburantCard>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

export function Fuel() {
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
    <View style={styles.appli}>
      {data.map((station: any) => (
        <View key={station.id}>{station.name}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  appli: {
    backgroundColor: "orange",
    width: "100%",
    height: "100%",
  },
});

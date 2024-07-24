import React, { useContext, useEffect, useState } from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { BrocanteCard } from "./BrocanteCard";
import { SysVarContext } from "@/hooks/useSysVar";

export function Brocante() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { detLocation } = useContext(SysVarContext);

  useEffect(() => {
    if (detLocation) {
      fetchStations();
    }
  }, [detLocation]);

  const fetchStations = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data

      const response = await axios.get(`http://localhost:3000/api/brocantes`, {
        params: {
          departement: parseInt(
            detLocation.features[0].properties.context.match(/^\d+/)[0],
            10
          ),
          ville: detLocation.features[0].properties.city,
        },
      });
      setData(response.data);
    } catch (error) {
      setError("Erreur lors de la récupération des données");
    } finally {
      setLoading(false); // Set loading to false after data fetching completes
    }
  };

  if (!detLocation) {
    // Handle case where location is not yet available
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Autoriser la Location</Text>
        <ActivityIndicator size="large" />
      </Layout>
    );
  }

  if (loading) {
    // Handle loading state
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Récupération des données</Text>
        <ActivityIndicator size="large" />
      </Layout>
    );
  }

  if (error) {
    // Handle error state
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>{error}</Text>
      </Layout>
    );
  }

  // // Render FlatList once data is loaded and no error
  // return (
  //   <>
  //     <Layout level="1" style={styles.selectBar}>
  //       <Select placeholder="Default" style={styles.select}>
  //         <SelectItem title="Option 1.1" />
  //         <SelectItem title="Option 1.2" />
  //         <SelectItem title="Option 1.3" />
  //       </Select>

  //       <Select placeholder="Multi" style={styles.select}>
  //         <SelectItem title="Option 1.1" />
  //         <SelectItem title="Option 1.2" />
  //         <SelectItem title="Option 1.3" />
  //         <SelectItem title="Option 2.1" />
  //         <SelectItem title="Option 2.2" />
  //         <SelectItem title="Option 2.3" />
  //       </Select>
  //     </Layout>
  //     <FlatList
  //       data={data}
  //       keyExtractor={(item) => item.id.toString()}
  //       style={styles.appli}
  //       nestedScrollEnabled={true}
  //       renderItem={({ item }) => (
  //         <BrocanteCard
  //           key={item.id}
  //           name={item.name}
  //           brand={item.Brand}
  //           address={`${item.Address.street_line}, ${item.Address.city_line}`}
  //           lat={location.coords.latitude}
  //           long={location.coords.long}
  //           distance={item.Distance.text}
  //           fuels={item.Fuels}
  //         />
  //       )}
  //     />
  //   </>
  // );
}

const styles = StyleSheet.create({
  appli: {
    backgroundColor: "",
    width: "100%",
    height: 1000,
  },
  selectBar: {
    flexDirection: "row",
  },
  select: {
    flex: 1,
  },
});

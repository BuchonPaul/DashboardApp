import React, { useContext, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Dimensions } from "react-native";
import { Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { SysVarContext } from "@/hooks/useSysVar";
import { SafeAreaView } from "react-native-safe-area-context";
import FuelMap from "./FuelFinder/FuelMap";

const { width } = Dimensions.get("window");

export function Finder() {
  const { location } = useContext(SysVarContext);
  const [selectedView, setSelectedView] = useState("FuelMap");

  const mapRef = useRef<MapView | null>(null);
  const [markers, setMarkers] = useState();

  if (!location) {
    return (
      <Layout
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Autoriser la Location</Text>
        <ActivityIndicator size="large" />
      </Layout>
    );
  }

  const renderApp = () => {
    switch (selectedView) {
      case "FuelMap":
        return <FuelMap mapRef={mapRef} setMarkers={setMarkers} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, width: width }}>
      <View style={styles.selectBar}>
        <Layout level="1">
          <Select>
            <SelectItem title="FuelMap" />
            <SelectItem title="OtherMap" />
          </Select>
        </Layout>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        >
          <View style={styles.currentLocationMarker} />
        </Marker>
        {markers}
      </MapView>
      {renderApp()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  selectBar: {
    position: "absolute",
    zIndex: 10,
    left: 0,
    right: 0,
  },
  currentLocationMarker: {
    width: 20,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 20,
  },
});

export default Finder;

import React, { useContext, useEffect, useState, useRef } from "react";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import {
  Layout,
  Text,
  Card,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { SysVarContext } from "@/hooks/useSysVar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fuel } from "@/constants/Fuels";
import { Station } from "@/types/Station";
import useFetchStations from "@/hooks/useFetchStation";

const { width } = Dimensions.get("window");

export function FuelMap() {
  const [filteredData, setFilteredData] = useState<Station[]>([]);
  const [selectedFuelIndex, setSelectedFuelIndex] = useState(1);

  const { location } = useContext(SysVarContext);
  const { data, loading, error } = useFetchStations(location);

  const mapRef = useRef<MapView | null>(null);
  const listRef = useRef<FlatList<Station>>(null);

  useEffect(() => {
    setFilteredData(
      data.filter((station: Station) => {
        return station.Fuels.some((fuel) => fuel.id == selectedFuelIndex);
      })
    );
  }, [selectedFuelIndex, data]);

  if (!location) {
    // Handle case where location is not yet available
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

  if (loading) {
    // Handle loading state
    return (
      <Layout
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
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
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{error}</Text>
      </Layout>
    );
  }

  const OpenMapApp = async (station: Station) => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });

    const url = Platform.select({
      ios: `${scheme}${station.name + station.Address.city_line}`,
      android: `${scheme}${station.name + station.Address.city_line}`,
    }) as string;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url).catch((err) =>
        Alert.alert("Error", "Failed to open the link. Please try again later.")
      );
    } else {
      Alert.alert("Error", "Cannot open the link. This URL is not supported.");
    }
  };

  const FocusStationList = (station: Station) => {
    FocusStationMap(station);
    const index = filteredData.findIndex((item) => item.id === station.id);
    if (index !== -1) {
      listRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  const FocusStationMap = (station: Station) => {
    mapRef.current?.animateToRegion({
      latitude: parseFloat(station.Coordinates.latitude),
      longitude: parseFloat(station.Coordinates.longitude),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const renderMarker = (station: Station) => {
    const dieselFuel = station.Fuels.find(
      (fuel) => fuel.id === selectedFuelIndex
    );
    if (!dieselFuel) return null;

    return (
      <Marker
        key={station.id}
        coordinate={{
          latitude: parseFloat(station.Coordinates.latitude),
          longitude: parseFloat(station.Coordinates.longitude),
        }}
        onPress={() => FocusStationList(station)}
      >
        <View
          style={{
            ...styles.marker,
            backgroundColor: Fuel.find((item) => item.id == selectedFuelIndex)
              ?.backgroundColor,
          }}
        >
          <Text
            style={{
              ...styles.markerText,
              color: Fuel.find((item) => item.id == selectedFuelIndex)?.color,
            }}
          >
            {dieselFuel.Price.text}
          </Text>
        </View>
      </Marker>
    );
  };

  const renderCard = ({ item }: { item: Station }) => {
    const dieselFuel = item.Fuels.find((fuel) => fuel.id === selectedFuelIndex);
    if (!dieselFuel) return null;

    return (
      <Card style={styles.card} onPress={() => FocusStationMap(item)}>
        <Text category="h6">{item.name}</Text>
        <Text
          onPress={() => {
            OpenMapApp(item);
          }}
          style={styles.link}
          category="s1"
        >
          {item.Address.street_line}
        </Text>
        <Text category="s1">{item.Address.city_line}</Text>
        <Text category="c1">{item.Distance.text}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, width: width }}>
      <View style={styles.selectBar}>
        <Layout level="1">
          <Select
            onSelect={(index: IndexPath) => {
              setSelectedFuelIndex(index.row + 1);
            }}
          >
            {Fuel.map((item) => {
              return <SelectItem title={item.fuelName} />;
            })}
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
        {filteredData.map((station) => renderMarker(station))}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: "blue",
              borderRadius: 20,
            }}
          />
        </Marker>
      </MapView>
      <View style={styles.cardList}>
        <FlatList
          ref={listRef}
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          renderItem={renderCard}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  marker: {
    padding: 5,
    borderRadius: 5,
  },
  markerText: {
    fontWeight: "bold",
    color: "white",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  cardList: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    width: width - 50,
    marginHorizontal: 25,
  },
  link: {
    color: "blue",
  },
  selectBar: {
    position: "absolute",
    zIndex: 10,
    left: 0,
    right: 0,
  },
});

export default FuelMap;

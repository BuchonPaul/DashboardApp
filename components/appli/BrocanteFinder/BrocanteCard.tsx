import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Linking,
  Alert,
} from "react-native";
import { Text, Card } from "@ui-kitten/components";
import { getStationImage, fuelMapper } from "@/constants/Station";

export function BrocanteCard({
  name,
  address,
  distance,
  fuels,
  brand,
  lat,
  long,
}: any) {
  const scheme = Platform.select({
    ios: "maps://0,0?q=",
    android: "geo:0,0?q=",
  });
  const latLng = `${lat},${long}`;
  const label = "Custom Label";
  const url = Platform.select({
    ios: `${scheme}${name + address}`,
    android: `${scheme}${name + address}`,
  });

  const onClickHandler = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url).catch((err) =>
        Alert.alert("Error", "Failed to open the link. Please try again later.")
      );
    } else {
      Alert.alert("Error", "Cannot open the link. This URL is not supported.");
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Image style={styles.tinyLogo} source={getStationImage(brand.id)} />
        <Text category="h6">{name || "Nom non disponible"}</Text>
      </View>
      <Text style={styles.ggmapLink} onPress={onClickHandler}>
        {address}
      </Text>
      <Text style={styles.distance}>{distance}</Text>
      <View style={styles.brocantes}>
        {fuels.map((fuel: any) => (
          <View key={fuel.id} style={styles.brocantePriceCard}>
            <Image
              style={styles.brocanteLogo}
              source={fuelMapper[fuel.picto]}
            />
            <Text category="c2" style={styles.brocanteText}>
              {fuel.Price.text}
            </Text>
          </View>
        ))}
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
  ggmapLink: {
    color: "blue",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  distance: {
    marginTop: 8,
    opacity: 0.5,
  },
  brocantes: {
    flexDirection: "row",
    marginTop: 8,
    flexWrap: "wrap",
  },
  brocantePriceCard: {
    flexDirection: "column",
    marginRight: 20,
    alignItems: "center",
  },
  brocanteText: {
    textAlign: "center",
  },
  brocanteLogo: {
    width: 35,
    height: 35,
    borderRadius: 5,
  },
});

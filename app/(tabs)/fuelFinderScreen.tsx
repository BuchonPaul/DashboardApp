import { View, Text } from "react-native";
import { FuelMap } from "@/components/appli/FuelFinder/FuelMap";

export default function fuelFinderScreen({ option }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FuelMap />
    </View>
  );
}

import { View, Text } from "react-native";
import { Finder } from "@/components/appli/Finder";

export default function fuelFinderScreen({ option }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Finder />
    </View>
  );
}

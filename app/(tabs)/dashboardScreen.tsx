import { View, Text } from "react-native";
import { Dashboard } from "@/components/dashboard/Dashboard";

export default function DashboardScreen({ option }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Dashboard />
    </View>
  );
}

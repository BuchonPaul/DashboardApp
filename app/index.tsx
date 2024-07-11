// app/home.js
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Link href="/dashboardScreen" style={{ marginTop: 20 }}>
        <Button title="Go to Dashboard" />
      </Link>
    </View>
  );
}

import { StyleSheet, View } from "react-native";

export function DashboardCard({ appli }: any) {
  return <View style={styles.card}>{appli}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "lightgrey",
    width: "100%",
    height: "100%",
  },
});

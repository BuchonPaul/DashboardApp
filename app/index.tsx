import { Text, View } from "react-native";
import "tailwindcss-react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-lg">
        Hello, Tailwind CSS with React Native!
      </Text>
    </View>
  );
}

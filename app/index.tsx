import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome</Text>
      <Button title="Sign In" onPress={() => router.push("/testSelection")} />
      <Button title="To Logger" onPress={() => router.push("/logging")} />
    </View>
  );
}

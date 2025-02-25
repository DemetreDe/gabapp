import { useLocalSearchParams } from "expo-router";
import { useAuth } from './AuthContext';
import { View, Text, ScrollView, StyleSheet } from "react-native";

const ResultsScreen = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  const { data } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recorded Data</Text>
      <ScrollView>
        {parsedData.map((entry, index) => (
          <Text key={index} style={styles.text}>
            {JSON.stringify(entry)}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { marginBottom: 5, fontSize: 14 },
});

export default ResultsScreen;

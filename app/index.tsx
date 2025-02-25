import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { AuthProvider, useAuth } from './AuthContext';


export default function App() {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
}

function HomeScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = () => {
    signIn();
    router.push("/testSelection");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>GABAPP</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
      />
      <Button
        title="Sign In"
        onPress={handleSignIn}
        disabled={!username || !password}
      />
      <Button title="Debug Skip Sign in" onPress={handleSignIn} />
    </View>
  );
}

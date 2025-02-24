import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import testTypes from '../assets/tests.json';

const TestSelectionScreen = () => {
  const router = useRouter();

  const handleTestSelection = (testId) => {
    router.push({ pathname: '/logging', params: { testId } });
  };

  return (
    <View style={styles.container}>
      {testTypes.tests.map((test) => (
        <Button
          key={test.test_id}
          title={test.test_name}
          onPress={() => handleTestSelection(test.test_id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default TestSelectionScreen;
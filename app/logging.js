import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Gyroscope, Accelerometer, Magnetometer } from "expo-sensors";
import { useAuth } from './AuthContext';
import testTypes from '../assets/tests.json';

const LoggingScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [dataLog, setDataLog] = useState([]);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }
  const { testId } = useLocalSearchParams();
  let recordingTimer;

  const test = testTypes.tests.find(t => t.test_id === testId);

  useEffect(() => {
    let accelerometerSubscription, gyroscopeSubscription, magnetometerSubscription;

    if (isRecording) {
      setDataLog([]); // Reset data log on start

      Accelerometer.setUpdateInterval(10);
      Gyroscope.setUpdateInterval(10);
      Magnetometer.setUpdateInterval(10);

      accelerometerSubscription = Accelerometer.addListener((data) => {
        setDataLog((prevLog) => [...prevLog, { timestamp: Date.now(), type: "Accelerometer", ...data }]);
      });

      gyroscopeSubscription = Gyroscope.addListener((data) => {
        setDataLog((prevLog) => [...prevLog, { timestamp: Date.now(), type: "Gyroscope", ...data }]);
      });

      magnetometerSubscription = Magnetometer.addListener((data) => {
        setDataLog((prevLog) => [...prevLog, { timestamp: Date.now(), type: "Magnetometer", ...data }]);
      });

      // Stop automatically after the test duration
      recordingTimer = setTimeout(() => stopRecording(), parseInt(test.test_duration));
    }

    return () => {
      accelerometerSubscription?.remove();
      gyroscopeSubscription?.remove();
      magnetometerSubscription?.remove();
      clearTimeout(recordingTimer);
    };
  }, [isRecording]);

  const stopRecording = () => {
    setIsRecording(false);
    setDataLog((prevLog) => {
      router.push({ pathname: "/results", params: { data: JSON.stringify(prevLog) } });
      return prevLog;
    });
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording(); // Stop and navigate when manually stopped
    } else {
      setIsRecording(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Test ID: {testId}</Text>
      <Text>Test Name: {test.test_name}</Text>
      <Text>Instructions: {test.test_instructions}</Text>
      <Text>Duration: {parseInt(test.test_duration) / 60000} Minutes</Text>
      <Button title={isRecording ? "Stop" : "Start"} onPress={toggleRecording} />
      <Text style={styles.text}>Logged Entries: {dataLog.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { textAlign: "center", marginTop: 10 },
});

export default LoggingScreen;
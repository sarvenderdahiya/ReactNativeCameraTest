import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
	const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
	const [type, setType] = useState(CameraType.back);

  //TODO Handle no permissions

  function toggleCameraType() {
    if (!cameraPermission) {
      Linking.openSettings();
    }
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const permisionFunction = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(cameraPermission.status === 'granted');

    if (cameraPermission.status !== 'granted') {
      alert('Grant Camera Permissions Please!');
    }
  }

  useEffect(() => {
    permisionFunction();
  }, []);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}> 
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Palat</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 0.9,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.3,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});


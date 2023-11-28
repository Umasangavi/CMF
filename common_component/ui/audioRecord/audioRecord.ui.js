import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { Assets, Colors, NavButton } from "../../utils/imports.utils";

const AudioRecording = () => {
  const [recording, setRecording] = useState(null);
  const [soundUri, setSoundUri] = useState(null);
  const [recorData, setRecord] = useState([]);
  console.log("✌️recorData --->", recorData);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recordingObj = new Audio.Recording();
      await recordingObj.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingObj.startAsync();
      setRecording(recordingObj);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const getDurationFormat = (milliseconds) => {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const arr = [];
      arr.push({
        sound: sound,
        duration: getDurationFormat(status.durationMillis),
        file: recording.getURI(),
      });
      const uri = recording.getURI();
      setRecord(arr);
      setSoundUri(uri);
      setRecording(null);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const handleLongPressIn = () => {
    startRecording();
  };

  const handleLongPressOut = () => {
    stopRecording();
  };

  const getRecordings = () => {
    return recorData?.map((item, index) => {
      return (
        <View key={index}>
          <Text size={20} color={Colors.Dark}>
            {item.duration}
          </Text>

          <NavButton
            height={45}
            width={45}
            radius={30}
            icon={Assets.mic}
            onPress={() => {
              item.sound.replayAsync();
            }}
            background={Colors.light}
            color={Colors.light}
            iconWidth={25}
            iconHeight={25}
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={handleLongPressIn}
        onPressOut={handleLongPressOut}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="mic" size={50} color="black" />
        </View>
      </TouchableWithoutFeedback>
      {/* Display recorded sound URI */}
      {getRecordings()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    padding: 10,
  },
});

export default AudioRecording;

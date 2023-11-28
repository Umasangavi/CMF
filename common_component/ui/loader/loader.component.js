import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { Colors } from "../../../utils/imports.utils";

export default function Loader() {
  return (
    <View>
      <ActivityIndicator size={"small"} color={Colors.textPrimary} />
    </View>
  );
}

const css = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Toggle from "react-native-toggle-input";
import { Colors } from "../../utils/imports.utils";

export default function Switch(props) {
  const { color, size, onchange ,value} = props;
  return (
    <Toggle
      color={color ? color : Colors.toggle}
      size={size ? size : 25}
      filled={true}
      circleColor={Colors.light}
      toggle={value}
      setToggle={() => onchange()}
    />
  );
}

const styles = StyleSheet.create({});

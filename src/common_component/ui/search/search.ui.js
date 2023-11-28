import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SearchBar } from "react-native-elements";
import { Colors } from "../../../utils/imports.utils";
import { Width } from "../../../utils/function.utils";

export default function Search(props) {
  const {
    value,
    onChange,
    height,
    backgroundColor,
    borderRadius,
    placeholder,
    size,
    family,
    color,
  } = props;
  return (
    <View style={{ with: "100%" }}>
      <SearchBar
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        containerStyle={[
          css.container,
          {
            height: height ? height : 50,
            backgroundColor: backgroundColor ? backgroundColor : Colors.light,
            borderRadius: borderRadius ? borderRadius : 30,
          },
        ]}
        inputStyle={[
          css.inputStyle,
          {
            fontSize: Width(size ? size : 18 || 5) / 4,

            fontFamily: family ? family : "regular",
            color: color ? color : Colors.Dark,
          },
        ]}
        inputContainerStyle={css.inputContainerStyle}
        placeholderTextColor={Colors.textGray}
      />
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "transparent",
    overflow: "hidden",
  },
  inputStyle: {
    height: "100%",
    borderWidth: 0,
    borderColor: "transparent",
  },
  inputContainerStyle: {
    // paddingVertical: 10,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "none",
  },
});

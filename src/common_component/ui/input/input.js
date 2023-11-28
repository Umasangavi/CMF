import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { Colors, Constants, Text } from "../../../utils/imports.utils";
import { Width, useSetState } from "../../../utils/function.utils";

export default function Input(props) {
  const {
    value,
    onChange,
    placeholder,
    placeholderTextColor,
    color,
    size,
    height,
    borderRadius,
    borderWidth,
    borderColor,
    fontfamily,
    inputStyle,
    multiline,
    numberOfLines,
    headerText,
    textAlignVertical,
    paddingTop,
    require,
    headerFamily,
  } = props;

  const [state, setState] = useSetState({
    show: false,
  });

  return (
    <View style={{ gap: 10 }}>
      {headerText && (
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text
            color={Colors.Dark}
            size={Width(size || 5) / 4}
            family={headerFamily ? headerFamily : "regular"}
          >
            {headerText}
          </Text>
          {require && (
            <Text
              color={Colors.error}
              size={Width(size || 5) / 4}
              family={"bold"}
            >
              *
            </Text>
          )}
        </View>
      )}
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : Colors.textGray
        }
        secureTextEntry={props.secure ? (state.show ? false : true) : false}
        style={[
          css.input,
          {
            color: color ? color : Colors.Dark,
            fontSize: Width(size || 5) / 4,
            fontFamily: fontfamily ? fontfamily : "regular",
            width: "100%",
            height: height ? height : 50,
            borderRadius: borderRadius ? borderRadius : 8,
            borderWidth: borderWidth ? borderWidth : 0.5,
            borderColor: borderColor ? borderColor : Colors.borderColor,
            textAlignVertical: textAlignVertical ? textAlignVertical : "center",
            paddingTop: paddingTop,
          },
          inputStyle,
        ]}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={multiline}
        scrollEnabled={multiline}
        numberOfLines={numberOfLines}
        {...props}
      ></TextInput>
    </View>
  );
}

const css = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    fontFamily: Constants.regular,
    paddingLeft: Width(5),
    // borderRadius: 16,
  },
});

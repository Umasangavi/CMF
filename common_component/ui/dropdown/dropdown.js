import { StyleSheet, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Colors, Text } from "../../../utils/imports.utils";
import { Width } from "../../../utils/function.utils";

export default function Dropdown(props) {
  const {
    value,
    onchange,
    placeholder,
    height,
    option,
    backgroundColor,
    borderRadius,
    borderColor,
    borderWidth,
    size,
    headerText,
    require,
    family,
    headerLeft,
  } = props;
  return (
    <View style={{ gap: 10 }}>
      {headerText && (
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            paddingLeft: headerLeft ? headerLeft : 0,
          }}
        >
          <Text
            color={Colors.Dark}
            size={Width(size || 5) / 4}
            family={family ? family : "bold"}
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
      <View
        style={[
          css.container,
          {
            height: height ? height : 55,
            borderWidth: borderWidth ? borderWidth : 0,
            borderColor: borderColor ? borderColor : Colors.borderColor,
            borderRadius: borderRadius ? borderRadius : 30,
          },
        ]}
      >
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => onchange(itemValue)}
          dropdownIconColor={Colors.textGray}
          style={[
            css.pickerStyles,
            {
              backgroundColor: backgroundColor
                ? backgroundColor
                : Colors.lightGrey,
            },
          ]}
        >
          <Picker.Item
            color={Colors.textGray}
            label={placeholder}
            value=""
            style={{ fontSize: Width(size || 5) / 4 }}
          />

          {option?.length > 0 &&
            option?.map((item) => (
              <Picker.Item label={item?.label} value={item?.value} />
            ))}
        </Picker>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  pickerStyles: {
    width: "100%",
    textAlignVertical: "center",
    marginVertical: -5,
  },
});

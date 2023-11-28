import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Colors, Text } from "../../../utils/imports.utils";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

const PrimaryButton = (props) => {
  const {
    text,
    color,
    backgroundColor,
    activity,
    onPress,
    width,
    height,
    style,
    disabled,
    icon,
    family,
    size,
    center,
    disableColor,
    borderRadius
  } = props;

  const [fontsLoaded] = useFonts({
    regular: require("../../../assets/fonts/Roboto-Regular.ttf"),
    bold: require("../../../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Return null or a loading indicator while fonts are loading.
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || activity}
    >
      <LinearGradient
        onPress={onPress}
        // Button Linear Gradient
        colors={
          disabled
            ? [Colors.Dark, Colors.textGreen]
            : backgroundColor
            ? backgroundColor
            : ["#FF9FC7", "#F32878"]
        }
        style={[
          css.container,
          {
            width: width ? width : "100%",
            height: height ? height : 50,
            borderRadius:borderRadius?borderRadius: 25,
            // backgroundColor: disabled
            //   ? disableColor
            //     ? disableColor
            //     : Colors.disabled
            //   : backgroundColor
            //   ? backgroundColor
            //   : Colors.white,

            color: color,
          },
          center && { alignSelf: "center" },
          style,
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={css.icon}>
          {icon && (
            <View style={css.iconContainer}>
              <props.icon width={25} height={25} />
            </View>
          )}
          {!activity ? (
            <Text
              size={size ? size : 20}
              family={family ? family : "bold"}
              color={Colors.light}
            >
              {text}
            </Text>
          ) : (
            <ActivityIndicator size="small" color={Colors.light} />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const css = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,

  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -15,
  },
});

export default PrimaryButton;

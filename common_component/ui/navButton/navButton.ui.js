import React from "react";
import {
  Ratio,
  Colors,
  Icon,
  Text,
  Image,
  Constants,
} from "../../../utils/imports.utils";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Animated,
} from "react-native";

const Navbutton = (props) => {
  const {
    text,
    color,
    activity,
    onPress,
    width,
    icon,
    height,
    style,
    background,
    iconWidth,
    iconHeight,
    radius,
  } = props;

  return (
    <TouchableHighlight
      underlayColor={Colors.light}
      onPress={onPress}
      activeOpacity={0.8}
      style={[css.container, { width: width, height: height }, style]}
    >
      <>
        <View
          style={[
            css.icon,
            {
              width: width ? width : 100,
              height: height ? height : 100,
              backgroundColor: background ? background : Colors.light,
              borderRadius: radius ? radius : 16,
            },
          ]}
        >
          {activity ? (
            <ActivityIndicator size="small" color={Colors.light} />
          ) : text ? (
            <Text style={[css.text, { color: color }]}>{text}</Text>
          ) : (
            <Image
              src={icon}
              width={iconWidth ? iconWidth : 15}
              height={iconHeight ? iconHeight : 15}
            />
          )}
        </View>
      </>
    </TouchableHighlight>
  );
};

Navbutton.defaultProps = {
  width: 100,
  height: 100,
  text: "",
  svg: true,
};
const css = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    borderRadius: 16,
  },
  text: {
    fontSize: 15,
    color: Colors.fontColor,
  },
});
export default Navbutton;

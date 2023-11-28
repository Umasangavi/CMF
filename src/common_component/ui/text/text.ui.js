import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Constants, Image } from "../../../utils/imports.utils";
import { Width } from "../../../utils/function.utils";

const TextComponent = (props) => {
  const {
    color,
    size,
    weight,
    left,
    right,
    top,
    bottom,
    family,
    onPress,
    style,
    children,
    // iconPosition,
    // source,
    lineHeight,
    opacity,
    textAlign,
    numberOfLines,
    textDecorationLine
  } = props;

  return (
    <View style={css.container}>
      {/* {iconPosition == "start" ? (
        <Image src={source} width={props.iconWidth} height={props.iconHeight} />
      ) : null} */}
      <Text
        onPress={onPress}
        {...props}
        allowFontScaling={false}
        numberOfLines={numberOfLines}
        style={[
          css.text,
          {
            color: color,
            fontSize: Width(size || 5) / 4,
            fontWeight: weight,
            marginLeft: left,
            marginRight: right,
            marginTop: top,
            marginBottom: bottom,
            fontFamily: family,
            lineHeight: lineHeight,
            opacity: opacity,
            textAlign: textAlign,
            textDecorationLine:textDecorationLine
          },
          style,
        ]}
      >
        {children}
      </Text>
      {/* {iconPosition == "end" ? (
        <Image src={source} width={props.iconWidth} height={props.iconHeight} />
      ) : null} */}
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
  },
});

export default TextComponent;

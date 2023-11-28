import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useSetState, Width } from "../../../utils/function.utils";
import {
  Colors,
  Constants,
  Assets,
  Image,
  Text,
} from "../../../utils/imports.utils";

const Input = (props) => {
  const {
    placeholder,
    styles,
    children,
    leftIconPosition,
    rightIcon,
    leftIcon,
    color,
    borderColor,
    size,
    iconStyle,
    imageWidth,
    imageHeight,
    fontfamily,
    backgroundColor,
    iconOnPress,
    inputStyle,
    placeholderTextColor,
    secure,
    value,
    onChange,
    headerText,
    borderWidth,
    borderRadius,
    editable,onPressIn
  } = props;

  const [state, setState] = useSetState({
    show: false,
  });

  return (
    <>
      {headerText && (
        <Text color={Colors.Dark} size={18} family={"bold"} left={5}>
          {headerText}
        </Text>
      )}

      <View
        style={[
          css.inputContainer,
          styles,
          {
            borderColor: borderColor ? borderColor : Colors.inputBg,
            backgroundColor: backgroundColor ? backgroundColor : Colors.inputBg,
            borderWidth: borderWidth ? borderWidth : 0,
            borderRadius: borderRadius ? borderRadius : 22,
          },
        ]}
      >
        {leftIconPosition && (
          <TouchableOpacity
            onPress={iconOnPress}
            style={[css.imageView, iconStyle]}
            activeOpacity={1}
          >
            <Image
              src={leftIcon}
              width={imageWidth ? imageWidth : 22}
              height={imageHeight ? imageHeight : 22}
              borderRadius={5}
            />
          </TouchableOpacity>
        )}
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          editable={editable ? editable : true}
          onPressIn={onPressIn}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : Colors.textGray
          }
          secureTextEntry={props.secure ? (state.show ? false : true) : false}
          style={[
            css.input,
            {
              color: color ? color : Colors.Dark,
              fontSize: Width(size || 5) / 4,
              fontFamily: fontfamily ? fontfamily : Constants.regular,
              width:
                leftIconPosition && !secure
                  ? "85%"
                  : leftIconPosition && secure
                  ? "70%"
                  : "100%",
            },
            inputStyle,
          ]}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        ></TextInput>
        {secure && (
          <TouchableHighlight
            onPress={() => setState({ show: !state.show })}
            style={[css.imageView, iconStyle]}
            activeOpacity={1}
          >
            <>
              <Image
                src={rightIcon}
                width={imageWidth ? imageWidth : 22}
                height={imageHeight ? imageHeight : 22}
              />
            </>
          </TouchableHighlight>
        )}
      </View>
    </>
  );
};

const css = StyleSheet.create({
  inputContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
    borderRadius: 30,
    backgroundColor: Colors.inputBg,
    borderWidth: 0,
    overflow: "hidden",
  },
  input: {
    paddingHorizontal: 10,
    fontFamily: Constants.regular,
    paddingLeft: Width(5),
    // borderRadius: 16,
    textAlignVertical: "center",
  },
  imageView: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default Input;

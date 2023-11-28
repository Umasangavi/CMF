import { StyleSheet, TouchableHighlight, View } from "react-native";
import React from "react";
import {
  Assets,
  Colors,
  NavButton,
  Text,
  Image,
} from "../../utils/imports.utils";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function Header(props) {
  const {
    label,
    rightIcon,
    rightIconOnPress,
    backgroundColor,
    iconWidth,
    iconHeight,
    messageBox,
  } = props;

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    regular: require("../../assets/fonts/Roboto-Regular.ttf"),
    bold: require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Return null or a loading indicator while fonts are loading.
  }

  return (
    <View style={css.container}>
      <TouchableHighlight
        style={css.iconContainer}
        underlayColor={Colors.light}
        onPress={() => navigation.goBack()}
      >
        <NavButton
          icon={Assets.left_arrow}
          height={40}
          width={40}
          onPress={() => navigation.goBack()}
        />
      </TouchableHighlight>
      <View
        style={[
          css.text,
          {
            width: rightIcon ? "60%" : "70%",
          },
        ]}
      >
        <Text size={22} family={"bold"}>
          {label}
        </Text>
      </View>
      {rightIcon && (
        <View style={{ width: "20%", alignItems: "flex-end" }}>
          {messageBox ? (
            <>
              <View style={css.msgBox}>
                <Image src={Assets.msg} height={20} width={20} />
                <View style={css.msgText}>
                  <Text size={10} family={"regular"} color={Colors.light}>
                    {10}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <NavButton
              height={40}
              width={40}
              background={backgroundColor ? backgroundColor : Colors.light}
              radius={100}
              icon={rightIcon ? rightIcon : Assets.filter}
              iconWidth={iconWidth ? iconWidth : 25}
              iconHeight={iconHeight ? iconHeight : 25}
              onPress={rightIconOnPress}
            />
          )}
        </View>
      )}
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    width: "20%",
    borderRadius: 15,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
  msgBox: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: Colors.light,
    alignItems: "center",
    justifyContent: "center",
  },
  msgText: {
    position: "absolute",
    height: 18,
    width: 18,
    borderRadius: 20,
    backgroundColor: Colors.textPrimary,
    top: 6,
    right: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

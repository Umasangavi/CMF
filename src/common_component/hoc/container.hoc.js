import React, { useEffect } from "react";
import { View, StatusBar, StyleSheet, Platform } from "react-native";
import { Error, Colors, Functions, Loader } from "../../utils/imports.utils";
let statusbar = StatusBar.currentHeight;

export default function Containers(props) {
  const {
    children,
    style,
    loading,
    error,
    onPress,
    errorMessage,
    screen,
    backgroundColor,
  } = props;

  if (error) {
    return (
      <View style={[css.containerActivity, style]}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={backgroundColor ? backgroundColor : "transparent"}
          translucent={true}
        ></StatusBar>
        <Error onPress={onPress} errorMessage={errorMessage} />
      </View>
    );
  }
  if (loading) {
    return (
      <View style={[css.containerActivity, style]}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={backgroundColor ? backgroundColor : "transparent"}
          translucent={true}
        ></StatusBar>
        <Loader />
      </View>
    );
  } else {
    return (
      <View style={[screen ? css.containerScreen : css.container, style]}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={backgroundColor ? backgroundColor : "transparent"}
          translucent={true}
        ></StatusBar>
        {!loading && children}
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {},
  containerScreen: {
    paddingTop: statusbar,
    // backgroundColor: Colors.light,
    width: Functions.width,
    height: Platform.OS === "android" ? Functions.height : Functions.height,
    // paddingBottom: aspectRatio < 1.8 ? 30 : isIphoneX() ? getBottomSpace() : 0,
    // paddingBottom: isIphoneX() ? getBottomSpace() : 0,
  },
  containerActivity: {
    // backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    width: Functions.width,
    height:
      Platform.OS === "android"
        ? Functions.height
        : Functions.height + statusbar,
  },
});

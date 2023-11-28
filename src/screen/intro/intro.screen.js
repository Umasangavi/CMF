import { StyleSheet, View, ScrollView, TouchableHighlight } from "react-native";
import React from "react";
import {
  Assets,
  Colors,
  Constants,
  Image,
  PrimaryButton,
  Text,
} from "../../utils/imports.utils";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Container, { Toast } from "toastify-react-native";

import {
  Height,
  Width,
  setItem,
  useSetState,
} from "../../utils/function.utils";
import { useNavigation } from "@react-navigation/native";
import Containers from "../../common_component/hoc/container.hoc";

export default function Intro() {
  const navigation = useNavigation();

  return (
    <Containers screen style={css.container}>
      <Container style="top" />
      <View style={css.wrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: "100%", height: "100%" }}
        >
          {/* <LinearGradient
        // Button Linear Gradient
        colors={["#FF9FC7", "#F32878"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      > */}
          <View>
            <View style={css.img_container}>
              <View style={css.img}>
                <Image src={Assets.group} height={"100%"} width={"100%"} />
              </View>
            </View>
            <View style={css.input_container}>
              <Text
                color={Colors.textPrimary}
                size={40}
                family={"bold"}
                onPress={() => navigation.navigate("forget_password")}
              >
                Welcome
              </Text>
              <Text
                color={Colors.lightDark}
                size={20}
                family={"regular"}
                textAlign="center"
                onPress={() => navigation.navigate("forget_password")}
              >
                Reference site about Lorem{"\n"}Ipsum, giving information
                origins
              </Text>
              <View style={{ alignItems: "center", gap: -10, paddingTop: 15 }}>
                <PrimaryButton
                  height={50}
                  width={Width(80)}
                  text={"Login"}
                  color={Colors.light}
                  onPress={() => navigation.navigate("signIn")}
                />
                <PrimaryButton
                  height={50}
                  width={Width(80)}
                  text={"Register"}
                  color={Colors.light}
                  backgroundColor={Constants.btnLightBlue}
                  onPress={() => navigation.navigate("signUp")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Containers>
  );
}

const css = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: "100%",
    width: "98%",
    alignItems: "center",
  },
  img_container: {
    height: Height(55),
    alignItems: "center",
    justifyContent: "center",
  },
  img: { height: 300, width: 300, overflow: "hidden" },
  input_container: {
    height: Height(38),
    width: "100%",
    backgroundColor: Colors.light,
    borderRadius: 20,
    padding: 12,
    gap: 8,
    alignItems: "center",
  },
  text_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  text: { flexDirection: "row", alignItems: "center", gap: 10 },
});

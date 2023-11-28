import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import {
  Assets,
  Colors,
  Image,
  PrimaryButton,
  Text,
} from "../../utils/imports.utils";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Container, { Toast } from "toastify-react-native";

import { Height } from "../../utils/function.utils";
import { useNavigation } from "@react-navigation/native";
import Containers from "../../common_component/hoc/container.hoc";

export default function Splash() {
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
                size={25}
                family={"bold"}
                onPress={() => navigation.navigate("forget_password")}
              >
                Join for an exciting{"\n"}musical experience{"\n"}and explore
                the world{"\n"}of music
              </Text>
              <View style={{ alignItems: "center" }}>
                <PrimaryButton
                  height={50}
                  width={220}
                  text={"Become a member"}
                  color={Colors.light}
                  onPress={() => navigation.navigate("intro")}
                />
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                paddingTop: 30,
              }}
            >
              <View style={{ width: "30%" }}>
                <PrimaryButton
                  height={40}
                  width={"100%"}
                  text={"Skip"}
                  color={Colors.light}
                  onPress={() => navigation.navigate("home")}
                  backgroundColor={["#FFBF35", "#FFA900"]}
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
    height: Height(30),
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

import { StyleSheet, View, ScrollView, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Assets,
  Colors,
  Constants,
  Header,
  Image,
  Models,
  NavButton,
  PrimaryButton,
  Text,
  TextInput,
} from "../../utils/imports.utils";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Container, { Toast } from "toastify-react-native";

import { Height, setItem, useSetState } from "../../utils/function.utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../utils/axios.utils";
import { useNavigation } from "@react-navigation/native";
import Containers from "../../common_component/hoc/container.hoc";

export default function Login() {
  const navigation = useNavigation();

  const [state, setState] = useSetState({
    loading: false,
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      setState({ loading: true });
      if (state.email == "") {
        Toast.error("user name is required");
        setState({ loading: false });
      } else if (state.password == "") {
        Toast.error("password is required");
        setState({ loading: false });
      } else {
        const body = {
          username: state.email,
          password: state.password,
        };
        const result = await Models.auth.login(body);
        setState({ loading: false, email: "", password: "" });
        AsyncStorage.setItem("token", `Token ${result.token}`);
        Toast.success("Login Successfully");
        navigation.navigate("home");
      }
    } catch (e) {
      console.log("✌️e --->", e);
      setState({ loading: false });
      Toast.error(e.response.data.error);
      console.log(e);
    }
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 0.1 }}
      // end={{ x: 1, y: 0.2}}
      colors={[
        "rgba(255, 191, 53, 0.1)", // #FFBF35 with 50% opacity
        "rgba(108, 77, 218, 0.2)", // #6C4DDA with 50% opacity
        "rgba(255, 195, 203, 0.2)", // #FFC3CB with 50% opacity
        "rgba(255, 195, 221, 0.2)", // #FFC3DD with 50% opacity
        "rgba(255, 228, 244, 0.2)", // #FFE4F4 with 50% opacity
        "rgba(0, 210, 225, 0.1)", // #00D2E1 with 50% opacity
        "rgba(255, 226, 133, 0.4)", // #FFE285 with 50% opacity
        "rgba(0, 210, 225, 0.1)",
        "rgba(134, 104, 254, 0.2)", // #8668FE with 50% opacity
        "rgba(255, 78, 152, 0.2)", // #FF4E98 with 50% opacity
      ]}
      // locations={[0.2, 1, 0.2, 1, 1, 1, 1, 1, 1]}
      style={{ width: "100%" }}
      angle={300}
    >
      <Containers style={css.container} screen backgroundColor="transparent">
        <Container style="top" />
        <View style={css.wrapper}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={css.heading_container}>
              <Header label="Sign In" />
            </View>
            {/* <LinearGradient
        // Button Linear Gradient
        colors={["#FF9FC7", "#F32878"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      > */}
            <View style={css.img_container}>
              <View style={css.img}>
                <Image
                  src={Assets.mobile_ping_1}
                  height={"100%"}
                  width={"100%"}
                />
              </View>
            </View>
            <View style={css.input_container}>
              <TextInput
                placeholder="Email"
                leftIconPosition
                height={50}
                size={20}
                leftIcon={Assets.email_ping}
                value={state.email}
                onChange={(e) => setState({ email: e })}
              />
              <TextInput
                placeholder="Password"
                rightIconPosition
                leftIconPosition
                height={50}
                secure
                size={20}
                leftIcon={Assets.lock}
                rightIcon={Assets.eye_open}
                value={state.password}
                onChange={(e) => setState({ password: e })}
              />
              <View style={css.text_container1}>
                <View style={css.text}>
                  <Image src={Assets.checked} height={20} width={20} />
                  <Text color={Colors.Dark} size={18} family={"regular"}>
                    Remember me
                  </Text>
                </View>
                <TouchableHighlight
                  onPress={() => navigation.navigate("forget_password")}
                  underlayColor={Colors.light}
                >
                  <Text
                    color={Colors.textPrimary}
                    size={18}
                    family={"regular"}
                    onPress={() => navigation.navigate("forget_password")}
                  >
                    Forgot password ?
                  </Text>
                </TouchableHighlight>
              </View>
              <PrimaryButton
                height={50}
                width={"100%"}
                text={"Sign In"}
                color={Colors.light}
                activity={state.loading}
                onPress={() => handleSubmit()}
              />
            </View>
            {/* <View
            style={{
              height: Height(25),
              // backgroundColor: "blue",
              justifyContent: "center",
            }}
          > */}
            <View
              style={css.text_container2}>
              <View style={css.text}>
                <Text color={Colors.Dark} size={20} family={"regular"}>
                  Don't have an account ?
                </Text>
              </View>
              <TouchableHighlight
                onPress={() => navigation.navigate("signUp")}
                underlayColor={Colors.white}
              >
                <>
                  <Text
                    color={Colors.textPrimary}
                    size={20}
                    family={"bold"}
                    onPress={() => navigation.navigate("signUp")}
                  >
                    Sign up !
                  </Text>
                </>
              </TouchableHighlight>
            </View>
            {/* </View> */}
          </ScrollView>
        </View>
      </Containers>
    </LinearGradient>
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
    width: "95%",
    alignItems: "center",
  },
  heading_container:{
    height: Height(10),
    alignItems: "center",
    justifyContent: "center",
  },
  img_container: {
    height: Height(40),
    alignItems: "center",
    justifyContent: "center",
  },
  img: { height: 200, width: 200, overflow: "hidden" },
  input_container: {
    height: Height(35),
    backgroundColor: Colors.light,
    borderRadius: 20,
    padding: 12,
    gap: 8,
    // alignItems: "center",
    // justifyContent: "center",
  },
  text_container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  text_container2:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  text: { flexDirection: "row", alignItems: "center", gap: 10 },
});

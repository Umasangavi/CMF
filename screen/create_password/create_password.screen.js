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

export default function Create_password() {
  // const [fontsLoaded] = useFonts({
  //   regular: require("../../assets/fonts/Roboto-Regular.ttf"),
  //   bold: require("../../assets/fonts/Roboto-Bold.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null; // Return null or a loading indicator while fonts are loading.
  // }

  const navigation = useNavigation();

  const [state, setState] = useSetState({
    loading: false,
    password: "",
    validLength: false,
    validUpperCase: false,
    validNumber: false,
  });

  const handleSubmit = async () => {
    try {
      setState({ loading: true });
      if (state.password == "") {
        Toast.error("Password is required");
        setState({ loading: false });
      } else if (
        !state.validLength ||
        !state.validNumber ||
        !state.validUpperCase
      ) {
        Toast.error("Password is not strong");
        setState({ loading: false });
      } else {
        const body = {
          password: state.password,
        };

        // const result = await Models.auth.forget_password(body);
        setState({ loading: false, password: "" });
        // console.log("✌️result --->", result);
        // AsyncStorage.setItem("token", `Token ${result.token}`);
        // Toast.success("Login Successfully");
        // navigation.navigate("signUp");
      }
    } catch (e) {
      console.log("✌️e --->", e);
      setState({ loading: false });
      Toast.error(e.response.data.error);
      console.log(e);
    }
  };

  const onChange = (text) => {
    setState({
      password: text,
      validLength: text.length >= 8 ? true : false,
      validUpperCase: /[A-Z]/.test(text) ? true : false,
      validNumber: /\d/.test(text) ? true : false,
    });
  };
  return (
    <View style={css.container}>
      <Container style="top" />
      <View style={css.wrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={css.header}>
            <Header label="Create password" />
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
              <Image src={Assets.mobile_ping} height={"100%"} width={"100%"} />
            </View>
          </View>
          <View style={css.input_container}>
            <View style={css.content_container}>
              <Text
                color={Colors.textGray}
                size={18}
                family={"regular"}
                textAlign="center"
              >
                Choose a secure password that will be{"\n"}easy for you to
                remember.
              </Text>
            </View>
            <TextInput
              // iconPosition="start"
              rightIconPosition
              leftIconPosition
              height={50}
              secure
              size={20}
              leftIcon={Assets.lock}
              rightIcon={Assets.eye_open}
              value={state.password}
              onChange={(e) => onChange(e)}
            />

            <View style={css.text_container}>
              <View style={css.text_wrapper}>
                <View style={css.image_container}>
                  <Image
                    src={
                      state.validLength ? Assets.tick_green : Assets.tick_grey
                    }
                    height={state.validLength ? 15 : 20}
                    width={state.validLength ? 15 : 20}
                  />
                </View>
                <Text
                  color={state.validLength ? Colors.green : Colors.textColor}
                  size={18}
                  family={"regular"}
                >
                  Has at least 8 characters
                </Text>
              </View>
              <View style={css.text_wrapper}>
              <View style={css.image_container}>
                  <Image
                    src={
                      state.validUpperCase
                        ? Assets.tick_green
                        : Assets.tick_grey
                    }
                    height={state.validUpperCase ? 15 : 20}
                    width={state.validUpperCase ? 15 : 20}
                  />
                </View>
                <Text
                  color={state.validUpperCase ? Colors.green : Colors.textColor}
                  size={18}
                  family={"regular"}
                >
                  Has an uppercase letter or symbol
                </Text>
              </View>
              <View style={css.text_wrapper}>
              <View style={css.image_container}>
                  <Image
                    src={
                      state.validNumber ? Assets.tick_green : Assets.tick_grey
                    }
                    height={state.validNumber ? 15 : 20}
                    width={state.validNumber ? 15 : 20}
                  />
                </View>
                <Text
                  color={state.validNumber ? Colors.green : Colors.textColor}
                  size={18}
                  family={"regular"}
                >
                  Has a number
                </Text>
              </View>
            </View>
          </View>
          <View style={css.send_container}>
            <PrimaryButton
              text={"Send"}
              activity={state.loading}
              onPress={() => handleSubmit()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
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
    paddingTop: 30,
  },
  header: {
    height: Height(10),
    alignItems: "center",
    justifyContent: "center",
  },
  img_container: {
    height: Height(40),
    alignItems: "center",
    justifyContent: "center",
  },
  img: { height: 220, width: 200, overflow: "hidden" },
  input_container: {
    height: Height(32),
    backgroundColor: Colors.light,
    borderRadius: 20,
    padding: 12,
    gap: 8,
    // alignItems: "center",
    // justifyContent: "center",
  },
  content_container: {
    alignItems: "center" 
  },
  text_container: {
    paddingTop: 10,
    gap: 5,
  },
  text_wrapper:{
    flexDirection: "row", gap: 5, alignItems: "center" 
  },
  image_container:{
    width: 20,
    height: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  text: { flexDirection: "row", alignItems: "center", gap: 10 },
  send_container:{ paddingTop: 10 }
});

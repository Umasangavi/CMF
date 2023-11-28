import { StyleSheet, View, ScrollView, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Assets,
  Colors,
  Constants,
  Dropdown,
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
import { Picker } from "@react-native-picker/picker";

export default function Select_location() {
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
    country: "",
    city: "",
  });

  const handleSubmit = async () => {
    try {
      setState({ loading: true });
      if (state.country == "") {
        Toast.error("Choose contry");
        setState({ loading: false });
      } else if (state.city == "") {
        Toast.error("Choose city");
        setState({ loading: false });
      } else {
        const body = {
          country: state.country,
          city: state.city,
        };
        const result = await Models.auth.forget_password(body);
        setState({ loading: false, email: "" });
        console.log("✌️result --->", result);
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
  return (
    <View style={css.container}>
      <Container style="top" />
      <View style={css.wrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={css.header}>
            <Header label="Select Location" />
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
              <Image src={Assets.mobile_blue} height={"100%"} width={"100%"} />
            </View>
          </View>

          <View style={css.input_container}>
            <Dropdown
              value={state.country}
              onchange={(value) => setState({ country: value })}
              option={[]}
              placeholder="Select your country"
            />
            <Dropdown
              value={state.city}
              onchange={(value) => setState({ city: value })}
              option={[]}
              placeholder="Select your city"
            />
            <PrimaryButton
              text={"Continue"}
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
    width: "99%",
    paddingTop: 30,
    padding: 5,
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
  img: { height: 210, width: 200, overflow: "hidden" },
  input_container: {
    height: Height(30),
    width: "100%",
    backgroundColor: Colors.light,
    borderRadius: 20,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    gap: 8,
    alignItems: "center",
  },
});

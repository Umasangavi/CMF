import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  FlatList,
} from "react-native";
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

import { Height, Width, setItem, useSetState } from "../../utils/function.utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../utils/axios.utils";
import { useNavigation } from "@react-navigation/native";
import Containers from "../../common_component/hoc/container.hoc";

export default function SignUp() {
  const navigation = useNavigation();

  const [state, setState] = useSetState({
    loading: false,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    index: null,
  });

  const handleSubmit = async () => {
    try {
      setState({ loading: true });
      if (state.firstName == "") {
        Toast.error("First name is required");
        setState({ loading: false });
      } else if (state.lastName == "") {
        Toast.error("Last name is required");
        setState({ loading: false });
      } else if (state.email == "") {
        Toast.error("Email is required");
        setState({ loading: false });
      } else if (state.password == "") {
        Toast.error("password is required");
        setState({ loading: false });
      } else if (state.password.length < 8) {
        Toast.error("password minimum 8 characters");
        setState({ loading: false });
      } else if (state.confirmPassword == "") {
        Toast.error("Confirm password is required");
        setState({ loading: false });
      } else if (state.confirmPassword != state.password) {
        Toast.error("Not match password is required");
        setState({ loading: false });
      } else if (state.index == null) {
        Toast.error("Select role");
        setState({ loading: false });
      } else {
        const body = {
          first_name: state.firstName,
          last_name: state.lastName,
          email: state.email,
          password: state.password,
          groups: [data[state.index].value],
        };
        console.log("✌️body --->", body);

        const result = await Models.auth.signup(body);
        AsyncStorage.setItem("user_id", result.user_id);
        Toast.success(result.message);
        setState({ loading: false });
        navigation.navigate("home");
      }
    } catch (e) {
      console.log("✌️e --->", e.response.data);
      setState({ loading: false });
      Toast.error(e.response.data.email[0]);
    }
  };

  const data = [
    {
      icon: Assets.music,
      text: "Musician",
      color: Colors.textPrimary,
      value: 1,
    },
    {
      icon: Assets.band,
      text: "Band",
      color: Colors.blue,
      value: 2,
    },
    {
      icon: Assets.school,
      text: "Music School",
      color: Colors.blue,
      value: 3,
    },
    {
      icon: Assets.organizer,
      text: "Organizer",
      color: Colors.textPrimary,
      value: 4,
    },
  ];

  return (
    <LinearGradient
      start={{ x: 0, y: 0.1 }}
      // end={{ x: 1, y: 0.2}}
      colors={[
        "rgba(0, 210, 225, 0.1)", // #00D2E1 with 50% opacity
        "rgba(108, 77, 218, 0.2)", // #6C4DDA with 50% opacity
        "rgba(134, 104, 254, 0.2)", // #8668FE with 50% opacity
        "rgba(255, 78, 152, 0.2)", // #FF4E98 with 50% opacity
        "rgba(255, 191, 53, 0.1)", // #FFBF35 with 50% opacity
        "rgba(255, 195, 203, 0.2)", // #FFC3CB with 50% opacity
        "rgba(255, 195, 221, 0.2)", // #FFC3DD with 50% opacity
        "rgba(255, 226, 133, 0.4)", // #FFE285 with 50% opacity
        "rgba(255, 228, 244, 0.2)", // #FFE4F4 with 50% opacity
        "rgba(0, 210, 225, 0.1)",
      ]}
      // locations={[0.2, 1, 0.2, 1, 1, 1, 1, 1, 1]}
      style={{ width: "100%" }}
      angle={300}
    >
      <Containers style={css.container} screen>
        <Container style="top" />
        <View style={css.wrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingBottom: 20, height: "100%", width: "100%" }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View
              style={{
                height: Height(10),
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Header label="Sign up" />
            </View>
            {/* <LinearGradient
        // Button Linear Gradient
        colors={["#FF9FC7", "#F32878"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      > */}
            <View
              style={{
                height: "auto",
                backgroundColor: Colors.light,
                borderRadius: 20,
                padding: 12,
                gap: 5,
                width: "100%",
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <Image src={Assets.padani} height={95} width={200} />
              </View>

              <TextInput
                headerText="First name"
                height={50}
                size={20}
                value={state.firstName}
                onChange={(e) => setState({ firstName: e })}
              />
              <TextInput
                headerText="Last name"
                height={50}
                size={20}
                value={state.lastName}
                onChange={(e) => setState({ lastName: e })}
              />
              <TextInput
                headerText="Email Address"
                height={50}
                size={20}
                value={state.email}
                onChange={(e) => setState({ email: e })}
              />
              <TextInput
                headerText="Password"
                height={50}
                size={20}
                secure
                value={state.password}
                onChange={(e) => setState({ password: e })}
              />
              <TextInput
                headerText="Confirmation password"
                height={50}
                secure
                size={20}
                value={state.confirmPassword}
                onChange={(e) => setState({ confirmPassword: e })}
              />
              <View style={{ width: "100%" }}>
                <Text color={Colors.Dark} size={18} family={"bold"} left={5}>
                  Role
                </Text>
                <FlatList
                  data={data}
                  numColumns={2}
                  keyExtractor={(item) => item.text}
                  style={{ width: "100%" }}
                  contentContainerStyle={css.gridContainer}
                  renderItem={({ item, index }) => (
                    <TouchableHighlight style={css.grid}>
                      <>
                        <TouchableHighlight
                          underlayColor={Colors.inputBg}
                          onPress={() => setState({ index })}
                          style={[
                            css.content,
                            {
                              backgroundColor:
                                state.index == index
                                  ? Colors.inputBg
                                  : Colors.light,
                            },
                          ]}
                        >
                          <>
                            <NavButton
                              height={90}
                              width={90}
                              background={item.color}
                              radius={100}
                              icon={item.icon}
                              iconWidth={50}
                              iconHeight={50}
                              onPress={() => setState({ index })}
                            />
                            <View
                              style={{ paddingTop: 10, alignItems: "center" }}
                            >
                              <Text
                                color={Colors.Dark}
                                size={18}
                                family={"bold"}
                                onPress={() => setState({ index })}
                              >
                                {item.text}
                              </Text>
                            </View>
                          </>
                        </TouchableHighlight>
                      </>
                    </TouchableHighlight>
                  )}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  width: "100%",
                  paddingTop: 20,
                }}
              >
                <PrimaryButton
                  text={"Next"}
                  width={Width(85)}
                  activity={state.loading}
                  onPress={() => handleSubmit()}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Text color={Colors.Dark} size={20} family={"regular"}>
                    Already have an account ?
                  </Text>
                </View>
                <TouchableHighlight
                  onPress={() => navigation.navigate("signIn")}
                  underlayColor={Colors.white}
                  style={{}}
                >
                  <>
                    <Text
                      color={Colors.textPrimary}
                      size={20}
                      family={"bold"}
                      onPress={() => navigation.navigate("signIn")}
                    >
                      Sign in !
                    </Text>
                  </>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
        </View>
      </Containers>
    </LinearGradient>
  );
}

const css = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: "100%",
    width: "95%",
    alignItems: "center",
    paddingBottom: 5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  grid: {
    width: "50%",
    height: "100%",
    padding: 10,
  },
  content: {
    height: Height(20),

    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
  },
});

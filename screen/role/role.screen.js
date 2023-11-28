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

export default function Role() {
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
    index: null,
  });

  useEffect(()=>{
    test()
  },[])

  const test = async () => {
    try {

      const userId=await AsyncStorage.getItem("user_id")
      
    } catch (e) {
      
    }
  };

  const handleSubmit = async () => {
    try {
      setState({ loading: true });
      if (state.index == null) {
        Toast.error("Choose a role");
        setState({ loading: false });
      } else {
        const filter = data.find((item, index) => index == state.index);
        const role=filter.text.toLowerCase()
        console.log("✌️filter --->", role);
        // const body = {
        //   username: state.email,
        // };
        // const result = await Models.auth.forget_password(body);
        setState({ loading: false });
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

  const data = [
    {
      icon: Assets.music,
      text: "Musician",
      color: Colors.textPrimary,
    },
    {
      icon: Assets.band,
      text: "Band",
      color: Colors.blue,
    },
    {
      icon: Assets.school,
      text: "Music School",
      color: Colors.blue,
    },
    {
      icon: Assets.organizer,
      text: "Organizer",
      color: Colors.textPrimary,
    },
  ];
  return (
    <View style={css.container}>
      <Container style="top" />
      <View style={css.wrapper}>
        <View style={css.header}>
          <Header label="Choose your role" />
        </View>
        {/* <LinearGradient
        // Button Linear Gradient
        colors={["#FF9FC7", "#F32878"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      > */}
        <View style={{ paddingTop: 10 }}>
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(item) => item.text}
            // style={{ height: "100%", width: "100%" }}
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
                          state.index == index ? Colors.inputBg : Colors.light,
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
                      <View style={{ paddingTop: 10 }}>
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
        <View style={{ paddingTop: 30 }}>
          <PrimaryButton
            text={"Sign up"}
            activity={state.loading}
            onPress={() => handleSubmit()}
            backgroundColor={["#FFBF35", "#FFA900"]}
          />
        </View>
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
  grid: {
    width: "50%",
    height: "100%",
    padding: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%" 
  },
  content: {
    height: Height(30),

    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
  },
});

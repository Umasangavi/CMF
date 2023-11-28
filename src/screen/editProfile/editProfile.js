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

import { LinearGradient } from "expo-linear-gradient";
import Container, { Toast } from "toastify-react-native";

import {
  Height,
  locations,
  uploadImage,
  useSetState,
} from "../../utils/function.utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Containers from "../../common_component/hoc/container.hoc";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { serverUrl } from "../../utils/constant.utils";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomTabNavigation from "../../common_component/navigation/BottomNavigation";

export default function EditProfile() {
  const isFocused = useIsFocused();
  const [state, setState] = useSetState({
    editprofileData: {},
    loading: false,
    first_name: "",
    last_name: "",
    address: "",
    mobile_no: "",
    location: [],
    about_us: "",
    profile_picture: "",
    index: null,
    selectedLocation: {},
  });

  const navigation = useNavigation();
  

  useEffect(() => {
    if (isFocused) {
      get_data();
      get_location();
    }
  }, [isFocused]);

  const get_location = async () => {
    try {
      const result = await locations();
      setState({ location: result });
    } catch (e) {
      console.log(e);
    }
  };

  const get_data = async () => {
    try {
      setState({ loading: true });
      const result = await Models.auth.getProfile();
      console.log("get_data --->", result);

      setState({
        first_name: result.user?.first_name,
        last_name: result.user?.last_name,
        address: result.user?.address,
        mobile_no: result.user?.mobile_no,
        selectedLocation: result.user?.location?.id,
        profile_picture: result.user?.profile_picture,
        about_us: result.event?.about_us,
        loading: false,
      });
    } catch (e) {
      setState({ loading: false });
      console.log("✌️e --->", e);
    }
  };

  const update_profile = async () => {
    try {
      const result = await uploadImage();
      console.log("✌️result --->", result);
      const body = {
        uri: result.uri,
        name: "profile_picture.jpg",
        type: "image/jpeg", // Adjust the MIME type according to your file
      };
      console.log("✌️body --->", body);

      setState({ profile_picture: result.uri, profileFormData: body });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    try {
      const body = {
        first_name: state.first_name,
        mobile_no: state.mobile_no,
        last_name: state.last_name,
        address: state.address,
        location: state.selectedLocation,
        about_us: state.about_us,
        // profile_picture: state.profile_picture,
      };
      const formData = new FormData();
      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const token = await AsyncStorage.getItem("token");
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${serverUrl()}event_organizer_edit/`,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token,
        },
        data: formData,
      };

      // const res = await Models.auth.updateProfiles(body);
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log("✌️e --->", e);
    }
  };

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
            style={css.scrollviewContainer}
          >
            <View
              style={css.headingContainer}>
              <Header label="Edit Profile" />
            </View>
            <View style={css.img_container}>
              <View style={css.logo}>
                <View
                  style={[
                    css.img,
                    {
                      overflow: "hidden",
                    },
                  ]}
                >
                  <Image
                    src={state.profile_picture}
                    height={"100%"}
                    width={"100%"}
                  />
                </View>
                <TouchableHighlight
                  underlayColor={Colors.bgGrey}
                  style={css.editIconContainer}
                  onPress={() => update_profile()}
                >
                  <>
                    <TouchableHighlight
                      underlayColor={Colors.bgGrey}
                      onPress={() => update_profile()}
                      style={css.editIconWrapper}>
                      <>
                        <Icon
                          name={"pencil"}
                          size={20}
                          color={Colors.darkPink}
                          onPress={() => update_profile()}
                        />
                      </>
                    </TouchableHighlight>
                  </>
                </TouchableHighlight>
              </View>
            </View>
            <View
              style={css.textCardContainer}>
              <TextInput
                backgroundColor={Colors.bgGrey}
                headerText="First name"
                height={50}
                size={16}
                value={state.first_name}
                onChange={(e) => setState({ first_name: e })}
              />

              <TextInput
                backgroundColor={Colors.bgGrey}
                headerText="Last name"
                height={50}
                size={16}
                value={state.last_name}
                onChange={(e) => setState({ last_name: e })}
              />
              <TextInput
                backgroundColor={Colors.bgGrey}
                headerText="Address"
                height={50}
                size={16}
                multiline={true}
                value={state.address}
                onChange={(e) => setState({ address: e })}
              />
              <Dropdown
                height={50}
                value={state.selectedLocation}
                onchange={(value) => setState({ selectedLocation: value })}
                option={state.location}
                placeholder="Choose location"
                headerText="Location"
                headerLeft={10}
                size={20}
                borderRadius={15}
                backgroundColor={Colors.bgGrey}
              />
              {/* <TextInput
                backgroundColor={Colors.bgGrey}
                headerText="Location"
                height={50}
                size={16}
                value={state.location?.name || ""}
                onChange={(e) => {
                  setState({
                    editprofileData: {
                      user: {
                        ...state.editprofileData.user,
                        location: {
                          ...state.editprofileData.user.location,
                          name: e,
                        },
                      },
                    },
                  });
                }}
              /> */}
              <TextInput
                backgroundColor={Colors.bgGrey}
                headerText="Mobile no"
                height={50}
                size={16}
                value={state.mobile_no}
                onChange={(e) => setState({ mobile_no: e })}
              />
              <TextInput
                backgroundColor={Colors.bgGrey}
                headerText="About us"
                height={50}
                size={16}
                value={state.about_us}
                onChange={(e) => setState({ about_us: e })}
              />

              <View style={css.buttonsContainer}>
                <View style={css.updateContainer}>
                  <PrimaryButton
                    text={"Update"}
                    height={40}
                    width={"100%"}
                    borderRadius={12}
                    family="regular"
                    backgroundColor={["#1ce589", "#74f2ce"]}
                    size={18}
                    onPress={handleSubmit}
                  />
                </View>
                <View style={css.cancelContainer}>
                  <PrimaryButton
                    text={"Cancel"}
                    height={40}
                    width={"100%"}
                    borderRadius={12}
                    family="regular"
                    backgroundColor={["#a216cd", "#de0993"]}
                    size={18}
                    onPress={() => {
                      setState({ selectedMusician: "", selectedTroupe: "" });
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        
        {/* <BottomTabNavigation /> */}
      
      </Containers>
    </LinearGradient>
  );
}
const css = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: "100%",
    width: "90%",
    alignItems: "center",
    paddingBottom: 5,
  },
  scrollviewContainer:{
    height: "100%", 
    width: "100%"
  },
  headingContainer:{
    height: Height(10),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  img_container: {
    height: Height(20),
    alignItems: "center",
    justifyContent: "center",
  },
  img: { height: 100, width: 100, borderRadius: 50 },
  logo: { height: 120, width: 120, borderRadius: 50, alignItems: "center" },
  editIconContainer:{
    position: "absolute", 
    right: -10
  },
  editIconWrapper:{
    height: 40,
    width: 40,
    backgroundColor: Colors.light,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textCardContainer:{
    height: "auto",
    backgroundColor: Colors.light,
    borderRadius: 20,
    padding: 15,
    gap: 5,
    width: "100%",
  },
buttonsContainer:{
  flexDirection: "row", 
  gap: 10, 
  width: "100%"
},
updateContainer:{
  width: "48%"
},
cancelContainer:{
  width: "48%"
},
});

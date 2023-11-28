import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import { Height, Width, useSetState } from "../../utils/function.utils";
import {
  Assets,
  Colors,
  Musician,
  Band,
  MusicSchool,
  Flatlist,
  Modal,
  Models,
  NavButton,
  Text,
} from "../../utils/imports.utils";
import Container, { Toast } from "toastify-react-native";
import Containers from "../../common_component/hoc/container.hoc";
import { LinearGradient } from "expo-linear-gradient";

import { invitetabs } from "../../utils/constant.utils";

const EventInvite = ({ route }) => {
  // const { eventDataId } = route?.params;
  // console.log("route.params:", eventDataId);

  const [state, setState] = useSetState({
    tabActive: false,
    tabIndex: 0,
    loading: false,
    musicianData: [],
    bandData: [],
    musicschoolData: [],
  });
  useEffect(() => {
    if (state.tabIndex == 0) {
      get_musicianData();
    }
    if (state.tabIndex == 1) {
      get_bandData(true);
    }
    if (state.tabIndex == 1) {
      get_musicschoolData(true);
    }
  }, [state.tabIndex]);

  const get_musicianData = async () => {
    try {
      setState({ loading: true });
      const result = await Models.event.musician(eventDataId);
      setState({ musicianData: result });
      // console.log("musicianData",result)
      setState({ loading: false });
    } catch (e) {
      setState({ loading: false });

      console.log(e);
    }
  };

  const get_bandData = async () => {
    try {
      setState({ loading: true });
      const result = await Models.event.band(eventDataId);
      setState({ bandData: result });
      // console.log("bandData",result)
      setState({ loading: false });
    } catch (e) {
      setState({ loading: false });

      console.log(e);
    }
  };

  const get_musicschoolData = async () => {
    try {
      setState({ loading: true });
      const result = await Models.event.musicschool(eventDataId);
      setState({ musicschoolData: result });
      // console.log("musicschoolData",result)
      setState({ loading: false });
    } catch (e) {
      setState({ loading: false });

      console.log(e);
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
      <Containers style={styles.container} screen backgroundColor="transparent">
        <Container style="top" />
        <View style={styles.wrapper}>
          <KeyboardAvoidingView behavior="position">
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                paddingTop: state.tabIndex == 0 ? 30 : 55,
              }}
            >
              {invitetabs?.map((label, index) => (
                <TouchableHighlight
                  underlayColor={Colors.light}
                  onPress={() => setState({ tabIndex: index })}
                  style={{
                    height: Height(5),
                    width: Width(30),
                    borderRadius: 20,
                    backgroundColor:
                      state.tabIndex == index ? Colors.blue : Colors.light,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    color={state.tabIndex == index ? Colors.light : Colors.Dark}
                    size={14}
                    family={"bold"}
                    onPress={() => setState({ tabIndex: index })}
                  >
                    {label}
                  </Text>
                </TouchableHighlight>
              ))}
            </View>
          </KeyboardAvoidingView>
        </View>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            paddingTop: 20,
            height: "75%",
            paddingBottom: 20,
          }}
        >
          <View>
            <Flatlist
              loading={state.loading}
              data={state.musicianData}
              renderComponent={(item) => (
                <Musician data={item} updateList={() => Musician(false)} />
              )}
              // renderComponent={(item)=>console.log("item",item)}
            />
          </View>

          <View>
            <Flatlist
              loading={state.loading}
              data={state.bandData}
              renderComponent={({ item }) => (
                <Band data={item} updateList={() => Band(false)} />
              )}
            />
          </View>

          <View>
            <Flatlist
              loading={state.loading}
              data={state.musicschoolData}
              renderComponent={({ item }) => (
                <MusicSchool
                  data={item}
                  updateList={() => MusicSchool(false)}
                />
              )}
            />
          </View>
        </View>
      </Containers>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
});

export default EventInvite;
